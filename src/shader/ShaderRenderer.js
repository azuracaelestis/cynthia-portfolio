import { FRAG, VERT } from "./shader";
import { BASE, UNIFORM_MAP } from "./presets";

/**
 * Framework-agnostic renderer for the TFAM background shader — the live-page
 * counterpart to remotion/renderer.js.
 *
 * Unlike the Remotion version, this one does NOT reset exposure every frame.
 * Remotion needed that because it may render frames out of order / in
 * parallel workers, so each frame had to be a pure function of time. A live
 * page has neither constraint — frames always arrive in order — so this
 * carries the exposure gain forward continuously across frames, exactly like
 * the interactive lab. That's cheaper (one probe render per frame instead of
 * 24) and is the exact algorithm the look was tuned against.
 */

const AE_W = 96;
const AE_H = 54;

const compile = (gl, type, src) => {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(`shader compile failed: ${gl.getShaderInfoLog(sh)}`);
  }
  return sh;
};

export class ShaderRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    // Must be true. This canvas resizes live (ResizeObserver, unlike the
    // Remotion renderer's fixed video dimensions) — with false, resizing the
    // backing store while the exposure servo's rapid FBO probe/readback cycle
    // is in flight left the WebGL context producing all-zero output with no
    // JS-visible error, reliably reproduced and fixed by this flag.
    const gl = canvas.getContext("webgl", {
      antialias: false,
      preserveDrawingBuffer: true,
      alpha: false,
    });
    if (!gl) throw new Error("WebGL unavailable");
    this.gl = gl;

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`link failed: ${gl.getProgramInfoLog(program)}`);
    }
    gl.useProgram(program);
    this.program = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    this.buffer = buffer;

    const tex = gl.createTexture();
    const fbo = gl.createFramebuffer();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, AE_W, AE_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.aeTex = tex;
    this.aeFbo = fbo;
    this.aePx = new Uint8Array(AE_W * AE_H * 4);
    this.gain = 1;

    this.locs = new Map();
    this.presetId = 0;
    this.params = BASE;
    this.seed = 0;
  }

  setScene(presetId, params, seed = 0) {
    this.presetId = presetId;
    this.params = params;
    this.seed = seed;
  }

  loc(name) {
    if (!this.locs.has(name)) {
      this.locs.set(name, this.gl.getUniformLocation(this.program, name));
    }
    return this.locs.get(name) ?? null;
  }

  setUniforms(w, h, time, grainSeed, measuring) {
    const { gl, params } = this;
    gl.uniform2f(this.loc("uRes"), w, h);
    gl.uniform1f(this.loc("uTime"), time);
    gl.uniform1f(this.loc("uSeed"), this.seed);
    gl.uniform1i(this.loc("uPreset"), this.presetId);
    gl.uniform1f(this.loc("uGain"), this.gain);
    gl.uniform1f(this.loc("uGrainSeed"), grainSeed);

    for (const [key, uniform] of Object.entries(UNIFORM_MAP)) {
      if (!uniform) continue;
      const v = params[key];
      if (typeof v === "number") gl.uniform1f(this.loc(uniform), v);
    }
    gl.uniform1f(this.loc("uGrainAnim"), params.grainAnim);

    if (measuring) gl.uniform1f(this.loc("uGrain"), 0);
  }

  draw(w, h, time, grainSeed, measuring) {
    const { gl } = this;
    gl.viewport(0, 0, w, h);
    this.setUniforms(w, h, time, grainSeed, measuring);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /** One incremental exposure step, carried across frames — see class doc. */
  autoExpose(time, rate) {
    const { gl, params } = this;
    if (params.auto <= 0.001) {
      this.gain += (1 - this.gain) * 0.1;
      return;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.aeFbo);
    this.draw(AE_W, AE_H, time, 0, true);
    gl.readPixels(0, 0, AE_W, AE_H, gl.RGBA, gl.UNSIGNED_BYTE, this.aePx);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    let sum = 0;
    const n = AE_W * AE_H;
    for (let i = 0; i < n; i++) sum += this.aePx[i * 4];
    const measured = sum / n / 255;
    const ratio = params.target / Math.max(measured, 0.004);
    this.gain = Math.min(6, Math.max(0.15, this.gain * Math.pow(ratio, rate * params.auto)));
  }

  /** Instantly converge exposure — call once after setScene, before the first paint. */
  settleExposure(time, steps = 40) {
    for (let i = 0; i < steps; i++) this.autoExpose(time, 0.5);
  }

  renderFrame(time, grainSeed) {
    this.autoExpose(time, 0.10);
    this.draw(this.canvas.width, this.canvas.height, time, grainSeed, false);
  }

  dispose() {
    const { gl } = this;
    gl.deleteProgram(this.program);
    gl.deleteBuffer(this.buffer);
    gl.deleteTexture(this.aeTex);
    gl.deleteFramebuffer(this.aeFbo);
    this.locs.clear();
  }
}

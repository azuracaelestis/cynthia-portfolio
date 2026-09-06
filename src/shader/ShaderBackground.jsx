import { useEffect, useRef } from "react";
import { PRESETS, paramsFor } from "./presets";
import { ShaderRenderer } from "./ShaderRenderer";

const presetIndex = (preset) => {
  if (typeof preset === "number") return preset;
  const i = PRESETS.findIndex((p) => p.name.toLowerCase() === String(preset).toLowerCase());
  if (i < 0) {
    throw new Error(
      `Unknown preset "${preset}". Available: ${PRESETS.map((p) => p.name).join(", ")}`,
    );
  }
  return i;
};

/**
 * Live animated background — the shader lab's look, running continuously in
 * a normal page. Renders as a single <canvas>; give it a positioned parent
 * (or a className) to place it, the same way you'd place any absolutely
 * positioned background layer.
 *
 * @param {string|number} [preset="Chrome Grain"] Preset name or index.
 * @param {object} [params] Overrides on top of the preset — paste straight
 *   from the lab's "Copy Remotion props" button; the params object is the
 *   same shape for both targets.
 * @param {number} [seed=0] Must match the lab's seed to reproduce a look —
 *   the lab picks a random seed per page load, so without it you'll get a
 *   different region of the same noise field, not the look you tuned.
 * @param {number} [timeOffset=0] Starts the animation clock offset by this
 *   many seconds, in the same units as the lab's `t` readout.
 * @param {string} [className]
 * @param {object} [style]
 */
export function ShaderBackground({
  preset = "Chrome Grain",
  params,
  seed = 0,
  timeOffset = 0,
  className = "",
  style,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const presetId = presetIndex(preset);
    const resolved = { ...paramsFor(presetId), ...params };
    const renderer = new ShaderRenderer(canvas);
    renderer.setScene(presetId, resolved, seed);

    let shaderTime = timeOffset;
    let last = performance.now();
    let looping = true;
    let rafId = null;

    // 1.5x device-pixel-ratio, not the full ratio: the fields are soft and
    // grain-dithered, so 2x buys almost nothing visually for ~45% more fill
    // cost — the same tradeoff made in the lab itself.
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(2, Math.round(rect.width * dpr));
      const h = Math.max(2, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resize();
    renderer.settleExposure(shaderTime);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const frame = (now) => {
      rafId = null;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      shaderTime += dt * resolved.speed;
      renderer.renderFrame(shaderTime, Math.floor(shaderTime * 24));
      if (looping) rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    // A backgrounded tab still runs the render + auto-exposure loop at full
    // rate — real GPU cost for nothing on screen. Stop scheduling while
    // hidden rather than relying on the browser's rAF throttling, which
    // slows a hidden tab but doesn't stop it.
    const onVisibility = () => {
      looping = !document.hidden;
      if (looping && rafId === null) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      looping = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      renderer.dispose();
    };
    // `params` is read by value via JSON.stringify below rather than listed
    // directly, so passing a new object literal each render (the common case,
    // e.g. `params={{...}}` inline in JSX) doesn't recreate the WebGL context
    // and reset the animation every render.
  }, [preset, seed, timeOffset, JSON.stringify(params)]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}

# TFAM background shader → Vite / React case study page

Drop-in files for using the lab's shader as a live animated background in an
ordinary React page (as opposed to `remotion/`, which renders it to video).
Verified: renders correctly, animates continuously, survives container
resizes, pauses fully when the tab is hidden, and unmounts cleanly with no
leaked WebGL context.

## Install

Copy the whole `web/` folder into your project, e.g. `src/shader/`. No new
dependencies — it's plain WebGL, nothing to add to `package.json`.

```jsx
import { ShaderBackground } from "./shader/ShaderBackground";

function CaseStudyHero() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <ShaderBackground
        preset="Grain Field"
        seed={6.6304}
        params={{
          speed: 0.64, scale: 0.56, angle: -2.63, drift: 0.6, warp: 0.4, flow: 1.2,
          detail: 2.4, rough: 0.52, soft: 0.3, blur: 0.22, norm: 0.55,
          p1: 0.62, p2: 0.45, p3: 0, p4: 0.5,
          bump: 0.1, lightAngle: -1.26, lightElev: 0.995, ambient: 1,
          spec: 0.82, specPow: 7.95, fresnel: 0.385,
          contrast: 1.14, bright: -0.01, gamma: 1.16, lift: 0.004,
          bloom: 0.1, vignette: 0.34, invert: 0,
          auto: 0.8, target: 0.25,
          grain: 0.085, grainScale: 0.95, grainAnim: 1, bands: 0,
          stipple: 0.93, grain2: 0.455, renderScale: 1,
        }}
        className="absolute inset-0 -z-10"
      />
      <div className="relative z-10">
        {/* your case study content, animated with Framer Motion as usual */}
      </div>
    </div>
  );
}
```

The `params` object above is your saved "Grain Field — the one" look, copied
straight from the lab's JSON. `<ShaderBackground>` renders as a plain
`<canvas>` — position it with Tailwind classes exactly like you would any
other absolutely-positioned background layer. It fills whatever box its
`className`/parent gives it and re-renders at the right resolution
automatically if that box resizes (window resize, responsive breakpoints,
sidebar toggling, etc.) — no manual handling needed.

Framer Motion doesn't need to know about it at all — the canvas just sits as
a background sibling; animate the foreground content over it as normal.

## Props

| Prop | Default | Meaning |
|---|---|---|
| `preset` | `"Chrome Grain"` | Name or index. All 9 lab presets available. |
| `params` | – | Overrides, straight from the lab's "Copy Remotion props" button (same shape works here — see note below). |
| `seed` | `0` | Must match the lab's seed to reproduce a look — the lab picks a random seed per page load, so without it you'll render a different region of the same noise field. |
| `timeOffset` | `0` | Starts the animation clock offset by this many seconds, same units as the lab's `t` readout. |
| `className` / `style` | – | Passed to the `<canvas>`. |

The lab's **Copy Remotion props** button output pastes in directly here too —
`preset`/`seed`/`timeOffset`/`params` are the same shape for both targets,
just change the import.

## How this differs from the Remotion port

This is a live page, not a video frame renderer, so it's simpler in one
specific way: exposure doesn't need Remotion's "reset gain to 1, run 24 fixed
servo steps every frame" determinism trick (that existed because Remotion may
render frames out of order across parallel workers). A live page's frames
always arrive in order, so this carries the exposure gain forward
continuously across frames — exactly the algorithm the interactive lab itself
uses, and cheaper (one probe render per frame instead of 24).

It also pauses its render loop entirely when the tab is hidden
(`visibilitychange`), for the same reason the lab does: a backgrounded tab
still burns full GPU cost with nothing on screen otherwise.

## A bug worth knowing about if you ever touch `ShaderRenderer.js`

The WebGL context **must** use `preserveDrawingBuffer: true`. An earlier
version used `false` (reasoning: nothing captures this canvas the way
Remotion needs to) — that reasoning was wrong. This canvas resizes live via
`ResizeObserver`, and with `false`, resizing the backing store while the
exposure servo's rapid FBO probe/readback cycle was in flight left the WebGL
context producing all-zero output — reliably, silently, with no JS-visible
error anywhere. It cost real debugging time to isolate (call counts, patched
methods, and a throw-marker all confirmed the render loop was running
correctly at the JS level; only a direct pixel readback showed the output was
blank). If you ever see this exact symptom again — loop clearly running,
gain pinned at its max clamp, output flat zero — check this flag first.

## Regenerating

`shader.js` and `presets.js` are **generated** — do not hand-edit them. After
tuning a look further in the lab, re-run:

```bash
python3 tools/export-web.py
```

`index.html` stays the single source of truth for both the GLSL and the
preset table, so this page can never drift from what you approved on screen.

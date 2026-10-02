# Image → Three

Turn a flat bitmap into a lit, three-dimensional relief — in the browser, at
runtime, with no server and no pre-baked assets.

This is the engine behind the **"The dashboard, as terrain"** band on the
ManthanOS homepage. It decodes a real product screenshot, reads its
brightness as height, and drapes the original pixels back over the resulting
geometry.

---

## Why this exists

A screenshot is flat by definition. It proves *that* something happened but
never *how much* of it there was. A pipeline with forty finished videos looks
identical to one with four until you read the numbers.

Reading brightness as height recovers that missing quantity. Dense regions of
an interface rise, empty ones sink, and the shape of the workload becomes
visible from across a room.

The important constraint: **no pixel is redrawn**. The colour map on the mesh
and the `<img>` in the DOM are the same file. The 3D is a geometric statement
about the image, not a different picture of it.

---

## The pipeline

| # | Stage | What happens |
|---|-------|--------------|
| 1 | **Decode** | The browser turns the PNG into a drawable bitmap via `THREE.TextureLoader`. |
| 2 | **Sample** | The bitmap is drawn into a `128 × 64` canvas. One output pixel is therefore already a neighbourhood mean — the anti-aliasing step comes free from the browser's downscaler. |
| 3 | **Height** | Rec. 709 perceptual luma is computed per sample, then normalised against the image's own min/max so a dark dashboard and a bright logo both produce full-depth relief. |
| 4 | **Displace** | Each `PlaneGeometry` vertex's `z` is set from the smoothed luma. Vertex normals are recomputed — without this the lighting is that of a flat plane and the relief is invisible. |
| 5 | **Skirt** | A second geometry of quads drops from the relief's rim to a base plane, giving the object real side walls and a solid silhouette. |
| 6 | **Shade** | The original image is reused verbatim as the colour map on a `MeshPhysicalMaterial`. |

### Two decisions worth explaining

**Why 128 × 64 regardless of source size.** The source is `1264 × 625` — about
790k samples. We only need enough for a relief at this camera distance. The
fixed grid keeps the vertex count near 8k, which is comfortable on integrated
GPUs, and makes the cost independent of the input.

**Why the ramp is eased.** A linear luma → height map makes UI screenshots read
as spiky noise. The code applies a smoothstep (`luma² * (3 - 2*luma)`) so
midtones stay broad and only the extremes pop. That single change is the
difference between "noisy" and "terrain".

---
## Files

```
lib/image-to-three.js          Pure geometry. No React, no DOM chrome, no animation.
components/image-to-three.js   Screenshot -> terrain (the "dashboard as terrain" band).
components/mascot-3d.js        Mascot -> standing character (the hero).
app/page.js, components/hero.js  Registration.
i2t-test.mjs                   Luma-mode geometry tests (14 checks).
i2t-subject-test.mjs           Subject-mode geometry tests (27 checks).
```

The split is deliberate. `lib/` is testable in plain Node and reusable from any
surface. `components/` owns everything lifecycle-specific.

---

## Two modes, because the artwork differs

The screenshots and the mascot are solved by genuinely different algorithms.

### `luma` — screenshots and photos

Brightness becomes height, the whole frame is subject matter. Used by
**"The dashboard, as terrain"** on the homepage.

### `subject` — cut-out artwork

The mascot is a character on a flat white field. Running `luma` on it would
raise the entire white background into one enormous slab and leave the
character sitting in a dent — technically correct, visually useless.

Instead the pipeline:

1. **Keys out the background.** If the image has real alpha, that wins
   outright. Otherwise it flood-fills from the four border edges, walking only
   through pixels matching the backdrop colour.
2. **Builds a coverage mask** (a 3×3 neighbourhood, so the silhouette is
   softened rather than stair-stepped).
3. **Normalises luminance over subject pixels only.** Including the white
   backdrop would put the top of the range at pure white and flatten the
   character into the field it should stand out from.
4. **Trims to the bounding box** so the figure fills the frame instead of
   floating in the margin.
5. **Discards the background in the shader** rather than drawing it white.

### Why the flood fill is edge-anchored

A naive "is this pixel light?" test punches holes straight through the mascot's
white muzzle, teeth and shirt highlights — they are light too. **Connectivity**
is what separates a background from an interior highlight: a pixel is only
background if it is *reachable from the border* without crossing a colour
threshold.

The fill is also four-connected. Diagonal leaks are exactly how these erode
thin diagonal features, and the puppet strings in this artwork are the perfect
test case for that.

### Why `discard` instead of transparency

The mask is an opaque 0/1 vertex attribute, so it can't use the normal alpha
path. `transparent: true` would enable depth sorting and the self-overlapping
relief would flicker. The material patches the shader via `onBeforeCompile`
to `discard` background fragments, which keeps depth writes correct and needs
no blending:

```js
if (vMask < 0.5) discard;
```

`customProgramCacheKey` is set so three.js doesn't share this variant with an
unpatched physical material.

---
## API

```js
import {
  imageToThree,        // luma mode:   bitmap + loader + src -> geometries
  subjectToThree,      // subject mode: same, silhouette cut out
  sampleImage,         // bitmap -> normalised luminance grid
  sampleSubject,       // bitmap -> { mask, luminance, trim, empty }
  buildReliefGeometry, // luminance -> displaced PlaneGeometry
  buildSubjectGeometry,// { mask, luminance, trim } -> relief + aMask
  buildSkirtGeometry,  // relief -> side-wall geometry
  createImageTexture,  // loader + src -> colour-mapped texture
  createSubjectMaterial, // material with the discard patch
  reliefStats,         // geometries -> { vertices, triangles }
  disposeRelief,       // teardown, always call this
} from "../lib/image-to-three";
```

### Tuning constants

| Constant | Default | Meaning |
|----------|---------|---------|
| `GRID_WIDTH` | `128` | Samples across |
| `GRID_HEIGHT` | `64` | Samples down |
| `RELIEF_WIDTH` | `8.4` | World width of the slab |
| `RELIEF_DEPTH` | `4.2` | World depth (luma mode) |
| `RELIEF_HEIGHT` | `0.9` | Z displacement of the brightest sample |
| `RELIEF_FLOOR` | `-0.22` | Depth of the darkest sample (negative = recess) |

`RELIEF_FLOOR` is negative on purpose: flat-shaded images look better with a
little recess below the base plane, and it gives the skirt walls something to
span.

In subject mode the world depth is derived from the trimmed bounding box's
aspect ratio, so the character is never stretched.

---

## Usage

```jsx
// Terrain, from a screenshot
import { ImageToThree } from "../components/image-to-three";
<ImageToThree />
```

```jsx
// Standing character, from cut-out artwork
import { Mascot3D } from "../components/mascot-3d";
<Mascot3D className="h-[470px] w-full" />
```

Swapping the source is a one-line change in either file:

```js
const SOURCE = "/brand/manthan-mascot.png";
```

---

## Progressive enhancement

The section is never blank and never broken. Three tiers, checked in order:

1. **WebGL missing** → the flat source image, correctly framed.
2. **`prefers-reduced-motion`** → the flat source image, statically framed.
3. **Image fails to load** → the flat source image.

In every case the visitor sees the real artwork. Quality also adapts: a coarse
pointer or a viewport under 768px drops DPR and softens the material.

Both are `next/dynamic` with `ssr: false`, matching `hero.js`, so three.js
stays out of the initial payload and off the server.

---

## Testing

```bash
node i2t-test.mjs          # luma mode    — 14 checks
node i2t-subject-test.mjs  # subject mode — 14 checks against the REAL artwork
```

The subject suite is not synthetic. It decodes the actual
`public/brand/manthan-mascot.png` with `sharp`, resizes it to the working grid
so the buffer is byte-identical to what a browser canvas hands us, and runs
the real `sampleSubject` over it.

It then prints an **ASCII map of the keyed silhouette**, which is how you can
see the keyer working without a browser. Current output on the shipped
artwork resolves the ears, head, arms, the marionette, the puppet strings and
the contact shadow as subject, with the white field removed:

```
  .......+##++##+++++##############+++++.............++#++..................+...
  ...................++++++++++++++.................+#####+..............+####+...
  .................................................+#######+..........+######+...
  ................................................+#########+++#++++########+...
  .................................................+#######################+...
  .......................................................+####+........+####++...
```

Measured coverage on the real file is **15.7%** of the frame — a character
occupying a sixth of a square canvas, which is what you want. If that number
were near 100% the key had failed and you would be looking at a raised white
slab.

Assertions cover: partial coverage (catches the "everything is background" and
"nothing is background" failure modes), corners keyed, trim excluding the
empty margin, subject luminance range (proves the white backdrop did not set
the top of the range), subject vertices actually rising, `z` bounds,
background pinned to the floor, and UVs clamped.

The earlier synthetic suite is what caught the two real bugs in the keyer —
inverted mask polarity and a colour-blind flood fill — using a blob with a
bright interior patch that a naive lightness test would punch through.

Both suites stub `document.createElement`, which is what the pure `lib/` split
buys: real geometry tests with no browser and no DOM shim library.

---

## Performance notes

- **Geometry is built inside `useEffect`, never during render.** R3F may render
  more than once per commit; allocating in the render path leaks.
- **The loaded texture is reused as the colour map.** The loader already
  fetched it, so it is passed back in rather than re-requested.
- **`disposeRelief` runs on unmount.** Textures, geometries and materials hold
  GPU memory. Skipping this is the classic three.js leak — a tab that gets
  slower each time you navigate home.
- **`AdaptiveDpr`** drops pixel ratio under load.

---

## Why text is never drawn in 3D

Carried over from `operating-stack-3d.js`: drei's `<Html>` scales contents by
the camera distance factor, which blew labels up several times their intended
size and made them collide with the product UI. All type is real DOM in normal
document flow — crisp, correctly sized, selectable.

---

## Known limitations

- **Fixed source image, no upload UI.** This is a static marketing surface by
  design. Adding a picker means an `onChange` handler and an object URL; the
  `lib/` layer already accepts any bitmap.
- **One bitmap per instance.** No atlasing or instancing.
- **Luminance and silhouette only.** This is a *reading* of an image, not
  reconstruction. It always looks like the original, which is the guarantee.
- **Colour space** assumes `SRGBColorSpace`. A linear-space source would look
  washed out.
- **The keyer assumes one flat backdrop.** A busy or gradient background may
  survive the threshold; the tolerance is `0.16` in `sampleSubject`.
- **No colour decontamination.** Semi-transparent edge pixels keep their old
  backdrop tint, which can halo against a dark scene.
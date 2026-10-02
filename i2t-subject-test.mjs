/* Validate sampleSubject against the REAL mascot artwork, using sharp to
   produce exactly the pixel buffer a browser canvas would hand us. */
import sharp from "sharp";
import {
  GRID_WIDTH as W,
  GRID_HEIGHT as H,
  RELIEF_FLOOR,
  RELIEF_HEIGHT,
  sampleSubject,
  buildSubjectGeometry,
} from "./lib/image-to-three.js";

let failed = 0;
const check = (n, c, e = "") => {
  if (c) console.log("  PASS  " + n);
  else { failed++; console.log("  FAIL  " + n + "  " + e); }
};

const FILE = "public/brand/manthan-mascot.png";
const { data, info } = await sharp(FILE)
  .resize(W, H, { fit: "fill" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log("\nsharp decode:", info.width + "x" + info.height, info.channels + "ch");

// Feed the exact RGBA buffer, so the keyer runs on genuine artwork.
global.document = {
  createElement: () => ({
    width: 0, height: 0,
    getContext: () => ({
      clearRect() {}, drawImage() {},
      getImageData: () => ({ data: new Uint8ClampedArray(data) }),
    }),
  }),
};

const s = sampleSubject({});
const { mask, luminance, trim, empty } = s;

let bg = 0, fg = 0, sum = 0;
for (let i = 0; i < mask.length; i++) { sum += mask[i]; if (mask[i] > 0.5) fg++; else bg++; }
const coverage = fg / mask.length;

console.log("  coverage=" + (coverage * 100).toFixed(1) + "%  trim=" + JSON.stringify(trim));

console.log("\nsampleSubject on real artwork");
check("found a subject", empty === false);
check("coverage is partial, not everything", coverage > 0.05 && coverage < 0.75,
  "coverage=" + coverage.toFixed(3));
check("corners are background", mask[0] === 0 && mask[W - 1] === 0 && mask[(H - 1) * W] === 0);
check("trim excludes the left logo area", trim.minX > 0, "minX=" + trim.minX);
check("trim inside frame", trim.maxX < W && trim.maxY < H, JSON.stringify(trim));
check("mean mask between 0 and 1", sum / mask.length > 0 && sum / mask.length < 1);

console.log("\nsubject luminance normalisation");
const subj = [];
for (let i = 0; i < luminance.length; i++) if (mask[i] > 0.5) subj.push(luminance[i]);
check("subject luma has range", Math.max(...subj) - Math.min(...subj) > 0.3,
  "range=" + (Math.max(...subj) - Math.min(...subj)).toFixed(3));
check("white backdrop did NOT set the max", Math.max(...subj) <= 1.0001);

console.log("\ngeometry from real artwork");
const geo = buildSubjectGeometry(s);
const pos = geo.attributes.position;
const am = geo.attributes.aMask;
let raised = 0, flat = 0, maxZ = -Infinity, minZ = Infinity;
for (let i = 0; i < pos.count; i++) {
  const z = pos.getZ(i);
  minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
  if (am.getX(i) === 1) { raised++; if (z > RELIEF_FLOOR + 0.05) flat++; }
}
check("subject verts exist", raised > 500, "raised=" + raised);
check("subject verts actually rise", flat / raised > 0.8, (flat / raised).toFixed(2));
check("z within bounds", maxZ <= RELIEF_HEIGHT + 1e-6 && minZ >= RELIEF_FLOOR - 1e-6,
  minZ.toFixed(3) + ".." + maxZ.toFixed(3));
check("background pinned to floor", Math.abs(pos.getZ(0) - RELIEF_FLOOR) < 1e-6);

const uv = geo.attributes.uv;
let uvOk = true;
for (let i = 0; i < uv.count; i++) {
  if (uv.getX(i) < -1e-6 || uv.getX(i) > 1 + 1e-6 || uv.getY(i) < -1e-6 || uv.getY(i) > 1 + 1e-6) uvOk = false;
}
check("uvs clamped in 0..1", uvOk);

// ASCII preview of the keyed silhouette, so the result is visible not asserted.
console.log("\nsilhouette preview (every 2nd row/col, # = subject):");
for (let y = 0; y < H; y += 2) {
  let row = "";
  for (let x = 0; x < W; x += 1) {
    const m = mask[y * W + x];
    row += m > 0.66 ? "#" : m > 0.33 ? "+" : ".";
  }
  console.log("  " + row);
}

console.log(failed === 0 ? "\nALL PASS\n" : "\n" + failed + " FAILED\n");
process.exit(failed === 0 ? 0 : 1);
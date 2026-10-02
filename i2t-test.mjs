import {
  GRID_WIDTH,
  GRID_HEIGHT,
  RELIEF_HEIGHT,
  RELIEF_FLOOR,
  sampleImage,
  buildReliefGeometry,
  buildSkirtGeometry,
  reliefStats,
} from "./lib/image-to-three.js";

let failed = 0;
const check = (name, cond, extra = "") => {
  if (cond) console.log("  PASS  " + name);
  else {
    failed++;
    console.log("  FAIL  " + name + "  " + extra);
  }
};

// A synthetic bitmap: bright band in the middle row only.
const canvas = {
  width: GRID_WIDTH,
  height: GRID_HEIGHT,
  getContext: () => ({
    clearRect() {},
    drawImage() {},
    getImageData: (x, y, w, h) => {
      const data = new Uint8ClampedArray(w * h * 4);
      for (let i = 0; i < w * h; i++) {
        const row = Math.floor(i / w);
        const bright = row >= h / 3 && row <= (2 * h) / 3;
        const v = bright ? 255 : 10;
        data[i * 4] = v;
        data[i * 4 + 1] = v;
        data[i * 4 + 2] = v;
        data[i * 4 + 3] = 255;
      }
      return { data };
    },
  }),
};
global.document = { createElement: () => canvas };

const { luminance } = sampleImage({});

console.log("\nsampleImage");
check("grid size", luminance.length === GRID_WIDTH * GRID_HEIGHT);
check("normalised into 0..1", Math.min(...luminance) < 1e-6 && Math.max(...luminance) === 1,
  "min=" + Math.min(...luminance) + " max=" + Math.max(...luminance));

const relief = buildReliefGeometry(luminance);

console.log("\nbuildReliefGeometry");
const pos = relief.attributes.position;
check("vertex count = grid", pos.count === GRID_WIDTH * GRID_HEIGHT, "got " + pos.count);
let zmin = Infinity, zmax = -Infinity;
for (let i = 0; i < pos.count; i++) { zmin = Math.min(zmin, pos.getZ(i)); zmax = Math.max(zmax, pos.getZ(i)); }
check("z within [floor, height]", zmin >= RELIEF_FLOOR - 1e-6 && zmax <= RELIEF_HEIGHT + 1e-6,
  "zmin=" + zmin + " zmax=" + zmax);
check("bright band is raised", zmax - zmin > 0.5, "span=" + (zmax - zmin));
check("normals recomputed", relief.attributes.normal.count === pos.count);
const n = relief.attributes.normal;
let tilted = false;
for (let i = 0; i < n.count; i++) if (Math.abs(n.getZ(i)) < 0.99) tilted = true;
check("normals reflect displacement", tilted);

console.log("\nbuildSkirtGeometry");
const skirt = buildSkirtGeometry(relief);
const sp = skirt.attributes.position;

// Rim vertices of the relief, keyed by exact position. Every skirt vertex
// that is NOT on the floor must match one of these.
const rim = new Set();
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i), y = pos.getY(i);
  const onRim = Math.abs(Math.abs(x) - 8.4 / 2) < 1e-6 || Math.abs(Math.abs(y) - 4.2 / 2) < 1e-6;
  if (onRim) rim.add(`${x.toFixed(4)},${y.toFixed(4)},${pos.getZ(i).toFixed(4)}`);
}
// Perimeter segments = 2*(W-1) horizontal + 2*(H-1) vertical. Each is 2 triangles.
const segs = 2 * (GRID_WIDTH - 1) + 2 * (GRID_HEIGHT - 1);
check("perimeter verts = segs*6", sp.count === segs * 6, "expected " + segs * 6 + ", got " + sp.count);

let onFloor = 0, rimMatches = 0, offFloor = 0, offFloorButOnRim = 0;
for (let i = 0; i < sp.count; i++) {
  const isFloor = Math.abs(sp.getZ(i) - RELIEF_FLOOR) < 1e-6;
  if (isFloor) { onFloor++; continue; }
  offFloor++;
  if (rim.has(`${sp.getX(i).toFixed(4)},${sp.getY(i).toFixed(4)},${sp.getZ(i).toFixed(4)}`)) {
    rimMatches++;
    offFloorButOnRim++;
  }
}
// A rim vertex in a dark region sits at exactly the floor height, so the two
// sets legitimately overlap. The real invariant is the union: every vertex is
// on the floor OR on the rim.
check("every vert is on floor or rim", onFloor + rimMatches === sp.count,
  (onFloor + rimMatches) + "/" + sp.count + " (floor=" + onFloor + ", rim-only=" + offFloorButOnRim + ")");
check("rim verts detected", rim.size > 0, "rim=" + rim.size);
check("skirt has normals", skirt.attributes.normal.count === sp.count);

console.log("\nreliefStats");
const stats = reliefStats(relief, skirt);
check("vertices counted", stats.vertices === pos.count + sp.count, JSON.stringify(stats));
check("triangles is a sane int", Number.isInteger(stats.triangles) && stats.triangles > 0, JSON.stringify(stats));
console.log("  stats:", JSON.stringify(stats));

console.log(failed === 0 ? "\nALL PASS\n" : "\n" + failed + " FAILED\n");
process.exit(failed === 0 ? 0 : 1);
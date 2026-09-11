/**
 * Generates the store PWA's icons from the square brand mark.
 *
 * Run from the repo root:  node scripts/generate-pwa-icons.cjs
 *
 * Kept in the repo so the icons can be regenerated when the mark changes,
 * rather than being a one-off nobody can reproduce. `sharp` comes in with
 * Next's image optimiser, so there is no extra dependency to install.
 *
 * The "any" icons use the source as designed — it already carries about 18%
 * padding, which is right for an app icon.
 *
 * The maskable one cannot. A maskable icon is cropped to whatever shape the
 * platform likes, and only the inner 80% *circle* is guaranteed to survive. So
 * the mark is trimmed to its real bounds and scaled until its diagonal fits
 * inside that circle — using the width would let the corners be clipped on a
 * circular mask.
 */

const path = require("path");
const sharp = require("sharp");

const OUT = path.join(__dirname, "..", "public", "shop");
const SOURCE = path.join(OUT, "vinkol-new-logo.jpg");
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/** A little under the 80% safe circle, so the corners are not flush with it. */
const SAFE_DIAMETER = 0.78;

async function main() {
  // As designed, for the icons that are shown whole.
  for (const size of [192, 512]) {
    await sharp(SOURCE)
      .resize(size, size, { fit: "cover" })
      .flatten({ background: WHITE })
      .png()
      .toFile(path.join(OUT, `icon-${size}.png`));
    console.log(`icon-${size}.png        ${size}x${size}`);
  }

  // iOS applies its own rounded-corner mask, which crops far less than a
  // maskable icon, so the source's own padding is enough.
  await sharp(SOURCE)
    .resize(180, 180, { fit: "cover" })
    .flatten({ background: WHITE })
    .png()
    .toFile(path.join(OUT, "apple-touch-icon.png"));
  console.log("apple-touch-icon.png   180x180");

  // Maskable: fit the mark's diagonal inside the safe circle.
  const size = 512;
  const trimmed = await sharp(SOURCE)
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = trimmed.info;
  const scale = (size * SAFE_DIAMETER) / Math.hypot(w, h);
  const target = { width: Math.round(w * scale), height: Math.round(h * scale) };

  const mark = await sharp(trimmed.data)
    .resize(target.width, target.height)
    .toBuffer();

  const composed = await sharp({
    create: { width: size, height: size, channels: 4, background: WHITE },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();

  // A second pass, because sharp runs flatten *before* composite within one
  // pipeline — doing it inline leaves the composited result with an alpha
  // channel, and a maskable icon is meant to be full-bleed and opaque.
  await sharp(composed)
    .flatten({ background: WHITE })
    .png()
    .toFile(path.join(OUT, "icon-maskable-512.png"));

  const diagonal = Math.round(Math.hypot(target.width, target.height));
  console.log(
    `icon-maskable-512.png  ${size}x${size} — mark ${target.width}x${target.height}, ` +
      `diagonal ${diagonal}px inside a ${Math.round(size * 0.8)}px safe circle`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distDir = path.join(__dirname, "dist");
const tempZip = path.join(__dirname, "mixin-styles-gb.zip");
const finalZip = path.join(distDir, "mixin-styles-gb.zip");

console.log("🤐 Compressing dist files into mixin-styles-gb.zip...");

if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip);

try {
  // 1. Create the zip in the root directory first
  if (process.platform === "win32") {
    execSync(`powershell Compress-Archive -Path dist/* -DestinationPath "${tempZip}" -Force`);
  } else {
    execSync(`cd dist && zip -r "../mixin-styles-gb.zip" ./*`);
  }

  // 2. Clear the INSIDE of the dist directory without deleting the folder itself
  console.log("🧹 Clearing copied files from dist folder...");
  const files = fs.readdirSync(distDir);
  for (const file of files) {
    fs.rmSync(path.join(distDir, file), { recursive: true, force: true });
  }

  // 3. Move the completed zip inside
  fs.renameSync(tempZip, finalZip);

  console.log("✅ Success! Everything cleared. Final archive is at: dist/mixin-styles-gb.zip");
} catch (error) {
  console.error("❌ Failed to create or move zip file:", error.message);
  if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip);
  process.exit(1);
}

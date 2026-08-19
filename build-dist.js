const fs = require("fs");
const path = require("path");

const srcDir = __dirname;
const destDir = path.join(__dirname, "dist");

// Files and folder to strictly ignore
const excludeList = [
  "node_modules",
  ".git",
  "dist",
  ".gitignore",
  ".prettierrc",
  "package-lock.json",
  "README.md",
  "build-dist.js", // Exclude this script itself
  "zip-dist.js",
];

// Clean and recreate dist folder
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      // Skip anything on the exclude list at the root level
      if (src === srcDir && excludeList.includes(childItemName)) {
        return;
      }
      copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("📦 Building dist folder...");
copyRecursive(srcDir, destDir);
console.log("✅ Dist folder ready with only production files!");

const path = require("path");
const { readdir, rm, mkdir, copyFile } = require("fs/promises");
const srcDir = path.join(__dirname, "/files");
const outputDir = path.join(__dirname, "/files-copy");

(async function () {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir);
  copyDir(srcDir, outputDir);
})();

async function copyDir(src, output) {
  const files = await readdir(src, { withFileTypes: true });
  files.forEach(async function (file) {
    if (file.isFile()) {
      copyFile(`${src}\\${file.name}`, `${output}\\${file.name}`);
    } else if (file.isDirectory()) {
      await mkdir(`${output}\\${file.name}`);
      await copyDir(`${src}\\${file.name}`, `${output}\\${elem.name}`);
    }
  });
}

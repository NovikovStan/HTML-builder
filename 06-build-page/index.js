const path = require("path");
const {
  readdir,
  mkdir,
  rm,
  readFile,
  writeFile,
  copyFile,
} = require("fs/promises");
const { create } = require("domain");

const assets = path.join(__dirname, "assets");
const components = path.join(__dirname, "components");
const styles = path.join(__dirname, "styles");
const template = path.join(__dirname, "template.html");
const dist = path.join(__dirname, "project-dist");

async function createDir(dirName) {
  await rm(dirName, { recursive: true, force: true }, (err) => {
    if (err) throw err;
  });
  await mkdir(dirName);
}

async function createFile() {
  let temp = await readFile(template, "utf-8");
  let tagNames = await readdir(components, { withFileTypes: true });

  for (let item of tagNames) {
    let tagCode = await readFile(`${components}\\${item.name}`, "utf-8");
    let tag = new RegExp(`{{${item.name.split(".")[0]}}}`, "g");
    temp = temp.replace(tag, tagCode);
  }
  writeFile(`${dist}\\index.html`, temp);
}

async function createStyles() {
  let files = await readdir(
    styles,
    {
      withFileTypes: true,
    },
    (err) => {
      if (err) throw err;
    }
  );

  let stylesArr = [];
  for (let file of files) {
    let ext = path.extname(`${styles}\\${file.name}`, (err) => {
      if (err) throw err;
    });

    if (ext == ".css") {
      let css = await readFile(`${styles}\\${file.name}`, "utf8", (err) => {
        if (err) throw err;
      });
      stylesArr.push(`${css}\n`);
    }
  }

  await writeFile(`${dist}\\style.css`, stylesArr.join(""));
}

async function copyDir(src, output) {
  const files = await readdir(src, { withFileTypes: true }, (err) => {
    if (err) throw err;
  });
  files.forEach(async function (file) {
    if (file.isFile()) {
      copyFile(`${src}\\${file.name}`, `${output}\\${file.name}`);
    } else if (file.isDirectory()) {
      await mkdir(`${output}\\${file.name}`, (err) => {
        if (err) throw err;
      });
      await copyDir(`${src}\\${file.name}`, `${output}\\${file.name}`);
    }
  });
}

(async function build() {
  await createDir(dist);
  await createDir(`${dist}\\assets`);
  createFile();
  createStyles();
  copyDir(assets, `${dist}\\assets`);
})();


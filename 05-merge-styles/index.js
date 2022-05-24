const path = require("path");
const fsPromises = require("fs/promises");

const bundle = path.join(__dirname, "project-dist", "bundle.css");
const folder = path.join(__dirname, "styles");

(async function () {
  let files = await fsPromises.readdir(folder, {
    withFileTypes: true,
  });

  let styles = [];
  for (let file of files) {
    let ext = path.extname(path.join(folder, file.name));

    if (ext == ".css") {
      let css = await fsPromises.readFile(path.join(folder, file.name), "utf8");
      styles.push(`${css}\n`);
    }
  }

  await fsPromises.writeFile(bundle, styles);
})();

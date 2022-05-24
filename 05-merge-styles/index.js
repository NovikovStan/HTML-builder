const path = require("path");
const fsPromises = require("fs/promises");

const bundle = path.join(__dirname, "project-dist", "bundle.css");
const folder = path.join(__dirname, "styles");

(async function () {
  let files = await fsPromises.readdir(
    folder,
    {
      withFileTypes: true,
    },
    (err) => {
      if (err) throw err;
    }
  );

  let styles = [];
  for (let file of files) {
    let ext = path.extname(path.join(folder, file.name), (err) => {
      if (err) throw err;
    });

    if (ext == ".css") {
      let css = await fsPromises.readFile(
        path.join(folder, file.name),
        "utf8",
        (err) => {
          if (err) throw err;
        }
      );
      styles.push(`${css}\n`);
    }
  }

  await fsPromises.writeFile(bundle, styles);
})();

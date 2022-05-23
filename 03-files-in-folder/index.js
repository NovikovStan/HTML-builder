const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./secret-folder");

fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.join(filePath, file.name), (err, stats) => {
          console.log(
            `${file.name.split(".").slice(0, -1).join(".")} - ${path
              .extname(file.name)
              .substring(1, path.extname(file.name).length)} - ${(
              stats.size / 1024
            ).toFixed(2)} KB`
          );
        });
      }
    });
  }
});

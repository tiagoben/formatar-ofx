const fs = require("fs").promises;

async function list() {
  const files = await fs.readdir("./");
  return files.filter(file => file.endsWith(".ofx"));
}

async function readFile(file) {
  return fs.readFile(file, "latin1");
}

async function writeFile(filename, filedata) {
  return fs.writeFile(filename, filedata, "latin1");
}

module.exports = { list, readFile, writeFile };

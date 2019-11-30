const replace = require("replace-in-file");

console.log("Starting script");
console.log("More info in https://github.com/tiagoben/formatar-ofx");
console.log();

const options = {
  files: "./*.ofx",
  from: /Cursos Online/g,
  to: "",
  encoding: "latin1"
};

replace(options)
  .then(results => {
    console.log("Replacement results:", results);
  })
  .catch(error => {
    console.log("Error occurred:", error);
  })
  .finally(() => {
    console.log();
    console.log("Press any key to exit");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", process.exit.bind(process, 0));
  });

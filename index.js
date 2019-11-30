const replace = require("replace-in-file");

const options = {
  files: "./*.ofx",
  from: / - Data balanc\.: ..\/..\/..../g,
  to: ""
};

replace(options)
  .then(results => {
    console.log("Replacement results:", results);
  })
  .catch(error => {
    console.log("Error occurred:", error);
  })
  .finally(() => {
    console.log("Press any key to exit");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", process.exit.bind(process, 0));
  });

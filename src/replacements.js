const replace = require("replace-in-file");

module.exports = function() {
  const options = {
    files: "./*.ofx",
    from: / - Data balanc\.: ..\/..\/..../g,
    to: "",
    encoding: "latin1"
  };

  return replace(options)
    .then(results => {
      console.log("Replacement results:", results);
    })
    .catch(error => {
      console.log("Error occurred:", error);
    })
    .finally(() => {});
};

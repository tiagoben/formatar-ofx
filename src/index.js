const replacements = require("./replacements");
const ofxOperations = require("./ofxOperations");
const waitKeyPress = require("./waitKeyPress");

async function run() {
  console.log("Starting script");
  console.log("More info in https://github.com/tiagoben/formatar-ofx");
  console.log();

  await replacements();
  await ofxOperations();
  await waitKeyPress();
}

run();

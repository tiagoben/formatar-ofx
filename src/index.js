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

/*var fs = require("fs");
const ofxString = fs.readFileSync("visa-2019-11.ofx", "latin1");

const ofx = require("./ofx");

ofx
  .toJS(ofxString)
  .then(ofxData => {
    console.log(ofxData);
    return ofx.toOFX(ofxData);
  })
  .then(console.log);*/
run();

const ofxFs = require("./ofxFs");
const ofx = require("./ofx");
const updateValuesInDolar = require("./ofxOperationsDolar");

async function ofxOperations() {
  const ofxFiles = await ofxFs.list();
  const results = [];

  for (ofxFile of ofxFiles) {
    const ofxString = await ofxFs.readFile(ofxFile);
    const ofxData = await ofx.toJS(ofxString);

    const dolarResult = updateValuesInDolar(ofxData);

    const resultOfx = await ofx.toOFX(ofxData);

    await ofxFs.writeFile(ofxFile, resultOfx);
    results.push({ file: ofxFile, ...dolarResult });
  }

  console.log("Ofx operations results: ", results);
}
module.exports = ofxOperations;

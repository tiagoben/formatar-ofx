const ofxJs = require("ofx-js");
var xml2js = require("xml2js");

var builder = new xml2js.Builder({
  headless: true,
  renderOpts: { pretty: true, indent: "", newline: "\n" }
});

function toJS(ofxString) {
  return ofxJs.parse(ofxString);
}

function toOFX(ofxData) {
  return new Promise((resolve, reject) => {
    const header = Object.entries(ofxData.header).reduce(
      (accumulator, [key, value]) =>
        key ? accumulator + `${key}:${value}\n` : accumulator,
      ""
    );

    var ofxString = builder
      .buildObject({ OFX: ofxData.OFX })
      .replace("&#xD;", "");
    resolve(header + ofxString);
  });
}

module.exports = { toJS, toOFX };

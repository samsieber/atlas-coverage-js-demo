// This helper
//  1) Starts the puppeteer browser at the beginning of each test file
//  2) Collects coverage while it's running
//  3) Writes the coverage to a unique file as json inside of output/coverage
//  4) Stops the browser at the end of the test file
//
// The reason this helper does it on a per file basis is because the amount of memory  code coverage takes is roughly n * m.
// Where:
//  n is the size of your source files, and
//  m is how many times the source files are loaded
//
// While that's not an issue for small projects, it can be untenable for larger projects, where even a single test file
// can take several GBs of memory to record coverage.
//
// Note that this seems to be in part due to a naive coverage report implementation by puppeteer - if a single file
// is loaded twice, even if it has the same content, it's stored twice in the coverage report. So, it's stored a per-load
// basis, not per-file basis.

const fs = require("fs");

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function mkdirPromise(path, opts) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(path, opts, function (error, result) {
      // The directory probably already exists, so I'll just ignore errors
      resolve(true);
    });
  });
}

function writeFilePromise(path, content, encoding) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, content, encoding, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

class Coverage extends Helper {
  // before/after hooks
  async _beforeSuite() {
    await this.helpers["Puppeteer"]._startBrowser();

    let page = this.helpers["Puppeteer"].page;
    page.coverage.startJSCoverage({ resetOnNavigation: false });
  }

  async _afterSuite() {
    var file_name = "output/coverage/" + makeid() + ".json";
    let page = this.helpers["Puppeteer"].page;

    console.time("stopJSCoverage");
    let jsCoverage = await page.coverage.stopJSCoverage();
    var json = JSON.stringify(jsCoverage);
    console.timeEnd("stopJSCoverage");

    await this.helpers["Puppeteer"]._stopBrowser();

    await mkdirPromise('output/coverage', { recursive: true });
    await writeFilePromise(file_name, json, "utf8");
  }
}

module.exports = Coverage;

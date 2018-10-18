const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const root = path.resolve(__dirname, '../');

const cachePath = path.resolve(root, 'e2e');

const configPath = path.resolve(root, 'e2e/atlas-config.json');
const outputPath = path.resolve(root, 'e2e/output/coverage/coverage.xml');
const inputPath = path.resolve(root, 'e2e/output/coverage');

function ensureConfig() {
  const settings = {
    "public_url_base": "http://localhost:9080/",
    "dist_path": `${root}/dist/ng-demo`,
    "dist_coverage_url": "webpack:///",
    "dist_coverage_path": `${root}`,
    "sources": {
      "base": `${root}/src`,
      "dirs": [
        "**/*.ts",
      ],
      "excludes": []
    }
  };

  return promisify(fs.writeFile)(configPath, JSON.stringify(settings, null, "  "))
}

let writeConfig = ensureConfig();
let loadAtlas = require("atlas-coverage").initialize({cachePath});

writeConfig.then(function(){
  loadAtlas.then(function(atlas){
    atlas.run({
      configPath: configPath,
      outputPath: outputPath,
      inputFolder: inputPath,
    })
  })
});


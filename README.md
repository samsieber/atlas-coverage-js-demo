# Example atlas-coverage Program

This project is base on the [ng-demo project](https://github.com/mraible/ng-demo) and was modified in the following ways: (each step is linked to the corresponding commit) 
1) [Execute the e2e tests via puppetter against the minified distribution](https://github.com/samsieber/atlas-coverage-js-demo/commit/f6730cae887d5b66289bdfb3039aa5c7390e15f1) (instead of using jest) 
2) [Record the coverage data on the minified files](https://github.com/samsieber/atlas-coverage-js-demo/commit/79a3fd375c0d626e058128a2e134027930461d21)
3) [Use the atlas-coverage tool to map the coverage data from the minified files to the source files, outputting in the e2e/output/coverage.xml file](https://github.com/samsieber/atlas-coverage-js-demo/commit/49421637f3958e72780a151ccfa71a13e793415b)

See the [js runner project](https://github.com/samsieber/atlas-coverage-js) and the [actual program implementation project](https://github.com/samsieber/atlas-coverage) for more details

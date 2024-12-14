const common = [
  'tests/components/**/*.feature',
  '--require-module ts-node/register',
  '--require-module tsconfig-paths/register',
  '--require tests/components/**/*.ts',
  '--publish-quiet',
  '--parallel 2',
  '--format html:reports/component/cucumber.html',
  '--format json:reports/component/cucumber.json',
].join(' ');

module.exports = {
  default: common,
};

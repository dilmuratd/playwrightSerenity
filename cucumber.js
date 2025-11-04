const common = {
  require: [
    'src/steps/**/*.ts',
    'src/support/**/*.ts'
  ],
  requireModule: [
    'ts-node/register',
    'tsconfig-paths/register'
  ],
  format: [
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
    'junit:reports/cucumber-report.xml',
    '@serenity-js/cucumber',
    '@cucumber/pretty-formatter',
    'progress-bar'
  ],
  formatOptions: {
    snippetInterface: 'async-await',
    specDirectory: 'reports/serenity'
  },
  publishQuiet: true,
  dryRun: false,
  failFast: false,
  paths: [
    'features/**/*.feature'
  ],
  parallel: 1
};

module.exports = {
  default: common
};

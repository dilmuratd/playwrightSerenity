module.exports = {
  diffPluginOptions: {
    enabled: true,
  },
  outputDirectory: './target/site/serenity',
  sourceDirectory: './reports/serenity',
  report: {
    encoding: 'utf8',
  },
  requirementsBaseDir: 'features',
  requirementsTypes: [
    {
      type: 'feature',
      path: '**/*.feature',
    },
  ],
};

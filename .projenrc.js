const { GemeenteNijmegenCdkApp } = require('@gemeentenijmegen/projen-project-type');
const project = new GemeenteNijmegenCdkApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'aws-siem-soc-data',
  repository: 'https://github.com/GemeenteNijmegen/aws-siem-soc-data.git',
  depsUpgradeOptions: {
    workflowOptions: {
      branches: ['main'], // No acceptance branch
    },
  },
  devDeps: ['@gemeentenijmegen/projen-project-type'],
  deps: [
    '@gemeentenijmegen/aws-constructs',
  ],
});
project.synth();
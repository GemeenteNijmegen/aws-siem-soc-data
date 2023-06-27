export class Statics {

  static readonly projectName = 'siem-soc-data';

  static readonly gnBuildCodeStarConnectionArn = 'arn:aws:codestar-connections:eu-central-1:836443378780:connection/9d20671d-91bc-49e2-8680-59ff96e2ab11';

  static readonly deploymentEnvironment = {
    account: '836443378780',
    region: 'eu-central-1',
  };

  static readonly irvnEnvironment = {
    account: '320517247925',
    region: 'eu-central-1',
  };

  // Statics
  static readonly ssmSiemSocketBucketArn = '/aws-siem-soc-data/s3/siem-soc-bucket';
}
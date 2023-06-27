import {
  Stack,
  StackProps,
  aws_iam as iam,
  aws_ssm as ssm,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Configurable } from './Configuration';
import { Statics } from './Statics';

export interface IamStackProps extends Configurable, StackProps { }

export class IamStack extends Stack {

  constructor(scope: Construct, id: string, props: IamStackProps) {
    super(scope, id, props);

    const user = new iam.User(this, 'chronical-siem-soc-user');
    const bucketArn = ssm.StringParameter.valueForStringParameter(this, Statics.ssmSiemSocketBucketArn);
    const policy = new iam.Policy(this, 'chronical-siem-soc-user-policy',
      {
        policyName: 'User policy for access to siem soc bucket from Chronical',
        statements: [new iam.PolicyStatement({
          sid: 'Access policy to give chronical user read and write rights on siem-soc s3 bucket',
          effect: iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: [bucketArn, bucketArn + '/*'],
        })],
      });

    policy.attachToUser(user);
  }

}
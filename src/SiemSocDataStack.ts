import {
  Stack,
  StackProps,
  aws_s3 as s3,
  aws_iam as iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Configurable } from './Configuration';
import { Statics } from './Statics';

export interface SiemSocDataStackProps extends StackProps, Configurable { }

export class SiemSocDataStack extends Stack {
  constructor(scope: Construct, id: string, props: SiemSocDataStackProps) {
    super(scope, id, props);

    const bucket = this.setupBucket();
    this.setupUser(bucket);

  }

  setupBucket() {
    const bucket = new s3.Bucket(this, 'bucket', {});

    bucket.addToResourcePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:PutObject',
        's3:PutObjectAcl',
      ],
      principals: [new iam.ArnPrincipal(Statics.cbcRoleArn)],
      resources: [
        `${bucket.bucketArn}/cbc-events/*`,
      ],
    }),
    );

    return bucket;
  }

  setupUser(bucket: s3.Bucket) {
    const user = new iam.User(this, 'chronical-siem-soc-user');
    const policy = new iam.Policy(this, 'chronical-siem-soc-user-policy',
      {
        statements: [new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: [bucket.bucketArn, bucket.bucketArn + '/*'],
        })],
      });

    policy.attachToUser(user);
  }


}
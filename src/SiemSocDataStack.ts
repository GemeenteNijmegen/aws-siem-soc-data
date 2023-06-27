import {
  Stack,
  StackProps,
  aws_s3 as s3,
  aws_ssm as ssm,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Configurable } from './Configuration';
import { Statics } from './Statics';

export interface SiemSocDataStackProps extends StackProps, Configurable { }

export class SiemSocDataStack extends Stack {
  constructor(scope: Construct, id: string, props: SiemSocDataStackProps) {
    super(scope, id, props);

    this.setupBucket();

  }

  setupBucket() {
    const bucket = new s3.Bucket(this, 'bucket', {});

    new ssm.StringParameter(this, 'siem-soc-bucket-arn-parameter', {
      stringValue: bucket.bucketArn,
      parameterName: Statics.ssmSiemSocketBucketArn,
    });

    return bucket;
  }

}
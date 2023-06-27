import { Stage, StageProps } from 'aws-cdk-lib';
import { Configurable } from './Configuration';
import { SiemSocDataStack } from './SiemSocDataStack';

export interface MainStageProps extends StageProps, Configurable {}

export class MainStage extends Stage {
  constructor(scope: any, id: string, props: MainStageProps) {
    super(scope, id, props);

    new SiemSocDataStack(this, 'siem-soc-data-stack', {
      env: props.configuration.targetEnvironment,
      configuration: props.configuration,
    });

  }
}
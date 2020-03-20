import { Console } from './OutputApi/Console';
import { Slack } from './OutputApi/Slack';
import { Logger } from './Logger'

export class OutputApiFactory {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  create(apiName: string) {
    switch (apiName) {
      case 'slack':
        return new Slack(this.logger);
        break;
      default:
        return new Console(this.logger);
    }
  }
}
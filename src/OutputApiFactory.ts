import { Console } from './OutputApi/Console';
import { Slack } from './OutputApi/Slack';

export class OutputApiFactory {
  create(apiName: string) {
    switch (apiName) {
      case 'slack':
        return new Slack();
        break;
      default:
        return new Console();
    }
  }
}
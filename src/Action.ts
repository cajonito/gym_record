import { Json } from './Json'
import { OutputApi } from './OutputApi';
import { Config } from './Config';
import { Logger } from './Logger';

export abstract class Action {
  config: Config;
  outputApi: OutputApi;
  logger: Logger;
  isMatched: boolean;

  constructor(outputApi: OutputApi, config: Config, logger: Logger) {
    this.outputApi = outputApi;
    this.config = config;
    this.logger = logger;
    this.isMatched = false
  }
  abstract match(parameter: Json): boolean;
  abstract do(): void;
}
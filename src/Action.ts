import { Json } from './Json'
import { OutputApi } from './OutputApi';
import { Config } from './Config';

export abstract class Action {
  config: Config;
  outputApi: OutputApi;
  isMatched: boolean;

  constructor(outputApi: OutputApi, config: Config) {
    this.outputApi = outputApi;
    this.config = config;
    this.isMatched = false
  }
  abstract match(parameter: Json): boolean;
  abstract do(): void;
}
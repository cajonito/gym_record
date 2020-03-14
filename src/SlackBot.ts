import { OutputApi } from "./OutputApi";
import { Debug } from "./Action/Debug";
import { Check } from "./Action/Check";
import { Json } from "./Json";
import { Config } from "./Config";
import { Logger } from "./Logger";

export class SlackBot {
  parameter: Json;
  outputApi: OutputApi;
  config: Config;
  logger: Logger;
  constructor(
    parameter: Json,
    outputApi: OutputApi,
    config: Config,
    logger: Logger
  ) {
    this.parameter = parameter;
    this.outputApi = outputApi;
    this.config = config;
    this.logger = logger;
  }

  run() {
    const actions = [
      new Check(this.outputApi, this.config, this.logger),
      new Debug(this.outputApi, this.config, this.logger)
    ];

    actions.forEach(v => {
      if (v.match(this.parameter)) {
        this.logger.add(v.constructor.name);
        v.do();
      }
    });
  }
}

import { OutputApi } from "./OutputApi";
import { Debug } from "./Action/Debug";
import { Check } from "./Action/Check";
import { Json } from "./Json";
import { Config } from "./Config";

export class SlackBot {
  parameter: Json;
  outputApi: OutputApi;
  config: Config;
  constructor(parameter: Json, outputApi: OutputApi, config: Config) {
    this.parameter = parameter;
    this.outputApi = outputApi;
    this.config = config;
  }

  run() {
    const actions = [
      new Debug(this.outputApi, this.config),
      new Check(this.outputApi, this.config)
    ];

    actions.forEach(v => {
      if (v.match(this.parameter)) {
        v.do();
      }
    });
  }
}

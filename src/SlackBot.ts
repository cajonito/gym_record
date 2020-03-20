import { OutputApi } from "./OutputApi";
import { CalendarApi } from "./CalendarApi"
import { Debug } from "./Action/Debug";
import { Check } from "./Action/Check";
import { GymDone } from "./Action/GymDone"
import { Json } from "./Json";
import { Config } from "./Config";
import { Logger } from "./Logger";


export class SlackBot {
  parameter: Json;
  outputApi: OutputApi;
  calendarApi: CalendarApi;
  config: Config;
  logger: Logger;
  constructor(
    parameter: Json,
    outputApi: OutputApi,
    calendarApi: CalendarApi,
    config: Config,
    logger: Logger
  ) {
    this.parameter = parameter;
    this.outputApi = outputApi;
    this.calendarApi = calendarApi;
    this.config = config;
    this.logger = logger;
  }

  run() {
    const actions = [
      new Check(this.outputApi, this.calendarApi, this.config, this.logger),
      new GymDone(this.outputApi, this.calendarApi, this.config, this.logger),
      new Debug(this.outputApi, this.calendarApi, this.config, this.logger)
    ];

    actions.forEach(v => {
      if (v.match(this.parameter)) {
        this.logger.add(v.constructor.name);
        v.do();
      }
    });
  }
}

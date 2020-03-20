import { Json } from './Json'
import { OutputApi } from './OutputApi';
import { CalendarApi } from './CalendarApi'
import { Config } from './Config';
import { Logger } from './Logger';

export abstract class Action {
  config: Config;
  outputApi: OutputApi;
  calendarApi: CalendarApi;
  logger: Logger;
  isMatched: boolean;

  constructor(outputApi: OutputApi, calendarApi: CalendarApi, config: Config, logger: Logger) {
    this.outputApi = outputApi;
    this.calendarApi = calendarApi;
    this.config = config;
    this.logger = logger;
    this.isMatched = false
  }
  abstract match(parameter: Json): boolean;
  abstract do(): void;
}
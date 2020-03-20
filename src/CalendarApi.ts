import { Json } from './Json';
import { Logger } from './Logger';

export abstract class CalendarApi {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  abstract createAllDayEvent(title: string, date: Date): any;
}
import { CalendarApi } from '../CalendarApi'
import { Json } from '../Json'

export class Google extends CalendarApi {
  createAllDayEvent(title: string, date: Date) {
    const calendarName = PropertiesService.getScriptProperties().getProperty('CALENDAR_NAME')
    if (!calendarName) return;
    const calendars = CalendarApp.getCalendarsByName(calendarName);
    const calendar = calendars[0];
    return calendar.createAllDayEvent(title, date)
  }
}
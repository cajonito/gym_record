import { CalendarApi } from '../CalendarApi'
import { Json } from '../Json'

export class Console extends CalendarApi {
  createAllDayEvent(title: string, date: Date) {
    console.log('Create Event : ' + title + ' - ' + date);
  }
}
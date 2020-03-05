import { Json } from '../Json'
import { Action } from '../Action'


export class Debug extends Action {
  parameter: Json = new Json({});
  data: any = null;

  match(parameter: Json): boolean {
    if (parameter.get('postData.contents')) {
      try {
        const contents = new Json(JSON.parse(parameter.get('postData.contents')));
        if (contents.get('event.channel') != this.config.channelId) return false;
        this.data = contents;
      } catch {
        return false;
      }
    } else if (parameter.get('parameter.payload')) {
      try {
        const payload = new Json(JSON.parse(parameter.get('parameter.payload')));
        if (payload.get('channel.id') != this.config.channelId) return false;
        this.data = payload;
      } catch {
        return false;
      }
    } else {
      return false;
    }

    this.parameter = parameter;
    this.isMatched = true;
    return true;
  }

  do() {
    if (!this.isMatched) return;
    if (!this.data) return;
    this.outputApi.sendMessage(JSON.stringify(this.data, null, '    '));
  }
}
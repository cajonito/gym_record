import { Json } from '../Json'
import { Action } from '../Action'


export class Debug extends Action {
  parameter: Json = new Json({});
  data: any = null;

  match(parameter: Json): boolean {
    if (parameter.get('parameter.payload')) {
      const payload = new Json(JSON.parse(parameter.get('parameter.payload')));
      if (payload.get('channel.id') != this.config.channelId) return false;
      this.data = {
        'parameter': {
          'payload': payload.get()
        }
      };
    } else if (parameter.get('postData.contents')) {
      const contents = new Json(JSON.parse(parameter.get('postData.contents')));
      if (contents.get('event.channel') != this.config.channelId) return false;
      this.data = {
        'postData': {
          'contents': contents.get()
        }
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
    this.outputApi.sendDebugMessage(JSON.stringify(this.data, null, '    '));
  }
}
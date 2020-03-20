import { Json } from '../Json'
import { Action } from '../Action'
import { Check } from '../Action/Check'


export class GymDone extends Action {
  static readonly TRIGGER_ID_CHECK: string = 'check';
  messageTs: String = '';

  match(parameter: Json): boolean {
    if (!parameter.get('parameter.payload')) return false;
    const payload = new Json(JSON.parse(parameter.get('parameter.payload')));

    if (payload.get('actions.0.action_id') != Check.CHECK_BUTTON_ACTION_ID) return false;
    if (payload.get('actions.0.value') != Check.CHECK_BUTTON_ACTION_VALUE) return false;

    if (!payload.get('container.message_ts')) return false;
    this.messageTs = payload.get('container.message_ts');
    this.isMatched = true;
    return true;
  }

  do() {
    if (!this.isMatched) return;
    if (!this.messageTs) return;

    this.logger.add(this.outputApi.sendMessage('えらい！！！🎉'));
    this.logger.add(this.outputApi.deleteMessage(this.messageTs));
  }
}
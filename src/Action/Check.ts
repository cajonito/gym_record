import { Json } from '../Json'
import { Action } from '../Action'


export class Check extends Action {
  static readonly TRIGGER_ID_CHECK: string = 'check';
  static readonly CHECK_BUTTON_ACTION_ID = 'do_you_go_to_gym';
  static readonly CHECK_BUTTON_ACTION_VALUE = 'yes';
  userId: String = '';

  match(parameter: Json): boolean {
    // TODO: triggerって名前変だよね
    if (parameter.get('trigger') != Check.TRIGGER_ID_CHECK) return false;

    const userId = parameter.get('user_id')
    if (!userId) return false;

    this.userId = userId;
    this.isMatched = true;
    return true;
  }

  do() {
    if (!this.isMatched) return;
    if (!this.userId) return;

    const blocks = new Json([
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "今日はジムに行きましたか？🤣"
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "行った🙌！",
              "emoji": true
            },
            "action_id": Check.CHECK_BUTTON_ACTION_ID,
            "value": Check.CHECK_BUTTON_ACTION_VALUE
          }
        ]
      }
    ]);
    const result = this.outputApi.sendMessage('test', blocks);
    this.logger.add(result);
  }
}
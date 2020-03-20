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

    const sendMessageResponse = new Json(JSON.parse(this.outputApi.sendMessage('test', blocks)));
    if (!sendMessageResponse.get("ok")) return;

    const nowTs: string = sendMessageResponse.get('ts');
    const oldestTs = String(Number(nowTs) - 60 * 60 * 24 * 2);

    const chatHistoryResponse = new Json(JSON.parse(this.outputApi.receiveChatHistory(oldestTs)));
    const oldMessages: any[] = chatHistoryResponse.get('messages');


    oldMessages.forEach((v) => {
      const message = new Json(v);
      if (message.get('blocks.1.elements.0.action_id') != Check.CHECK_BUTTON_ACTION_ID) return;
      const ts = message.get('ts');
      if (ts && ts != nowTs) {
        const result = this.outputApi.deleteMessage(ts);
      }
    })
  }
}
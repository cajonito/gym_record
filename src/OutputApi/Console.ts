import { OutputApi } from '../OutputApi'
import { Json } from '../Json'

export class Console extends OutputApi {
  sendDebugMessage(text: string, blocks?: Json) {
    this.sendMessage(text, blocks);
    return JSON.stringify({
      'ok': true,
      'ts': '1234567890.1234567'
    });
  }

  sendMessage(text: string, blocks?: Json) {
    console.log(text);
    console.log(JSON.stringify(blocks));
    return JSON.stringify({
      'ok': true,
      'ts': '1234567890.1234567'
    });
  }

  sendEphemeral(userId: String, text: String, blocks?: Json) {
    this.sendMessage(text + ' => ' + userId);
    if (blocks) {
      this.sendMessage(JSON.stringify(blocks));
    }
    return JSON.stringify({
      'ok': true,
      'ts': '1234567890.1234567'
    });
  }

  deleteMessage(ts: String) {
    this.sendMessage('delete => ' + ts);
    return JSON.stringify({
      'ok': true,
      'ts': '1234567890.1234567'
    });
  }

  receiveChatHistory(oldestTimeStamp: String) {
    return JSON.stringify({
      'ok': true,
      'messages': [
        {
          'type': 'message'
        },
        {
          'type': 'message2'
        }
      ]
    });
  }
}
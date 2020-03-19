import { OutputApi } from '../OutputApi'
import { Json } from '../Json'

export class Console extends OutputApi {
  sendDebugMessage(text: string, blocks?: Json) {
    this.sendMessage(text, blocks);
  }

  sendMessage(text: string, blocks?: Json) {
    console.log(text);
    console.log(JSON.stringify(blocks));
  }

  sendEphemeral(userId: String, text: String, blocks?: Json) {
    this.sendMessage(text + ' => ' + userId);
    if (blocks) {
      this.sendMessage(JSON.stringify(blocks));
    }
  }

  deleteMessage(ts: String) {
    this.sendMessage('delete => ' + ts);
  }
}
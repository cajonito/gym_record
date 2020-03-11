import { OutputApi } from '../OutputApi'
import { Json } from '../Json'

export class Console extends OutputApi {
  sendMessage(text: string) {
    console.log(text);
  }

  sendEphemeral(userId: String, text: String, blocks?: Json) {
    this.sendMessage(text + ' => ' + userId);
    if (blocks) {
      this.sendMessage(JSON.stringify(blocks));
    }
  }
}
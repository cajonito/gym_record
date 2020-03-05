import { OutputApi } from '../OutputApi'

export class Console extends OutputApi {
  sendMessage(text: string) {
    console.log(text);
  }

  sendEphemeral(text: String, userId: string) {
    this.sendMessage(text + ' => ' + userId);
  }
}
import { OutputApi } from '../OutputApi'
import { Json } from '../Json'

export class Slack extends OutputApi {
  // TODO: 送信先チャンネルを選ぶレイヤーはここじゃない
  sendMessage(text: string) {
    const method = 'post';
    const url = 'https://slack.com/api/chat.postMessage';
    const contentType = 'application/json; charset=utf-8';
    const token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
    const channel = PropertiesService.getScriptProperties().getProperty('SLACK_DEBUG_CHANNEL_ID');

    if (token == null || channel == null) return;

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method,
      contentType: contentType,
      headers: {
        "Authorization": "Bearer " + token
      },
      payload: JSON.stringify({
        "token": token,
        "channel": channel,
        "text": text,
      })
    }

    const result = UrlFetchApp.fetch(url, options);
    return result.getContentText();
  }

  sendEphemeral(userId: String, text: String, blocks?: Json) {
    const method = 'post';
    const url = 'https://slack.com/api/chat.postEphemeral';
    const contentType = 'application/json; charset=utf-8';
    const token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
    const channel = PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL_ID');

    if (token == null || channel == null) return;

    let payload: { [key: string]: any } = {
      "token": token,
      "channel": channel,
      "text": text,
      "user": userId,
    }

    if (blocks) {
      payload['blocks'] = blocks.get()
    };

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method,
      contentType: contentType,
      headers: {
        "Authorization": "Bearer " + token
      },
      payload: JSON.stringify(payload)
    }

    this.sendMessage(JSON.stringify(payload, null, '    '));
    const result = UrlFetchApp.fetch(url, options);
    return result.getContentText();
  }
}
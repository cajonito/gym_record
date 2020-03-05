import { OutputApi } from '../OutputApi'

export class Slack extends OutputApi {
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
    UrlFetchApp.fetch(url, options);
    return;
  }

  sendEphemeral(text: String, userId: String) {
    const method = 'post';
    const url = 'https://slack.com/api/chat.postEphemeral';
    const contentType = 'application/json; charset=utf-8';
    const token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
    const channel = PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL_ID');

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
        "user": userId,
        "blocks": [
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Button",
                  "emoji": true
                },
                "action_id": "test_button",
                "value": "click_me_123"
              }
            ]
          }
        ]
      })
    }
    UrlFetchApp.fetch(url, options);
    return;
  }
}
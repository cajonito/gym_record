import { SlackBot } from './SlackBot';
import { OutputApiFactory } from './OutputApiFactory';
import { Json } from './Json';
import { Config } from './Config'

declare var global: any;

global.doPost = function (e: any) {
	const config: Config = {
		'channelId': PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL_ID'),
		'debugChannelId': PropertiesService.getScriptProperties().getProperty('SLACK_DEBUG_CHANNEL_ID'),
		'token': PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN'),
	}

	const outputApiFactory = new OutputApiFactory();
	const outputApi = outputApiFactory.create('slack');
	const slackBot = new SlackBot(new Json(e), outputApi, config);
	slackBot.run();
};

var postByIncomingHook = (text: string) => {
	let url: string | null = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL');
	if (url === null) return;
	let options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
		"method": 'post',
		"contentType": 'application/json',
		"payload": JSON.stringify({ "text": text })
	};
	UrlFetchApp.fetch(url, options);
}
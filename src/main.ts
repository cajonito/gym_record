import { SlackBot } from './SlackBot';
import { OutputApiFactory } from './OutputApiFactory';
import { Json } from './Json';
import { Config } from './Config';
import { Check } from './Action/Check';
import { Logger } from './Logger';

declare var global: any;

global.doPost = function (e: any) {
	const parameter = new Json(e);

	const config: Config = {
		'channelId': PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL_ID'),
		'debugChannelId': PropertiesService.getScriptProperties().getProperty('SLACK_DEBUG_CHANNEL_ID'),
		'token': PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN'),
	}

	main(parameter, config);
};

global.dailyNotice = function () {
	const parameter = new Json({
		'trigger': Check.TRIGGER_ID_CHECK,
		'user_id': PropertiesService.getScriptProperties().getProperty('SLACK_NOTICE_USER_ID')
	})

	const config: Config = {
		'channelId': PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL_ID'),
		'debugChannelId': PropertiesService.getScriptProperties().getProperty('SLACK_DEBUG_CHANNEL_ID'),
		'token': PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN'),
	}

	main(parameter, config);
}

var main = function (parameter: Json, config: Config) {
	const outputApiFactory = new OutputApiFactory();
	const outputApi = outputApiFactory.create('slack');
	const logger = new Logger();
	const slackBot = new SlackBot(parameter, outputApi, config, logger);
	try {
		slackBot.run();
	} catch (err) {
		postByIncomingHook(err.name + ': ' + err.message);
		postByIncomingHook(JSON.stringify(parameter, null, '    '));
	}
}

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
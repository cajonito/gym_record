import { Json } from './Json'

export class SlackPost {
	parameter: { [key: string]: any };
	constructor(parameter: { [key: string]: any }) {
		this.parameter = parameter;
	}

	isBotPost(): boolean {
		let contents = this.getContents();
		return new Json(contents).get('event.subtype') == 'bot_message';
	}

	isInterectiveMessage(): boolean {
		return Object.keys(new Json(this.parameter).get('parameter')).length > 0;
	}

	getRawJson(): { [key: string]: any } {
		return this.parameter;
	}

	getPayload(): { [key: string]: any } {
		try {
			return JSON.parse(new Json(this.parameter).get('parameter.payload'));
		} catch {
			return {}
		}
	}

	getContents(): { [key: string]: any } {
		try {
			return JSON.parse(new Json(this.parameter).get('postData.contents'));
		} catch {
			return {}
		}
	}

	getText(): string {
		let contents = this.getContents();
		return new Json(contents).get('event.text');
	}

	hasMention(): boolean {
		return this.getMentionTargets().length > 0;
	}

	getMentionTargets(): string[] {
		const contents = this.getContents();
		const richTextSection: any[] | undefined = new Json(contents).get('event.blocks.0.elements.0.elements');
		if (!richTextSection) return []
		const userIdList = richTextSection.filter((v) => {
			return v.type == 'user';
		}).map((v) => {
			return v.user_id;
		})
		return Array.from(new Set(userIdList));
	}
}

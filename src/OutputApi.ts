import { Json } from './Json';
import { Logger } from './Logger';

export abstract class OutputApi {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  // TODO: デバッグチャンネルにデバッグメッセージダンプ用の関数がいる
  abstract sendDebugMessage(text: String, blocks?: Json): any;
  abstract sendMessage(text: String, blocks?: Json): any;
  abstract sendEphemeral(userId: String, text: String, blocks: Json): any;
  abstract deleteMessage(ts: String): any;
}
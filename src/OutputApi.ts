import { Json } from './Json';

export abstract class OutputApi {
  // TODO: デバッグチャンネルにデバッグメッセージダンプ用の関数がいる
  abstract sendDebugMessage(text: String, blocks?: Json): any;
  abstract sendMessage(text: String, blocks?: Json): any;
  abstract sendEphemeral(userId: String, text: String, blocks: Json): any;
  abstract deleteMessage(ts: String): any;
}
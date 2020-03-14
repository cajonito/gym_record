import { Json } from './Json';

export abstract class OutputApi {
  // TODO: デバッグチャンネルにデバッグメッセージダンプ用の関数がいる
  abstract sendMessage(text: String): any;
  abstract sendEphemeral(userId: String, text: String, blocks: Json): any;
}
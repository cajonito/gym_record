import { Json } from './Json';

export abstract class OutputApi {
  abstract sendMessage(text: String): void;
  abstract sendEphemeral(userId: String, text: String, blocks: Json): void;
}
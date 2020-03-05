export abstract class OutputApi {
  abstract sendMessage(text: String): void;
  abstract sendEphemeral(text: String, userId: String): void;
}
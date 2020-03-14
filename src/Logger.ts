export class Logger {
  private logs: any[] = [];

  add(data: any) {
    this.logs.push(data);
  }

  getAll() {
    return this.logs;
  }
}
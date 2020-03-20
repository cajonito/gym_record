export class Logger {
  private logs: any[] = [];
  private shouldDump: boolean = false;

  add(data: any) {
    this.logs.push(data);
  }

  hasLogs() {
    return this.logs.length > 0;
  }

  getAll() {
    return this.logs;
  }
}
export class Json {
  object: { [key: string]: any } | any[];
  constructor(object: { [key: string]: any }) {
    this.object = object;
  }
  get(path?: string): any {
    if (path === undefined) return this.object;

    let lookup: any = Object.assign({}, this.object);
    const keys: string[] = path.split('.');
    for (let i = 0; i < keys.length; i++) {
      if (!(keys[i] in lookup)) return undefined;
      lookup = lookup[keys[i]];
    }
    return lookup;
  }
}
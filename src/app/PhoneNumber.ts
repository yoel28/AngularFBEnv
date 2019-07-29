
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  verify: string;

  public get getE164(): string {
    return '+' + this.country + this.area + this.prefix + this.line;
  }
}


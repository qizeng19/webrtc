export abstract class Strategy {
  abstract canActive(...args: any[]): boolean | string;
}

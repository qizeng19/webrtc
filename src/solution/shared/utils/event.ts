// 建议的事件总线

export class EventBus {
  sub: Function[] = [];
  constructor() {}

  subscribe(callback: Function) {
    if (typeof callback !== 'function') {
      throw new Error('Only functions are allowed to subscribe.');
    }
    this.sub.push(callback);
  }

  notify(option: string) {
    this.sub.forEach(fn => {
      fn && fn(option);
    });
  }
}

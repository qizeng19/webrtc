import { IEventListener } from '~framework/interfaces/IEvents';

export class EventBus {
  listeners: IEventListener[] = [];
  static getEventBus(eventName: string) {
    return new EventBus(eventName);
  }

  constructor(readonly eventName: string) {}

  // 事件订阅
  subscribe(listener: IEventListener) {
    this.listeners.push(listener);
  }

  // 发布
  publish(...args: any[]) {
    for (const listener of this.listeners) {
      listener && listener(...args);
    }
  }

  // 取消订阅
  ubsubscribe(listener: IEventListener) {
    const listenerIndex = this.listeners.indexOf(listener);
    this.listeners.splice(listenerIndex, 1);
  }
}

import { createHashHistory, createBrowserHistory } from 'history';

export class HistoryService {
  static getHashHistory() {
    const history = createHashHistory();
    return history;
  }

  static getBrowserHistory() {
    const history = createBrowserHistory();
    return history;
  }
}

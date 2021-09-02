import { Strategy } from './base.strategy';
import { HistoryService } from '~/framework/util/routes/history.service';

export function RedirectStrategy(redirectPath: string) {
  return class InnerRedirectStrategy extends Strategy {
    canActive() {
      const history = HistoryService.getHashHistory();
      const { search } = history.location;
      return redirectPath + search;
    }
  };
}

import { IButtomTabState } from './buttom-tab.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function useButtomTabStore() {
  const { state, setStateWrap } = useStateStore(new IButtomTabState());
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setStateWrap({ selectedTab: location.pathname });
  }, []);
  function jumpToTabPage(path: string) {}

  function isActive(path: string) {}

  function setCurrentTab(tabInfo: string) {
    history.push(tabInfo);
  }

  return { state, jumpToTabPage, isActive, setCurrentTab };
}

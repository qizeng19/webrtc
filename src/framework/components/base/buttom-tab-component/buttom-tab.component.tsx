import * as React from 'react';
import style from './buttom-tab.component.less';
import { TabBar } from 'antd-mobile';
import { useButtomTabStore } from './buttom-tab.component.store';
import { TABS_MENU_LIST } from '~/solution/shared/constant/tab.const';
import { RouteProps } from 'react-router-dom';
function ButtomTabComponent(props: RouteProps) {
  const { state, setCurrentTab } = useButtomTabStore();
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <TabBar unselectedTintColor="#666666" tintColor="#003193" barTintColor="white">
        {TABS_MENU_LIST.map(tabMenu => {
          return (
            <TabBar.Item
              title={tabMenu.title}
              key={tabMenu.icon}
              icon={
                <div
                  className={style.iconTab}
                  style={{
                    backgroundImage: `url(${tabMenu.icon})`
                  }}
                />
              }
              selectedIcon={
                <div
                  className={style.iconTab}
                  style={{
                    backgroundImage: `url(${tabMenu.selectedIccon})`
                  }}
                />
              }
              selected={state.selectedTab == tabMenu.path}
              onPress={() => setCurrentTab(tabMenu.path)}
            >
              {props.children}
            </TabBar.Item>
          );
        })}
      </TabBar>
    </div>
  );
}

export default React.memo(ButtomTabComponent);

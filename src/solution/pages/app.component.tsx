import { hot } from 'react-hot-loader';
import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { appRoutes } from './app.routes';
// import { ConfigProvider } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import { useGlobalContext } from '../context/global/global.provider';
import { HashRouter } from 'react-router-dom';
import { AuthStrategy } from '~/framework/aop/strategy/auth.strategy';
// moment.locale('zh-cn');

const App = () => {
  const { GlobalProvider } = useGlobalContext();

  return (
    <GlobalProvider>
      {/* <HashRouter>{RoutesService.renderRoutes(appRoutes, AuthStrategy)}</HashRouter> */}
      <HashRouter>{RoutesService.renderRoutes(appRoutes)}</HashRouter>
    </GlobalProvider>
  );
};

export default hot(module)(App);

import * as React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { IRoute } from '~framework/interfaces/IRoute';
import { LazyloadLoadingComponent, ButtomTabComponent } from '~/framework/components/component.module';

export class RoutesService {
  // 渲染路由
  static renderRoutes(routes: IRoute[], StrategyType?: any) {
    // 自动使用 404 路由（需做好适配）
    // routes.push({
    //   path: '',
    //   needTab: false,
    //   component: NotFoundComponent
    // });
    const RoutesArr = routes.map(route => {
      return (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          render={RoutesService.render(route, StrategyType)}
        />
      );
    });

    return <Switch>{RoutesArr}</Switch>;
  }

  static renderNeedTab(needTab: boolean, TargetComponent: any, props: RouteComponentProps) {
    if (!needTab) return <TargetComponent {...props} />;
    return (
      <>
        <TargetComponent {...props} />
        <ButtomTabComponent></ButtomTabComponent>
      </>
    );
  }
  // 路由守卫
  static render(route: IRoute, StrategyType?: any) {
    return (props: RouteComponentProps) => {
      let canActive = StrategyType ? new StrategyType().canActive() : true;
      const canActiveCertainRoute = route.strategy ? new route.strategy().canActive() : undefined;
      if (canActiveCertainRoute !== undefined) canActive = canActiveCertainRoute;

      if (canActive === true) {
        let TargetComponent = route.component;
        if (route.lazyload) {
          TargetComponent = React.lazy(route.component);
          return (
            <React.Suspense fallback={<LazyloadLoadingComponent />}>
              {RoutesService.renderNeedTab(route.needTab, TargetComponent, props)}
            </React.Suspense>
          );
        }
        return RoutesService.renderNeedTab(route.needTab, TargetComponent, props);
      } else if (canActive === false) {
        return <Redirect to="/login" {...props} />;
      } else {
        return <Redirect to={canActive} {...props} />;
      }
    };
  }
}

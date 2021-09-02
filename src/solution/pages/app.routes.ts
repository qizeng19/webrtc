import { IRoute } from '~framework/interfaces/IRoute';
import LoginModule from './login/login.module';
import DemoComponent from './demo-component/demo.component';

export const appRoutes: IRoute[] = [
  {
    path: '/login',
    component: LoginModule
  },
  {
    path: '/home',
    component: DemoComponent
  }
];

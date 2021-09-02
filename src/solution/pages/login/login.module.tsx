import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { loginRoutes } from './login.routes';

const LoginModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(loginRoutes)}</React.Fragment>;
};

export default LoginModule;

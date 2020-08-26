import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";

import {
  Home,
  Category,
  Search,
  Menu,
  Cart,
  Login,
  Register,
  Goods,
} from "./pages";
import * as ROUTES from "./constants/routes";

export type CategoryType = {
  mainCategory?: string;
  subCategory?: string;
  goodId?: string;
};

type route = {
  path: string;
  component: (props: RouteComponentProps<CategoryType>) => JSX.Element;
};

const Routes: Array<route> = [
  {
    path: ROUTES.HOME.path,
    component: Home,
  },
  {
    path: ROUTES.CATEGORY.path,
    component: Category,
  },
  {
    path: ROUTES.GOODS.path,
    component: Goods,
  },
  {
    path: ROUTES.SEARCH.path,
    component: Search,
  },
  {
    path: ROUTES.MENU.path,
    component: Menu,
  },
  {
    path: ROUTES.CART.path,
    component: Cart,
  },
];

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.LOGIN.path} component={Login} />
        <Route
          exact
          path={`${ROUTES.CATEGORY.path}/:mainCategory/:subCategory`}
          component={Category}
        />
        <Route
          exact
          path={`${ROUTES.CATEGORY.path}/:mainCategory`}
          component={Category}
        />
        <Route exact path={`${ROUTES.SEARCH.path}/:query`} component={Search} />
        <Route exact path={ROUTES.REGISTER.path} component={Register} />
        {Routes.map((item: route) => (
          <Route
            exact
            key={item.path}
            path={item.path}
            component={item.component}
          />
        ))}
        <Route path="*">Not found</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

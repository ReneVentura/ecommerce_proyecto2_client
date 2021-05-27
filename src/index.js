import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import AppAdmin from './AppAdmin';
import AppUser from './AppUser';
import Login from './components/Usuarios/Login/Login';
import Ecommerce from './components/Ecommerce/Shop/Shop';
import Cart from './components/Ecommerce/Cart/Cart';
import Panel from './components/Panel/Panel';
import PrivateRoute from './PrivateRoute';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute component={AppUser} path="/user" />
          <PrivateRoute component={AppAdmin} path="/admin" />
          <PrivateRoute component={Ecommerce} path="/shop" />
          <PrivateRoute component={Cart} path="/cart" />
          <PrivateRoute component={Panel} path="/panel" />
          { /*<Route path="/user" component={AppUser} /> 
          <Route path="/admin" component={AppAdmin} />
          <Route path='/shop' component={Ecommerce} />
          <Route path='/cart' component={Cart} />
          <Route path='/panel' component={Panel}/>*/}
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

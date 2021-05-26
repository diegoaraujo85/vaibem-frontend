import React from 'react';
import { Switch } from 'react-router-dom';

import Establishments from '../pages/Establishments';
import EstablishmentsAdd from '../pages/Establishments/Add';
import EstablishmentsEdit from '../pages/Establishments/Edit';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Users from '../pages/Users';
import UsersAdd from '../pages/Users/Add';
import UsersEdit from '../pages/Users/Edit';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />


    <Route path="/establishments" exact component={Establishments} isPrivate />
    <Route path="/establishments/add" exact component={EstablishmentsAdd} isPrivate />
    <Route path="/establishments/:id" exact component={EstablishmentsEdit} isPrivate />

    <Route path="/users" exact component={Users} isPrivate />
    <Route path="/users/add" exact component={UsersAdd} isPrivate />
    <Route path="/users/:id" exact component={UsersEdit} isPrivate />
    <Route path="/" exact component={Home} isPrivate />

  </Switch>
);

export default Routes;

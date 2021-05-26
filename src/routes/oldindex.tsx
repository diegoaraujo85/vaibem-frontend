import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Establishments from '../pages/Establishments';
import EstablishmentsAdd from '../pages/Establishments/Add';
import EstablishmentsEdit from '../pages/Establishments/Edit';
import Home from '../pages/Home';


import Users from '../pages/Users';
import UsersAdd from '../pages/Users/Add';
import UsersEdit from '../pages/Users/Edit';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/establishments" exact component={Establishments} />
      <Route path="/establishments/add" exact component={EstablishmentsAdd} />
      <Route path="/establishments/:id" exact component={EstablishmentsEdit} />

      <Route path="/users" exact component={Users} />
      <Route path="/users/add" exact component={UsersAdd} />
      <Route path="/users/:id" exact component={UsersEdit} />

    </Switch>
  );
};

export default Routes;

/**
 * Tables Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ClientProfile from "./clientprofile";
import WorkerProfile from "./workerprofile";
import EmployeesProfile from "./employeesprofile";

const subscriptionroute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/employee-profile/:id`} />
      <Route path={`${match.url}/employee-profile/:id`} component={EmployeesProfile} />
      <Route path={`${match.url}/worker-profile/:id`} component={WorkerProfile} />
      <Route path={`${match.url}/client-profile/:id`} component={ClientProfile} />
   </Switch>
);

export default subscriptionroute;

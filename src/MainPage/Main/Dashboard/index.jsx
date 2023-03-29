/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Admindashboard from "./admindashboard";
import ClientDashboard from "./clientdashboard";
import Employeedashboard from "./employeedashboard";

const DashboardRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
      <Route path={`${match.url}/dashboard`} component={Admindashboard} />
      <Route path={`${match.url}/employee-dashboard`} component={Employeedashboard} />
      <Route path={`${match.url}/client-dashboard`} component={ClientDashboard} />
   </Switch>
);

export default DashboardRoute;

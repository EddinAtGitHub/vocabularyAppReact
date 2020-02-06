import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Add, Start, End } from "../containers";

const Routes = () => {
	return (
		<BrowserRouter basepath={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/" exact render={()=><Redirect to="/add" />} />
				<Route path="/add" exact component={Add} />
				<Route path="/start" exact component={Start} />
				<Route path="/end" exact component={End} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;

import React from "react";
import NoMatch from "../pages/NoMatch";
import Home from "../pages/Home";
import Bands from "../pages/Bands";
import Band from "../pages/Band";

const routes = [
	{
		path: "/",
		exact: true,
		main: () => <Home />
	},
	{
		path: "/bands",
		exact: true,
		main: () => <Bands />
	},
	{
		path: "/band/:id",
		exact:true,
		main: () => <Band />
	},
	{
		path: "*",
		exact:true,
		main: () => <NoMatch />
	}
	
];

export { routes };

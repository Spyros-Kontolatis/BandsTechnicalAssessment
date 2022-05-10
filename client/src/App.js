import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { routes } from "./router/allRoutes";
import './assets/scss/styles.scss'

function App() {
  return(
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={<route.main />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

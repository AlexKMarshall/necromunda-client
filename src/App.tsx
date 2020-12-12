import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Factions from "./components/Factions";
import { Gangs, GangDetail } from "./components/Gangs";
import FighterPrototypes from "./components/FighterPrototypes";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import { Link, Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>"Loading...";</div>;

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function AuthenticatedApp() {
  return (
    <>
      <LogoutButton />
      <nav>
        <ul>
          <li>
            <Link to="/factions">Factions</Link>
          </li>
          <li>
            <Link to="/fighter-prototypes">Fighter Prototypes</Link>
          </li>
          <li>
            <Link to="/gangs">Gangs</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/factions">
          <Factions />
        </Route>
        <Route path="/fighter-prototypes">
          <FighterPrototypes />
        </Route>
        <Route path="/gangs" exact={true}>
          <Gangs />
        </Route>
        <Route path="/gangs/:id">
          <GangDetail />
        </Route>
      </Switch>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

function UnauthenticatedApp() {
  return <LoginButton />;
}

export default App;

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Factions from "./components/Factions";
import { Gangs } from "./components/Gangs";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import { Link, Switch, Route } from "react-router-dom";

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
            <Link to="/gangs">Gangs</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/factions">
          <Factions />
        </Route>
        <Route path="/gangs">
          <Gangs />
        </Route>
      </Switch>
    </>
  );
}

function UnauthenticatedApp() {
  return <LoginButton />;
}

export default App;

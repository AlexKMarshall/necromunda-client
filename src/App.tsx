import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Factions from "./components/Factions";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import Profile from "./components/Profile";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>"Loading...";</div>;

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function AuthenticatedApp() {
  return (
    <>
      <LogoutButton />
      <Profile />
      <Factions />
    </>
  );
}

function UnauthenticatedApp() {
  return <LoginButton />;
}

export default App;

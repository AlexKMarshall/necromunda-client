import React from "react";
import Factions from "./components/Factions";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Factions />
    </>
  );
}

export default App;

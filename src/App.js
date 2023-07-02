import React from "react";
import "./App.css";
import Router from "./shared/Router";
import { app, auth } from "./firebase";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";

function App() {
  return <Router />;
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./pages/Navbar";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

function App() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Main page.</h1>
    </div>
  );
}

export default App;

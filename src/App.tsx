import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ServerViews } from "./components/ServerViews";
import "./App.css";
import { Server } from "./components/Server";
import { Channel } from "./components/Channel";

function App() {
  return (
    <Router>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={ServerViews} />
      <Route path="/server/:id" exact component={Server} />
      <Route path="/server/channel/:id" exact component={Channel} />
    </Router>
  );
}

export default App;

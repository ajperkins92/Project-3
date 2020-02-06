import React from 'react';
import './App.css';
import Main from "./pages/main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            {/* <Route exact path="/saved" component={SavedPage} />
            <Route component={PageNotFound} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;

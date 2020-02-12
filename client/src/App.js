import React from 'react';
import './App.css';
import Main from "./pages/main";
import CreateEvent from "./pages/createevent";
import MyEvents from "./pages/myevents"
import MyAccount from "./pages/myaccount"
import SignUp from "./pages/signup"
import Login from "./pages/login";
import PageNotFound from "./pages/pagenotfound";
import ViewEvent from "./pages/viewevent";

import {
  BrowserRouter as Router,
  Route,
  Switch,
 
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/createevent" component={CreateEvent} />
            <Route exact path="/loginpage" component={Login} />
            {/* <Route exact path="/logout" component={Logout} /> */}
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/myevents" component={MyEvents} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route path="/view/event/:id" component={ViewEvent}/> 
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
      );
    }
    export default App;

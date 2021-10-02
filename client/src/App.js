import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './static/stylesheets/app.css'

import MessageContextProvider from './hooks/MessageContext';
import Chat from  "./components/Chat";
import Login from "./components/Login";

const App = () => {

  return (
    <MessageContextProvider>
      <div id="app">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/chat">Chat</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/chat">
                <Chat roomName="Javascript"/>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MessageContextProvider>
  )
}

export default App;
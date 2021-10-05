import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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
            <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
              <Route path="/chat/:roomName/:username">
                <Chat/>
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
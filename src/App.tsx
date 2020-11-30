import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Core from './components/Core';
import Mission from './components/Mission';
import ModalRoot from './components/ModalRoot';
import Navbar from './components/Navbar';
import './styles/colors.css'
import { AuthContext } from './utils/context';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [modalOpened, setModalOpened] = useState(false)
  const login = () => {
    setLoggedIn(true)
    setModalOpened(true)
  }
  const logout = () => {
    setLoggedIn(false)
    setModalOpened(false)
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{isLoggedIn: loggedIn, loginModalOpened: modalOpened, login: login, logout: logout}}>
        <div className="Background-Gradient">
          <Navbar/>
          <Switch>
            <Route path="/mission">
              <Mission/>
            </Route>
            <Route path="/blog">
              Blog
            </Route>
            <Route path="/contribute">
              Blog
            </Route>
            <Route exact path="/contact">
              Contact Us
            </Route>
            <Route path="/">
              <Core/>
            </Route>
          </Switch>
        </div>

        <ModalRoot/>
        
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Core from './components/core/Core';
import Mission from './components/Mission';
import ModalRoot from './components/core/ModalRoot';
import Navbar from './components/core/Navbar';
import './styles/colors.css';
import { AuthContext } from './utils/context';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <AuthContext.Provider value={{isLoggedIn: loggedIn, loginModalOpened: modalOpened, setLoggedIn: setLoggedIn, setModalOpened: setModalOpened}}>
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
                <Route path="/" render={ ({match})=> (
                  <>
                    <Core match={match}/>
                  </>
                )}/>
              </Switch>
            </div>
    
            <ModalRoot/>
            
          </AuthContext.Provider>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;

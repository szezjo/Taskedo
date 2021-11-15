import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginScreen from './components/login_screen/login_screen';
import Workspaces from './components/workspaces/workspaces';

const App = () => {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const initialValue = saved;
    console.log(initialValue);
    return initialValue || '';
  });
  const [loggedIn, setLoggedIn] = useState(() => {
    const saved = localStorage.getItem("loggedIn");
    const initialValue = saved;
    console.log(initialValue);
    return initialValue || false;
  });

  const configureToken = (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
  }

  const logout = () => {
    setToken('');
    setLoggedIn(false);
  }

  useEffect(() => {
    if(token==='') localStorage.removeItem("token");
    else localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    if(loggedIn) localStorage.setItem("loggedIn", loggedIn)
    else localStorage.removeItem("loggedIn");
  }
  , [loggedIn]);

  return (
    // <div className="App">
    //   <h1>
    //     Hello world
    //   </h1>
    //   <button
    //     onClick={fetchResponse}
    //   >
    //     Get a response from the backend
    //   </button>
    //   <div>
    //     {fetched.map(element => {
    //       return (
    //         <h3>{element}</h3>);
    //     })}
    //   </div>
    // </div>

    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen configureToken={configureToken} loggedIn={loggedIn} />} />
        <Route path="/workspaces" element={<Workspaces logout={logout} loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;

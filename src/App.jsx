import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginScreen from './components/login_screen/login_screen';
import Workspaces from './components/workspaces/workspaces';
import Board from './components/board/board'

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
  const [activeBoard, setActiveBoard] = useState(() => {
    const saved = localStorage.getItem("activeBoard");
    const initialValue = saved;
    console.log(initialValue);
    return initialValue || false;
  })
  const [workspaceId, setWorkspaceId] = useState(() => {
    const saved = localStorage.getItem("workspaceId");
    const initialValue = saved;
    console.log(initialValue);
    return initialValue || false;
  })

  const configureToken = (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
  }

  const goToBoard = (board) => {
    setActiveBoard(board);
  }

  const [email, setEmail] = useState(() => {
    const saved = localStorage.getItem("email");
    const initialValue = saved;
    console.log(initialValue);
    return initialValue || '';
  });
  const configureEmail = (newEmail) => {
    setEmail(newEmail);
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
    if(email==='') localStorage.removeItem("email");
    else localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    if(loggedIn) localStorage.setItem("loggedIn", loggedIn)
    else {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("activeBoard");
      localStorage.removeItem("workspaceId");
    }
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
        <Route path="/" element={<LoginScreen configureToken={configureToken} loggedIn={loggedIn} configureEmail={configureEmail} />} />
        <Route path="/workspaces" element={<Workspaces changeBoard={goToBoard} logout={logout} loggedIn={loggedIn} userEmail={email} setWorkspaceId={setWorkspaceId} />} />
        <Route path="/board" element={<Board board={activeBoard} workspaceId={workspaceId} />} />
      </Routes>
    </Router>
  );
}

export default App;

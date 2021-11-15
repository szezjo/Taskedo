import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginScreen from './components/login_screen/login_screen';
import Workspaces from './components/workspaces/workspaces';

const App = () => {
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
        <Route path="/" element={<LoginScreen />} />
        <Route path="/workspaces" element={<Workspaces />} />
      </Routes>
    </Router>
  );
}

export default App;

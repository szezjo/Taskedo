import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import LoginScreen from './components/login_screen/login_screen';

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
      <LoginScreen />
    </Router>
  );
}

export default App;

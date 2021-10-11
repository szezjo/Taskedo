import './App.css';
import { useState } from 'react';

const App = () => {
  const [fetched, setFetched] = useState([])

  const fetchResponse = () => {
    console.log('unsettling');
    // console.log(fetched);
    setFetched([...fetched, "henlo darkness my old frien"]);
  }
  return (
    <div className="App">
      <h1>
        Hello world
      </h1>
      <button
        onClick={fetchResponse}
      >
        Get a response from the backend
      </button>
      <div>
        {fetched.forEach(element => {
          console.log(element);
          return (
            <h1>{element}</h1>);
        })}
      </div>
    </div>
  );
}

export default App;

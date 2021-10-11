import './App.css';
import { useState } from 'react';
const axios = require('axios');

const App = () => {
  const [fetched, setFetched] = useState([])

  const fetchResponse = () => {
    // axios.get('127.0.0.1:5000/').then(response => {
    //   console.log(response);
    // })
    // GET request for remote image in node.js
    axios({
      method: 'get',
      url: 'http://localhost:5000',

    })
      .then(response =>{
          console.log(response);
      })
      .catch(error=>{
        console.log(error);
      })
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
        {fetched.map(element => {
          return (
            <h3>{element}</h3>);
        })}
      </div>
    </div>
  );
}

export default App;

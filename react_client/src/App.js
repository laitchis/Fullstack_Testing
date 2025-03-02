import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';



function App() {
  const [stateResponse, setResponse] = useState("");

  function makeRequest() {
    axios.get('http://127.0.0.1:5000/hello')
        .then((response) => {
          console.log(response.data);
          setResponse(response.data['message']);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    function makePostRequest() {
      axios.post('http://127.0.0.1:5000/hello')
          .then((response) => {
            console.log(response.data);
            setResponse(response.data['message']);
          })
          .catch((error) => {
            console.log(error);
          })
      }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={makeRequest}>Make Request</Button>
        <Button onClick={makePostRequest}>Make Post Request</Button>
        <br/>
        <p>{stateResponse}</p>
      </header>
    </div>
  );
}

export default App;

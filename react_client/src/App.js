import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Homepage from './HomePage';
import InputPage from './InputPage';
import OutputPage from './OutputPage';


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
    
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element = {
            <Homepage />
          }>
        </Route>
        <Route path="/input" element = {
            <InputPage />
            }>
        </Route>
        <Route path="/output" element = {
            <OutputPage />
            }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

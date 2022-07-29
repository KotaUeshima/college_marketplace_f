import React from 'react';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
 const [test, setTest] = useState('hello')

  //get
  useEffect(() => {
    fetch("http://localhost:9292/test")
    .then(res => res.json())
    .then((data) => setTest(data.message))
  },[])
  //post request
  //update request - patch
  //delete request - delete

  return (
    <div className="App">
    Hey! {test}
    </div>
  );
}

export default App;
import React from 'react';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
 const [test, setTest] = useState('hello')

  useEffect(() => {
    fetch("http://localhost:9292/test")
    .then(res => res.json())
    .then((data) => setTest(data.message))
  },[])

  return (
    <div className="App">
    Hey! {test}
    </div>
  );
}

export default App;

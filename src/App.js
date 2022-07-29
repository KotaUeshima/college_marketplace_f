import React from 'react';
import './App.css';
import {useEffect, useState} from 'react'
import LoginPage from './views/LoginPage';

function App() {
 const [test, setTest] = useState('hello')

  //get
  // useEffect(() => {
  //   fetch("http://localhost:9292/users")
  //   .then(res => res.json())
  //   .then((data) => console.log(data))
  // },[])
  //post request
  //update request - patch
  //delete request - delete

  return (
    <div className="App">
    Hey! {test}
      <LoginPage/>
    </div>
  );
}

export default App;
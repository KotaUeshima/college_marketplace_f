import React, {useState} from 'react';
import './App.css';
import LoginPage from './views/LoginPage';
import CollegePage from './views/CollegePage';
import PostPage from './views/PostPage';
import NavBar from './views/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [login, setLogin] = useState({})

  function loggingIn(data){
    setLogin(data)
  }

  return ( 
      <BrowserRouter>
        <NavBar login={login}/>
        <Routes>
          <Route path="/" element={<CollegePage />} />
          <Route path="/:college_name" element={<PostPage />} />
          <Route path="/login" element={<LoginPage loggingIn={loggingIn}/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
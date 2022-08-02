import React, {useState} from 'react';
import './App.css';
import LoginPage from './views/LoginPage';
import CollegePage from './views/CollegePage';
import PostPage from './views/PostPage';
import NavBar from './views/NavBar';
import UserPage from './views/UserPage';
import SignUpPage from './views/SignUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [login, setLogin] = useState({})
  const loggedIn = (JSON.stringify(login) !== '{}')

  function handleLoginState(data){
    if(!loggedIn){
      setLogin({
        id: data.id,
        username: data.username
      })
    }
    else{
      setLogin({})
    } 
  }


  return ( 
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} handleLoginState={handleLoginState}/>
        <Routes>
          <Route path="/" element={<CollegePage />} />
          <Route path="/:college_name" element={<PostPage login={login} loggedIn={loggedIn}/>} />
          <Route path="/login" element={<LoginPage handleLoginState={handleLoginState}/>} />
          <Route path="/my_posts" element={<UserPage login={login}/>} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
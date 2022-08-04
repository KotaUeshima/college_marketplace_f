import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './views/LoginPage';
import CollegePage from './views/CollegePage';
import PostPage from './views/PostPage';
import NavBar from './views/NavBar';
import UserPage from './views/UserPage';
import SignUpPage from './views/SignUpPage';
import MoreInfoPage from './views/MoreInfoPage';
import LandingPage from './views/LandingPage';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e48b27',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});


function App() {

  return ( 
    <>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:college_name" element={<PostPage theme={theme}/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/my_posts" element={<UserPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/more_info/:id" element={<MoreInfoPage theme={theme}/>} />
            <Route path="/colleges" element={<CollegePage />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
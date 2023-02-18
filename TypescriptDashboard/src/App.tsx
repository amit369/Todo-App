import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/navbar/Navbar';
import PrivateComponent from './components/PrivateComponent';
function App() {
   
  let bg = {
    backgroundColor: 'white',
    color: 'black',
  }
  const  [loginuser, setLoginUser] = useState({});
  return (
    <div className="App">
      <Navbar />
      <Box className='app-container'>
        <Routes>
        <Route element={<PrivateComponent/>} >
          <Route path='/' element={<Home />} /> 
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
         
        </Routes>
      </Box>


    </div>
  );
}

export default App;

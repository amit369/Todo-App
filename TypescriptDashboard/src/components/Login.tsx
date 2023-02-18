import React, { useState, useEffect } from 'react'
import {
  TextField, Button
} from "@material-ui/core";
import { useDispatch } from 'react-redux';

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from './types/type';

const Login = ( ) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(user)
    try {

      let res = await axios.post(LOGIN_URL, {
        email: user.email,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // let todores = await axios.post(`http://localhost:5000/addtodo/${res.data.register._id}`, { todo_description : 'todo'}, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   } });
      //   console.log(todores);
      alert("Login successfully");
      alert('Welocome ' + res.data.register.firstname);
      setUser({ ...user, username: res.data.register.firstname });
      // dispatch(addtodo({ title: text, id: new Date().getTime().toString() }));
      localStorage.setItem('user', JSON.stringify(res.data.register));
      navigate("/");
      
      console.log("resjson " + JSON.stringify(res.data.register._id));
    } catch (err) {
      console.log(err);
    }
  };

//React.FormEvent<HTMLInputElement>
  const handleChange = (e: any) => {
    console.log(user);
    let {name, value} = e.target;
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  let textboxstyle = {
    margin: 'auto',
    width: '300px',
    height: '100vh',

  }
  return (
    <div style={textboxstyle}>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          label="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
          value={user.email}
        />

        <TextField
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          name="password"
          fullWidth
          required
          onChange={(e) => handleChange(e)}
          value={user.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"

        >
          Login
        </Button>

      </form>
    </div>
  )
}


export default Login
import React, { useState } from 'react'
import {
  TextField, Button
} from "@material-ui/core";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from './types/type';

const SignUp = () => {
  const navigate = useNavigate();
  let textboxstyle = {
    margin: 'auto',
    width: '20%',
    height: '100vh'
  }
  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: ""
  })

 
  let handleSubmit = async (e: any) => {
    e.preventDefault();
    //alert(JSON.stringify(user));
    console.log(user)
    try {
      if(!user.email.includes('@'))
      {
        alert("Please enter valid email");
      }
      let res = await axios.post(REGISTER_URL, {
        firstname: user.firstname,
        email: user.email,
        lastname: user.lastname,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('registered successfully');
      navigate("/login");
      
      console.log("resjson " + JSON.stringify(res.data.message));
    } catch (err) {
      console.log(err);
    }
  };


  // React.FormEvent<HTMLInputElement>

  const handleChange = (e: any) => {
    //console.log(user);
    const {name,value} = e.target;
    // setUser({
    //   ...user,
    //   [e.target.name]: e.target.value
    // })
      setUser({ ...user, [name] : value});

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
          label="firstname"
          name="firstname"
          fullWidth
          required
          onChange={(e) => handleChange(e)}
          value={user.firstname}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="lastname"
          name="lastname"
          fullWidth
          required
          onChange={(e) => handleChange(e)}
          value={user.lastname}
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
          onSubmit={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}


export default SignUp
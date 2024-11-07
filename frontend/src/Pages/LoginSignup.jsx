import { useState } from 'react'
import './CSS/LoginSignup.css'
import axios from 'axios'

const LoginSignup = () => {
  
  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async () => {
    console.log("Login Attempted", formData);
    try {
      const response = await axios.post('https://urbanvogue-backend.onrender.com/login', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const responseData = response.data;

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please try again.");
    }
  };

  const signup = async () => {
    console.log("Signup Attempted", formData);
    try {
      const response = await axios.post('https://urbanvogue-backend.onrender.com/signup', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const responseData = response.data;

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      if (error.response && error.response.data) {
        alert(error.response.data.errors || "Signup failed. Please try again.");
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up" ? <input name='username' value={formData.username}  onChange={changeHandler} type="text" placeholder="Your Name" /> : <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={() => {state==="Login" ? login() : signup()}}>Continue</button>
        {state==="Sign Up" 
        ? <p className="loginsignup-login">Already have an account ? <span onClick={() => {setState("Login")}}>Login here</span></p>
        : <p className="loginsignup-login">Create an account <span onClick={() => {setState("Sign Up")}}>Click here</span></p> }
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup

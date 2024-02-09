import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const Login = ({axios_instance, addToken}) => {

    const instance = axios_instance;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleEmail = (e) =>{
      setEmail(e.target.value)
    }

    const handlePassword = (e) =>{
      setPassword(e.target.value)    
    }
       
    const handleSubmit = () => {
        instance.post('login',{
          'email': email,
          'password': password
        }).then((res) => {
            alert("User has successfully logged in!");
            window.sessionStorage.setItem("auth_token", res.data.token);
            window.sessionStorage.setItem("auth_name", res.data[0]);
            window.sessionStorage.setItem("auth_id", res.data[1]);
            window.sessionStorage.setItem("role_id", res.data[2]);
            addToken(res.data.token);
            console.log(window.sessionStorage.getItem("role_id"))

            if(window.sessionStorage.getItem("role_id") === "1"){
              navigate("..\\admin")
            }
            else{
              navigate("..\\")
            }
        }).catch(function(){alert('Login failed, unknown user'); return;});
      };       

    return (  
      <form 
        onSubmit={function(){return false}}
      >
        <div>
          <input type="email" placeholder="Email" name="email" required onChange = {handleEmail}/>
          <br></br>
          <input type="password" placeholder="Password" name="password" required onChange = {handlePassword}/>
          <br></br>
          <button type="button" onClick = {handleSubmit}> Login </button> 
        </div>
      </form>
  
    );
  
  };
  
  export default Login;
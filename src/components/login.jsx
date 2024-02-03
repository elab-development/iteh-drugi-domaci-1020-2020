import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const Login = () => {

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
          const response = await axios.get('/users.json');
          setUsers(response.data.users);
        }
    
        fetchData();
      }, []);

    const handleSubmit = (e) => {  
      e.preventDefault(); 
      const email = e.target.email;
      const password = e.target.password;
      console.log(email.value);


      users.map((user) =>{        
        if(user.email === email.value && user.password === password.value){
            setSubmitted(true);
        }
        else{
            alert("Unknown user")
            setSubmitted(false);
        }
      })    
    };
  
  
    if (submitted) {  
        alert("User has successfully logged in!");
        navigate("..\\");
    }
  
  
    return (  
      <form 
        onSubmit={handleSubmit}
      >
  
        <div>
          <input type="email" placeholder="Email" name="email" required />
          <br></br>
          <input type="password" placeholder="Password" name="password" required />
          <br></br>
          <button type="submit"> Login </button> 
        </div>
      </form>
  
    );
  
  };
  
  export default Login;
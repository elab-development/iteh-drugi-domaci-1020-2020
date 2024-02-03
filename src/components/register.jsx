import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {  
      e.preventDefault();
      const inputs = e.target.elements;  
      const data = {};
  
  
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].name) { 
          data[inputs[i].name] = inputs[i].value; 
        } 
      }

      setSubmitted(true);
    };
  
  
    if (submitted) {  
        alert("User has been successfully registered!");
        navigate("..\\");
    }
  
  
    return (  
      <form 
        onSubmit={handleSubmit}
      >
  
        <div>
          <input type="text" placeholder="Your name" name="name" required />
          <br></br>
          <input type="email" placeholder="Email" name="email" required />
          <br></br>
          <input type="password" placeholder="Password" name="password" required />
          <br></br>
          <button type="submit"> Register </button> 
        </div>
      </form>
  
    );
  
  };
  
  export default Register;
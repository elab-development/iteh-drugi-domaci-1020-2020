import React, { useState } from "react";

const Contact = () => {

    const [submitted, setSubmitted] = useState(false);

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
      return (  
        <> 
          <h2>Thank you!</h2> 
          <div>We'll be in touch soon.</div> 
        </> 
      );
  
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
          <textarea placeholder="Your message" name="message" required />
          <br></br>
          <button type="submit"> Send a message </button> 
        </div>
      </form>
  
    );
  
  };
  
  export default Contact;
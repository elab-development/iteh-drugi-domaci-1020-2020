import React, { useState } from "react";

const Contact = () => {

    const FORM_ENDPOINT = "https://public.herotofu.com/0c0250a0-b3a8-11ee-8f73-bb364f04d22a"

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
  
  
      fetch(FORM_ENDPOINT, {
  
        method: 'POST',
  
        headers: {
  
          Accept: 'application/json',
  
          'Content-Type': 'application/json',
  
        },
  
        body: JSON.stringify(data),
  
      })
  
        .then((response) => {
  
          if (!response.ok) {
  
            throw new Error('Form response was not ok');
  
          }
  
  
          setSubmitted(true);
  
        })
  
        .catch((err) => {
  
          // Submit the form manually
  
          e.target.submit();
  
        });
  
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
        action={FORM_ENDPOINT} 
        onSubmit={handleSubmit} 
        method="POST" 
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
import { useState } from "react";

const BookAdd = ({handleSubmit, id}) => {

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [genre, setGenre] = useState();
    
    const handleTitle = (e) =>{
        setTitle(e.target.value)
      }
  
    const handleAuthor = (e) =>{
        setAuthor(e.target.value)    
    }

    const handleGenre = (e) =>{
        setGenre(e.target.value)    
    }


    return (  
      <form 
        onSubmit={function(){return false}}
      >
        <div>
          <input type="text" placeholder="Title" name="title" required onChange = {handleTitle}/>
          <br></br>
          <input type="text" placeholder="Author" name="author" required onChange = {handleAuthor}/>
          <br></br>
          <input type="text" placeholder="Genre_ID" name="genre_id" required onChange = {handleGenre}/>
          <button type="button" onClick = {() => {
            if(id===-1){
              handleSubmit(title, author, genre)
            }
          else{
            handleSubmit(title, author, genre, id)
            }
            }}> Submit </button> 
        </div>
      </form>
  
    );
  
  };

export default BookAdd;
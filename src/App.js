import React from 'react';
import logo from './logo.svg';
import './App.css';
function App() {

  //Read data from json file
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get('/bookData.json');
      console.log(response.data.books);
      setBooks(response.data.books);
    }

    fetchData();
  }, []);

  return(
    <BrowserRouter>
        <NavBar cartNum = {cartNum}/>
        <Routes>
            <Route path = "/"
                element = {
                <Books books = {books} onAdd = {addToCart} onRemove = {removeFromCart}/>
                }
            />
        </Routes>      
    </BrowserRouter>
  )
  
}

export default App;

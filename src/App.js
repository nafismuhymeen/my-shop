import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import commerce from './commerce';
import Home from './Components/Home/Home';
import Mycart from './Components/Mycart/Mycart';
import Nav from './Components/Nav/Nav';
import Productpage from './Components/Productpage/Productpage';

function App() {
  // Variables and States
  const [cart, setCart] = useState([]);


//Function for Getting Cart Item
  const gettingCart = ()=>{
    commerce.cart.contents()
    .then(res => setCart(res))
  }
// Calling The Function for Getting Cart Item
  useEffect(()=>{
    gettingCart();
  },[])
  return (
    <Router>
      <Nav cart={cart}/>
      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route path='/my-cart'>
          <Mycart cart={cart}/>
        </Route>
        <Route path='/product/:name/:id'>
          <Productpage setCart={setCart}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

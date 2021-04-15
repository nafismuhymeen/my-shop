import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import commerce from './commerce';
import Home from './Components/Home/Home';
import Mycart from './Components/Mycart/Mycart';
import Nav from './Components/Nav/Nav';
import Productpage from './Components/Productpage/Productpage';

function App() {
  const [cart, setCart] = useState([]);

  const gettingCart = ()=>{
    commerce.cart.contents()
    .then(res => setCart(res))
  }

  useEffect(()=>{
    gettingCart();
  },[])
  console.log(cart);
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
          <Productpage cart={cart}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

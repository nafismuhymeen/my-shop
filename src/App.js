import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import commerce from './commerce';
import Checkout from './Components/Checkout/Checkout';
import Home from './Components/Home/Home';
import Mycart from './Components/Mycart/Mycart';
import Nav from './Components/Nav/Nav';
import Productpage from './Components/Productpage/Productpage';

function App() {
// Variables and States
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
// Function for Getting Cart Item
  const gettingCart = ()=>{
    commerce.cart.contents()
    .then(res => setCart(res))
  };

  const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
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
          <Mycart cart={cart} setCart={setCart}/>
        </Route>
        <Route path='/product/:name/:id'>
          <Productpage setCart={setCart}/>
        </Route>
        <Route path='/checkout'>
          <Checkout handleCaptureCheckout={handleCaptureCheckout} cart={cart} setCart={setCart} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

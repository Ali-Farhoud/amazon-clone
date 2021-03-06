import Header from './Header';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import {useStateValue} from "./StateProvider";
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders';

// STRIPE API PUBLIC KEY USAGE
const promise=loadStripe("pk_test_51LB2SqEVtvOnAfC7doXTmFarOiIpzc5iugD0aN5HqCJjdGh9vxBZRQdxlSMMLuJ5c8K0ZtkdRVXbcuM5YgYp5aZn00JUJwrUTn");

//Main App Componenet
function App() {
  // Context API hook
  const [state,dispatch]=useStateValue();
  /* 
  useEffect hook to perform function at render
  on the change of the user status (logged in/signed out)
  dispatch to chenge the state of the user in global data(context API)

  */
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      
      if(authUser){
        dispatch({
          type:'SET_USER',
          user: authUser,
        })
      }else{
        dispatch({
          type:'SET_USER',
          user: null,
        })
      }
    })
  },[]);
  return (
    // use BrowserRouter to help navigate between different pages in the App
    <Router>
      <div className="app">
      
      <Routes>
        <Route path="/checkout" element={<><Header/><Checkout/></>}></Route>
        <Route path="/" element={<><Header/><Home/></>}></Route>
        <Route path="/login" element={<><Login/></>}></Route>
        <Route path="/payment" element={<><Header/>
        <Elements stripe={promise}><Payment/></Elements></>}>
        </Route>
        <Route path="/orders" element={<><Header/><Orders/></>}></Route>
      </Routes>

      </div>
    </Router>
  );
}

export default App;

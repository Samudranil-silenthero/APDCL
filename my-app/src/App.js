import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Fav from './components/Fav';
import Reset from './components/Reset';
import {  Route, Switch, BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "./context/Context";
import Cookies from 'js-cookie';
function App() {
  const {user}=useContext(Context);
  // const user=1;
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
            <Switch> 
                <Route exact path="/">
                  {user ? <Fav />:<Login/>}
                </Route> 
                <Route exact path="/login">
                  {user ? <Fav />:<Login/>}
                </Route>
                <Route exact path="/signup">
                  {user ? <Fav />:<Signup/>} 
                </Route>
                <Route exact path="/reset">
                  <Reset/> 
                </Route>
                <Route exact path="/logout">
                  <Login/> 
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

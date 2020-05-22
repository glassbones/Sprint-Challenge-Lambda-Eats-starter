import React from 'react';
import './App.css';
import Form from './components/Form'
import {Route, Switch, Link} from 'react-router-dom'

export default function App() {
  return (
    <div 
    className="App" 
    style={{
      display:'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh'}}>
      
      <Switch>
        <Route
          path="/" 
          exact>
            <Link to={`/pizza`}> <button>Order Pizza</button> </Link>
          </Route>
          <Route 
          path="/pizza" 
          component= {Form}/>
      </Switch>
    </div>
  )
}

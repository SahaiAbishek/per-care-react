import React from 'react';
import './App.css';
import login from './login/Login.js';
import viewPets from './pet/ViewPets.js'
import userActivities from './users/userActivities.js'
import { Route } from 'react-router-dom';
import NavBar from './navigation/NavBar';


function App() {
  return (
    <div className="container-fluid">
      <Route exact path="/" component={login} />
      <Route exact path="/ViewPets" component={viewPets} />
      <Route exact path="/UserActivities" component={userActivities} />
    </div>
  );
}

export default App;

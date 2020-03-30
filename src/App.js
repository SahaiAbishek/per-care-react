import React from 'react';
import './App.css';
import login from './login/Login.js';
import viewPets from './pet/ViewPets.js'
import userActivities from './users/userActivities.js'
import { Route } from 'react-router-dom';
import UserProfile from "./users/UserProfile";


function App() {
  return (
    <div className="container-fluid">
      <Route exact path="/" component={login} />
      <Route exact path="/ViewPets" component={viewPets} />
      <Route exact path="/UserActivities" component={userActivities} />
        <Route exact path="/UserProfile" component={UserProfile} />
    </div>
  );
}

export default App;

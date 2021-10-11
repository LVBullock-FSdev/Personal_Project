import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import AllProperties from './components/AllProperties';
import NewProperty from './components/NewProperty';
import EditProperty from './components/EditProperty';
import OneProperty from './components/OneProperty';
import Login from './components/Login';
import RegLog from './views/RegLog';
import Footer from './components/Footer';

//1. Re-use Delete
//2. Edit, Form, New... Let's restructure!
//3. Validations and YOU




function App() {
  return (
    <div className="App">
        {/* If we have a Header that we want the to show everywhere, we do not include it inside of our router.
        It stands alone and will appear at the top of every new view/component as we navigate
        our SPA (Single Page Application - NO REFRESHES!) */}

      <Router>
        <RegLog path="/" />
        <Login path="/login" />

        {/* //if anything is typed into url that does not match the route, will default to this route */}
        <AllProperties default path="/property" />
        <NewProperty path="/property/new" />
        <OneProperty path="/property/:id" />
        <EditProperty path="/property/edit/:id" />
      </Router>

      <Footer />

    </div>
  );
}

export default App;

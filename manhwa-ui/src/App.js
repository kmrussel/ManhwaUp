import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import BrowseAllPage from './pages/BrowseAllPage';
import ManhwaPage from './pages/ManhwaPage';
import Navigation from './components/Navigation';
import GenrePage from './pages/GenrePage';
import ResultsPage from './pages/ResultsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import InformationPage from './pages/InformationPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';


function App() {
  const [manhwaToShow, setManhwaToShow] = useState([]);
  const [genreToShow, setGenreToShow] = useState([]);
  const [logInStatus, setLogInStatus] = useState([]);
  const [showUser, setUser] = useState([])

  return (
    <>
    <div className="App">
      <Router>
        <Navigation/>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage  
            setManhwaToShow={setManhwaToShow} 
            setGenreToShow = {setGenreToShow}/>
          </Route>
          <Route path="/browse-all">
            <BrowseAllPage 
            setManhwaToShow={setManhwaToShow} 
            setGenreToShow={setGenreToShow}/></Route>
          <Route path ="/manhwa/:manhwa/">
             <ManhwaPage 
             manhwaToShow={manhwaToShow} />
          </Route>
          <Route path="/genre/:genres/" >
            <GenrePage 
            genreToShow={genreToShow} 
            setManhwaToShow={setManhwaToShow}/>
          </Route>
          <Route path="/results/:filter/">
            <ResultsPage 
            manhwaToShow={manhwaToShow} 
            setManhwaToShow={setManhwaToShow}/>
          </Route>
          <Route path="/search-results/:search">
            <SearchResultsPage 
            manhwaToShow={manhwaToShow} 
            setManhwaToShow={setManhwaToShow}/>
          </Route>
          <Route path="/information">
            <InformationPage/>
          </Route>

          {/* Login / register*/}
          
          <Route path="/register">
            <RegisterPage
            setLogInStatus = {setLogInStatus}
            setUser = {setUser}/>
          </Route>
          <Route path="/login">
            <LoginPage
            setLogInStatus = {setLogInStatus}
            setUser = {setUser}/>
          </Route>
          <Route path="/userPage">
            <UserPage
            logInStatus={logInStatus}
            showUser ={showUser}/>
          </Route>
          </div>
      </Router>
    </div>
    </>
  );
}


export default App;
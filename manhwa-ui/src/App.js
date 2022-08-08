import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
import UserPage from './pages/UserPage'
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

function App() {
  const [manhwaToShow, setManhwaToShow] = useState([]);
  const [genreToShow, setGenreToShow] = useState([]);
  const [userStatus, setUserStatus] = useState([])

  return (
    <>
      <div className="App">
        <BrowserRouter>

          <Navigation userStatus={userStatus} setUserStatus={setUserStatus} />

          <section className="Main">
            <Routes>

              {/* public routes */}
              <Route path="/" exact element={<HomePage setManhwaToShow={setManhwaToShow} setGenreToShow={setGenreToShow} />} />
              <Route path="/browse-all" element={<BrowseAllPage setManhwaToShow={setManhwaToShow} setGenreToShow={setGenreToShow} />} />
              <Route path="/manhwa/:manhwa/" element={<ManhwaPage manhwaToShow={manhwaToShow} setManhwaToShow={setManhwaToShow} genreToShow={genreToShow} userStatus={userStatus} />} />
              <Route path="/genre/:genres/" element={<GenrePage genreToShow={genreToShow} setManhwaToShow={setManhwaToShow} />} />
              <Route path="/results/:filter/" element={<ResultsPage manhwaToShow={manhwaToShow} setManhwaToShow={setManhwaToShow} />} />
              <Route path="/search-results/:search" element={<SearchResultsPage manhwaToShow={manhwaToShow} setManhwaToShow={setManhwaToShow} />} />
              <Route path="/information" element={<InformationPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage setUserStatus={setUserStatus} />} />

              {/* protected routes */}
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                  <Route path="/user-page" element={<UserPage setManhwaToShow={setManhwaToShow} userStatus={userStatus} />} />
                </Route>
              </Route>

            </Routes>
          </section>

        </BrowserRouter>
      </div>
    </>
  );
}


export default App;
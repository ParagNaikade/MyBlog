import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ArticlesListPage from './pages/ArticlesListPage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import NotFound from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar>
        </NavBar>

        <div id="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact></Route>
            <Route path="/about" component={AboutPage}></Route>
            <Route path="/articles-list" component={ArticlesListPage}></Route>
            <Route path="/article/:name" component={ArticlePage}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;

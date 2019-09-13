import React from 'react';
import Player from './containers/Player';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound';
import GlobalStyle from './styles/GlobalStyle';


const App = () => (
  <Router>
    <>
      <Switch>
        <Route exact path='/'  component={Player} />
        <Route exact path='/:acitveVideo' component={Player} />
        <Route path='*' component={NotFound} />
      </Switch>
      <GlobalStyle />
    </>
  </Router>
)

export default App;
/* eslint-disable no-use-before-define, react/prefer-stateless-function */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import TextView from './TextView.jsx';
import SpeechView from './SpeechView.jsx';
import Nav from './Nav.jsx';
import LandingPage from './LandingPage.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="/speech" component={SpeechView} />
      <Route path="/text" component={TextView} />
    </Route>
  </Router>,
  document.getElementById('app')
);

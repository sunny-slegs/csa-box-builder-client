import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import LandingPage from './landing-page';
import Nav from './nav';
import RegistrationPage from './registration-page';
import Dashboard from './dashboard';
import LoginPage from './login-page';
import {refreshAuthToken} from '../actions/auth';
import BoxPage from './box-page';
import About from './about-us';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
}

componentWillUnmount() {  
    this.stopPeriodicRefresh();
}

startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 //1 hr
    );
}

stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
}
  
  render() {
    return (
      <div>
        <Nav />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegistrationPage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/box/:date' component={BoxPage} />
        <Route exact path='/about' component={About} />
      </div>
    )
  }
  }

  const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));

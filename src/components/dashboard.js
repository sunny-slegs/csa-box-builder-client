import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import requiresLogin from './requires-login';
import DateSelector from './date-selector';


export class Dashboard extends React.Component {

  render() {
    if (!this.props.loggedIn) {
     return <Redirect to='/' />
    }

    if (this.props.showAbout) {
      return <Redirect to='/about' />
    }

    return(  
      <div className='container dashboard'>
        <h2>Choose your box pickup date</h2>
        <DateSelector />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      showAbout: state.box.showAbout,
      loggedIn: state.auth.authToken !== null,
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

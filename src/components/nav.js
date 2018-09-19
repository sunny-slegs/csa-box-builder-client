import React from 'react';
import {connect} from 'react-redux';
import {goHome} from '../actions/boxes';
import {showAbout} from '../actions/boxes';
import {clearAuth} from '../actions/auth';
import './nav.css';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  

  logout() {
    this.props.dispatch(clearAuth());
    if (localStorage.getItem('authToken')) {
      localStorage.removeItem('authToken');
    }
          this.setState({
            redirect: true
          })
  }

  goHome() {
    this.props.dispatch(goHome())
  }

  showAbout() {
    this.setState({
      redirect: false
    })
    this.props.dispatch(showAbout(true))
  }


  render() {
    let logOutButton = "";
    let homeButton = "";
    let aboutButton = "";
    
    if (this.state.redirect) {
      this.props.dispatch(showAbout(false))
    }

    if (this.props.loggedIn) {
      logOutButton = <button type='button' key='logout-button' className='logout-button' onClick={() => this.logout()}>Log Out</button>
      homeButton = <button type='button' key='home-button' className='home-button' onClick={() => this.goHome()}>Home</button>
      aboutButton = <button key='about-button' type='button' className='about-button' onClick={() => this.showAbout()}>About Us</button>
    }


    return(
      <div>
        <nav>
          <ul>
            <li>{homeButton}</li>
            <li>{aboutButton}</li>
            <li>{logOutButton}</li>
          </ul>
        </nav> 
      </div>
        
    )
  }
  }

    const mapStateToProps = state => {
      return {
          loggedIn: state.auth.authToken !== null,
          errorMessage: state.box.errorMessage,
          successMessage: state.box.successMessage,
          showAbout: state.box.showAbout
      }
    };
    
    export default connect(mapStateToProps)(Nav);
  
  
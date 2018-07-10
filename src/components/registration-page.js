import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        console.log(props.loggedIn)
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home container">
            <h2>Sign Up!</h2>
            <RegistrationForm />
            <Link to="/">
              <button type='button'>
                  Login
                </button>
            </Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);

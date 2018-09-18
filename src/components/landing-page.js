import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';


export function LandingPage(props) {
  //If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to='/dashboard' />
  }

  return(
    <div className='how-to container'>
      <div className='about-us container'>
        <p className='about-us'>
          Twisted Root Farm is a small CSA farm located in the beautiful hill country of 
          central Texas.  We strive to provide our customers with high quality, nutritious
          vegetables grown using organic methods.  Maintaining the long term health of our
          land and our customers is our mission.
        </p>
        <p className='about-us'>
          Community Supported Agriculture is a unique opportunity to truly connect with and support
          a small farm.  The customer provides the farmer with the capital needed at the beginning
          of the season and, in return, they receive a weekly share of the farm's produce for the season.
          Because our CSA customers are the backbone of our business, we strive to provide them with 
          flexibility in their weekly shares.
        </p>
        <p className='about-us'>
          That's where this app comes in!  Create an account and start setting your box preferences
          for each week.  Simply log in, select the week you want to make your box for, and 
          choose which 8 vegetables you want for that week.  Once you've selected all 8, save 
          your preferences.  You can always come back later and change your box by deleting
          and adding items and then saving again. 
        </p>
        <p className='about-us'>
          Thank you so much for your support.  We could not do what we love if it wasn't for 
          you!  Happy choosing!
        </p>
      </div>
      <Link to='/login'>
        <button type='button'>
        Log In!
        </button>
      </Link>
      <Link to='/register'>
        <button type='button'>
          Sign Up!
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);

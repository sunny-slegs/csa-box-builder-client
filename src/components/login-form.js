import React from 'react';
import {Field, focus, reduxForm} from 'redux-form';
import Input from './input';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
      return this.props.dispatch(login(values.username, values.password));
  }
  
  render() {
    let error;
        if (this.props.error) {
            error = (
                <div className='form-error' aria-live='polite'>
                    {this.props.error}
                </div>
            );
        }

        if (this.props.loading) {
            return <h1>Loading...</h1>
        }

        return (
          <form
            className='login-form'
            onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
            id='login-form'
            >
            {error}
            <label htmlFor='username' >Username</label>
            <Field
                    component={Input}
                    type='text'
                    name='username'
                    id='username'
                    aria-labelledby='login-form username'
                    validate={[required, nonEmpty]}

                />
                <label htmlFor='password'>Password</label>
                <Field
                    component={Input}
                    type='password'
                    name='password'
                    id='password'
                    aria-labelledby='login-form password'
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
            </form>
        )
  }
}

const mapStateToProps = state => ({
    loading: state.auth.loading 
  });
  

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)(LoginForm));
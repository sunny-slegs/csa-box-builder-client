import React from 'react';
import {Field, focus, reduxForm} from 'redux-form';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
  
  render() {
    let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        return (
          <form
            className='login-form'
            onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
            >
            {error}
            <label htmlFor='username'>Username</label>
            <Field
                    component='input'
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component='input'
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
            </form>
        )
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
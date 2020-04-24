import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    console.log(this.state, this.props);
    signUpStart({ displayName, email, password });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign in with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            name='displayName'
            type='text'
            handleChange={this.handleChange}
            value={displayName}
            label='Display Name'
            required
          />
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={email}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            handleChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'> Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);

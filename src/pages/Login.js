import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginCreator } from '../actions';

class Login extends React.Component {
  state = {
    loginIsValid: false,
    email: '',
    password: '',
    emailOnState: false,
  }

  handleChange = (e) => {
    const { email, password } = this.state;
    this.setState({ [e.target.name]: e.target.value });
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const maxCharactersPssw = 5;
    const validPassword = password.length >= maxCharactersPssw;
    switch (validEmail && validPassword) {
    case true:
      this.setState({ loginIsValid: true });
      break;
    default:
      this.setState({ loginIsValid: false });
    }
  }

  handleClick = (dispatch, email) => {
    dispatch(loginCreator(email));
    this.setState({ emailOnState: true });
  }

  render() {
    const { dispatch } = this.props;
    const { email, password, loginIsValid, emailOnState } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@exemplo.com"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ !loginIsValid }
            onClick={ () => this.handleClick(dispatch, email) }
          >
            {' '}
            Entrar
            {' '}

          </button>
        </form>
        {emailOnState && <Redirect to="/carteira" />}
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

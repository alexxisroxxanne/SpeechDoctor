import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';

import api from '../../utils/api';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmedPassword: '',
      error: false,
      passwordError: false,
    };
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleConfirmedPasswordChange(e) {
    this.setState({
      confirmedPassword: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmedPassword) {
      this.setState({
        passwordError: false,
      });
      api.signup(this.state.username, this.state.password)
        .then((res) => {
          this.setState({
            passwordError: false,
          });
          if (res.status === 500) {
            this.setState({
              error: 'User already exists',
            });
          } else {
            this.props.setUserLoggedIn(this.state.username);
            this.setState({
              error: false,
              username: '',
              password: '',
            });
            browserHistory.push('/');
          }
        })
        .catch((err) => {
          this.setState({
            error: 'User already exists', err,
          });
        });
    } else {
      this.setState({
        error: false,
        passwordError: 'Passwords don\'t match',
      });
    }
  }

  render() {
    const showErr = (
      this.state.error ? <p>{this.state.error}</p> : <div></div>
    );
    const showPasswordErr = (
      this.state.passwordError ? <p>{this.state.passwordError}</p> : <div></div>
    );
    const methods = {
      handleSubmit: this.handleSubmit.bind(this),
      handleUsernameChange: this.handleUsernameChange.bind(this),
      handlePasswordChange: this.handlePasswordChange.bind(this),
      handleConfirmedPasswordChange: this.handleConfirmedPasswordChange.bind(this),
    };

    return (
      <div>
        <Row>
          <Col md={12}>
            <h1>Create an Account</h1>
            <div id="createAccount">
              <form id="signup" onSubmit={methods.handleSubmit}>
                <div id="inputField">Username
                  <input
                    id="loginInput"
                    className="inputForm"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={methods.handleUsernameChange}
                  >
                  </input>
                </div>
                <div id="inputField">Password
                  <input
                    id="loginInput"
                    className="inputForm"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={methods.handlePasswordChange}
                  >
                  </input>
                </div>
                <div id="inputField">Confirm Password
                  <input
                    id="loginInput"
                    className="inputForm"
                    type="password"
                    name="confirmedPassword"
                    value={this.state.confirmedPassword}
                    onChange={methods.handleConfirmedPasswordChange}
                  >
                  </input>
                </div>
                <div>
                  <button type="submit">Create Account</button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
          <Row>
            <Col md={12}>
              {showErr}
              {showPasswordErr}
              <div id="goToLogin">
                <p>Already have an account? Sign in <Link to={'login'}>here</Link></p>
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

SignUp.propTypes = {
  setUserLoggedIn: React.PropTypes.func,
};

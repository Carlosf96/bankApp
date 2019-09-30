import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidMount() {
    //if logged in should redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div style={{ height: '100vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4 className='flow-text'>
              A <b>secure</b> personal banking app consuming plaid api and the{' '}
              <span style={{ fontFamily: 'monospace' }}>
                <b>MERN</b>
              </span>{' '}
              stack
            </h4>
            <br />
            <div className='col s12 center-align'>
              <Link
                to='/register'
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3 z-depth-2'
              >
                Register
              </Link>
              <Link
                to='/login'
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3 z-depth-2'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);

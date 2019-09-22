import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar-fixed'>
          <div className='nav-wrapper blue accent-3'>
            <Link 
              to='/'
              style={{
                fontFamily: 'monospace'
              }}
              className='col s5 brand-logo center white-text'>
              <i className='material-icons'>code</i>{/*airbnb style guide says always self close tags that dont have children*/}
                secBank
              </Link>
          </div>
        </nav> 
      </div>
    )
  }
}

export default Navbar;
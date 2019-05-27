import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import credit_card from "../../img/credit_card.png";

class Landing extends Component {
  componentDidMount() {
    //if logged in should redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <img
              src={credit_card}
              style={{ width: "350px" }}
              className="responsive-img credit-card"
              alt="Undraw"
            />
            <h4 className="flow-text">
              <b>Build</b> a personal banking app consuming plaid api and the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span>
              stack
            </h4>
            <br />
            <div className="col s12">
              <Link
                to="/register"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginBottom: "5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s12">
              <Link
                to="/login"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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

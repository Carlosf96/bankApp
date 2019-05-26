import React, { Component } from "react";
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAccounts, addAccount } from "../../actions/accountActions";

import Accounts from "./Accounts";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }
  //logout fn
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  //add account fn
  handleOnSucess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata
    };
    this.props.addAccount(plaidData);
  };

  render() {
    const { user } = this.props.auth;
    const { accounts, accountsLoading } = this.props.plaid;

    let dashboardContent;

    if (accounts === null || accountsLoading) {
      dashboardContent = <p className="center-align">Loading...</p>;
    } else if (accounts.length > 0) {
      dashboardContent = <Accounts user={user} accounts={accounts} />;
    } else {
      //user has no accounts linked
      dashboardContent = (
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome,</b> {user.name.split(" ")[0]}
              {/**Renders first name */}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              To get started, link your first bank account below.
            </p>
          </div>
          <PlaidLinkButton
            buttonProps={{
              className:
                "btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn"
            }}
            plaidLinkProps={{
              clientName: "Bankaroni",
              key: "Key",
              env: "sandbox",
              product: ["transactions"],
              onSuccess: this.handleOnSucess
            }}
            onScriptLoad={() => this.setState({ loaded: true })}
          />
        </div>
      );
    }
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👻
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

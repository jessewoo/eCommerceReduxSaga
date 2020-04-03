import React from 'react';
import { Link } from 'react-router-dom';

// connect is a HOC that modifies the component to have access to things in redux.
// HOC - it's a function that takes components as arguments and return a suped up component
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

// currentUser is not receiving from App.js but from the reducer
const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// Function that access the state, the state being our root reducer
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);

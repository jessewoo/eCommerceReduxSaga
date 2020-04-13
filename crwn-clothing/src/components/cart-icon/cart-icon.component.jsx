import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

// Can access toggleCartHidden here
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

// Gets the dispatch, triggers the dispatch of toggleCartHidden
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

// What if we needed the count, we would write a mapStateToProps function
// Get our cart from state, destructure it
// We are writing a SELECTOR - pulls in a small slice of that state
// We are computing a new value based off of the state
// but the caveat, whenever any reducer updates - it will always return a new object, redux will recompose and rebuild the entire page
// mapStateToProps is getting every single time, when it's passing in new props to components - it is always RE-RENDERING our component
//
const mapStateToProps = (state) => {
  // It keep firing whenever state changes. Our reduce() doesn't know if the cartItem might be the exact same
  // Our STATE is always a NEW OBJECT, even though the cart item is identical, the object of our total state is a BRAND NEW OBJECT
  // NOT GOOD FOR PERFORMANCE, don't want to re-render our component every time the state changes, especially modifying the state that we don't care about
  // We want to store the CACHE the value
  // Memoization - caching of the selector values
  console.log('I am being called');

  // Passing whole reducer state into the selector
  return {
    itemCount: selectCartItemsCount(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

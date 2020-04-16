import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

// otherProps - have access to dispatch, history
const CartDropdown = ({ cartItems, history, /*...otherProps*/ dispatch }) => {
  // Have access to dispatch, location, match
  // console.log(otherProps);
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

// Never gets re-rendered if there is nothing related to that gets udpated
// Use selector cart
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// With HOC, it's evaluating inside out
// Connect passes in dispatch as a prop into our component if we don't supply a 2nd argument to connect
// Because if we need to write one off dispatches, no reason to write mapDispatchToProps
export default withRouter(connect(mapStateToProps)(CartDropdown));

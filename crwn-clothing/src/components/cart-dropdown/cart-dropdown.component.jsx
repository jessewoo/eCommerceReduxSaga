import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selector';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history }) => (
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
    <CustomButton onClick={() => history.push('/checkout')}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

// Never gets re-rendered if there is nothing related to that gets udpated
// Use selector cart
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// With HOC, it's evaluating inside out
export default withRouter(connect(mapStateToProps)(CartDropdown));

import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItemFunc }) => {
  // Explicit return of our function, we are rendering multiple JS functions
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton onClick={() => addItemFunc(item)} inverted>
        Add to Cart
      </CustomButton>
    </div>
  );
};

// Create a new function 'addItem' that will go into our component
const mapDispatchToProps = (dispatch) => ({
  // addItem is the function, pass to the addItem action Creator
  addItemFunc: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);

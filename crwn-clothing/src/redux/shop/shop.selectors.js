import { createSelector } from 'reselect';

// Declare our initial input selector, gets the state and returns state.shop
const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
) 
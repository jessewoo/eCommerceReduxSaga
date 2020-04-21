import { createSelector } from 'reselect';

// Declare our initial input selector, gets the state and returns state.shop
const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

// Map over the collections by selecting it, passing into it our new selectCollection selector the urlParameter
// Will return createSelector, which is a called curry function - basically it's a function that RETURNS another function
// It will return the shape of const selectShop = state => state.shop
// It does a state that does a transformation
// Pass it thru our selector chain so we get our collections array, that we'll filter
// Flaw in storing data inside an array. BETTER TO STORE IN AN OBJECT. Go left to right when using 'find'
// Storing list of elements inside an object instead of array is DATA NORMALIZATION
// Best way to store inside element inside reducer


export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

// Optimized the QUERY SEARCH, if object of collections GROWS, 100s or 1000s, just as fast to get the last one as fast as first one. 
// It just looks for the property in the object in order to get the corresponding collection objects
// Hash Table Data Structure
export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections => collections[collectionUrlParam])
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';

import { firestore } from '../../firebase/firebase.utils'

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  useEffect(() => {
    console.log("I am subscribing");
    const unscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot))

    // Clean up function, componenWillUnmount
    return () => {
      console.log('I am unsubscribing');
      unscribeFromCollections();
    }
  },[])

  const { title, items } = collection;

  return (
    <div className='collection-page'>
      <h2>Collection Page</h2>

      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// This is necessary because unlike other selectors, this selector needs a part of the state depending on the URL parameter
// OwnProps is the secondary parameters, that gives us ALL the props on our collection component, including the match compoennt
// Because selectCollection is a function that returns function. We pass the function that comes out of that function with STATE, which wires EVERYTHING TOGETHER
// Now we have access to our collection
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

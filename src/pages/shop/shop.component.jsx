import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// The only thing our shop page does is take in the selector and pass them into the component
// Why KEEP the logic on our shop app
class ShopPage extends React.Component {
  // Runs after the initial render call, will take in isCollectionFetching is false (initial)
  componentDidMount() {
    // Destructure it
    const { fetchCollectionsStart } = this.props;

    // We no longer need an asynchronous action like our fetch collections start async to handle that logic
    // Move all of that into a saga, have saga listen for the start of that API redux chain
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

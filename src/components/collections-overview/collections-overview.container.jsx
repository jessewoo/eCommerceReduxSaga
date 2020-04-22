// Two wrapping HOC
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoaded: selectIsCollectionFetching,
});

// Compose / Evaluates from RIGHT to LEFT
// Equivalent to connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// Evaluate multiple curried functions where the functions returns another function that expects something to be passed to it and allows you to chain them all togeher
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;

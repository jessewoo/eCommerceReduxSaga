import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directoy.selectors';

import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

// No reason to have a class component if we don't need state

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {/* Destructure the object, pass in the keys */}
    {/* Use a spread operator instead of writing { title, size, imageUrl }, spread operator - the key = value */}
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

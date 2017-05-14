import * as React from 'react';
import { Link, IndexLink } from 'react-router';

require('../../assets/stylesheets/base.less');
require('./index.less');

interface INavigationProps {
}

interface INavigationState {
}

export default class Navigation extends React.PureComponent<INavigationProps, INavigationState> {
  render() {
    return (
      <div className="navigation-component">
        <IndexLink to="/" activeClassName="active">Issues</IndexLink>
        <Link to="/milestones" activeClassName="active">Milestones</Link>
      </div>
    );
  }
};

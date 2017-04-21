import * as React from 'react';
import { IndexLink } from 'react-router';
import { ServiceManager } from '../../services';
import Avatar from '../avatar';

require('../../assets/stylesheets/base.less');
require('./index.less');

interface IHeaderProps {
}

interface IHeaderState {
}

export default class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
  private application = ServiceManager.Instance.getApplication();

  render() {
    const user = this.application.users.get(this.application.getSession().user);

    return (
      <div className="header-component">
        <div className="row">
          <div className="main">
            <IndexLink className="title" to="/">nautilus</IndexLink>
          </div>
          <div className="profile">
            <Avatar user={user} size={30} />
          </div>
        </div>
      </div>
    );
  }
};

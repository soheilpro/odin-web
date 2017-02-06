import * as React from 'react';
import { IIssue } from '../../application';

require('./index.less');

interface IIssueDetailProps {
  issue: IIssue;
}

interface IIssueDetailState {
}

export default class IssueDetail extends React.Component<IIssueDetailProps, IIssueDetailState> {
  render() {
    return (
      <div className="issue-detail component">
        <div className="header">Issue #{this.props.issue.sid}</div>
      </div>
    );
  }
};

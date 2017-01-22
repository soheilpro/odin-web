import * as React from 'react';
import { IIssueType } from '../../application';
import { ServiceManager } from '../../services';

require('./index.less');

interface IIssueTypeFieldProps {
  issueType: IIssueType;
}

interface IIssueTypeFieldState {
}

export default class IssueTypeField extends React.Component<IIssueTypeFieldProps, IIssueTypeFieldState> {
  private application = ServiceManager.Instance.getApplication();

  render() {
    if (!this.props.issueType)
      return null;

    let issueType = this.application.issueTypes.get(this.props.issueType);

    return (
      <div className="issue-type-field component">
        {issueType.title}
      </div>
    );
  }
};

import * as React from 'react';
import { IIssue } from '../../application';
import { ICommand } from '../../commands';
import { ServiceManager } from '../../services';
import Modal from '../modal';
import AddEditIssueBox from './add-edit-issue-box';

interface IAddEditIssueModalProps {
  isOpen: boolean;
  onSave(issue: IIssue): void;
  onCloseRequest(): void;
}

interface IAddEditIssueModalState {
}

export default class AddEditIssueModal extends React.Component<IAddEditIssueModalProps, IAddEditIssueModalState> {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} onCloseRequest={this.props.onCloseRequest}>
        <AddEditIssueBox onSave={this.props.onSave} autoFocus={true} />
      </Modal>
    );
  }
}

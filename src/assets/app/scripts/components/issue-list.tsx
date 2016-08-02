import * as React from 'react';
import { AssignedUserIssueField } from './issue-field-assigned-user';
import { MilestoneIssueField } from './issue-field-milestone';
import { StateIssueField } from './issue-field-state';
import { ProjectIssueField } from './issue-field-project';
import { TitleIssueField } from './issue-field-title';

interface IssueListProps {
  issues;
}

interface IssueListState {
  selectedRowIndex?;
  selectedColumnIndex?;
}

export class IssueList extends React.Component<IssueListProps, IssueListState> {
  constructor() {
    super();

    this.state = {
      selectedRowIndex: 0,
      selectedColumnIndex: 0
    };
  }

  onKeyDown(event) {
    if (event.target !== event.currentTarget)
      return;

    switch (event.which) {
      case 38: // Up
        if (this.state.selectedRowIndex === 0)
          return;

        this.setState({
          selectedRowIndex: this.state.selectedRowIndex - 1
        });

        event.preventDefault();
        break;

      case 40: // Down
        if (this.state.selectedRowIndex === this.props.issues.length - 1)
          return;

        this.setState({
          selectedRowIndex: this.state.selectedRowIndex + 1
        });

        event.preventDefault();
        break;

      case 37: // Left
        if (this.state.selectedColumnIndex === 0)
          return;

        this.setState({
          selectedColumnIndex: this.state.selectedColumnIndex - 1
        });

        event.preventDefault();
        break;

      case 39: // Right
        if (this.state.selectedColumnIndex === 5 - 1)
          return;

        this.setState({
          selectedColumnIndex: this.state.selectedColumnIndex + 1
        });

        event.preventDefault();
        break;

      case 13: // Enter
        (this.refs['cell-' + this.state.selectedRowIndex + '-' + this.state.selectedColumnIndex] as any).edit();

        event.preventDefault();
        break;
    }
  }

  onSelected(rowIndex, columnIndex) {
    this.setState({
      selectedRowIndex: rowIndex,
      selectedColumnIndex: columnIndex
    });
  }

  render() {
    return (
      <table className='issues'>
        <thead>
          <tr>
            <th>Project</th>
            <th>Milestone</th>
            <th>Title</th>
            <th>State</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.issues.map((issue, index) => {
              return (
                <tr key={issue.id} className={this.state.selectedRowIndex === index ? 'selected' : ''}>
                  <td className={'project ' + (this.state.selectedColumnIndex === 0 ? 'selected' : '')} tabIndex="0" onKeyDown={this.onKeyDown.bind(this)} onClick={this.onSelected.bind(this, index, 0)}>
                    <ProjectIssueField issue={issue} ref={'cell-' + index + '-0'} />
                  </td>
                  <td className={'milestone ' + (this.state.selectedColumnIndex === 1 ? 'selected' : '')} tabIndex="0" onKeyDown={this.onKeyDown.bind(this)} onClick={this.onSelected.bind(this, index, 1)}>
                    <MilestoneIssueField issue={issue} ref={'cell-' + index + '-1'} />
                  </td>
                  <td className={'title ' + (this.state.selectedColumnIndex === 2 ? 'selected' : '')} tabIndex="0" onKeyDown={this.onKeyDown.bind(this)} onClick={this.onSelected.bind(this, index, 2)}>
                    <TitleIssueField issue={issue} ref={'cell-' + index + '-2'} />
                  </td>
                  <td className={'state ' + (this.state.selectedColumnIndex === 3 ? 'selected' : '')} tabIndex="0" onKeyDown={this.onKeyDown.bind(this)} onClick={this.onSelected.bind(this, index, 3)}>
                    <StateIssueField issue={issue} ref={'cell-' + index + '-3'} />
                  </td>
                  <td className={'state ' + (this.state.selectedColumnIndex === 4 ? 'selected' : '')} tabIndex="0" onKeyDown={this.onKeyDown.bind(this)} onClick={this.onSelected.bind(this, index, 4)}>
                    <AssignedUserIssueField issue={issue} ref={'cell-' + index + '-4'} />
                  </td>
                </tr>
              );
            }, this)
          }
        </tbody>
      </table>
    );
  }
};

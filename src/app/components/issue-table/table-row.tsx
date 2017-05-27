import * as React from 'react';
import * as classNames from 'classnames';
import { IIssue } from '../../application';
import { ITableRow } from '../table';
import ItemPriorityField from '../item-priority-field';
import ItemPriorityIndicator from '../item-priority-indicator';
import ItemStateField from '../item-state-field';
import ItemTypeField from '../item-type-field';
import MilestoneField from '../milestone-field';
import ProjectField from '../project-field';
import SidField from '../sid-field';
import TitleField from '../title-field';
import UserField from '../user-field';

require('../../assets/stylesheets/base.less');
require('./table-row.less');

interface ITableRowProps {
  item: IIssue;
  index: number;
  isSelected: boolean;
  onSelect?(item: IIssue): void;
  onAction?(item: IIssue): void;
}

interface ITableRowState {
}

export default class TableRow extends React.PureComponent<ITableRowProps, ITableRowState> implements ITableRow {
  private componentElement: HTMLElement;

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  focus() {
    this.componentElement.focus();
  }

  private handleClick() {
    if (this.props.onSelect)
      this.props.onSelect(this.props.item);
  }

  private handleDoubleClick() {
    if (this.props.onAction)
      this.props.onAction(this.props.item);
  }

  render() {
    return (
      <tr className={classNames('table-row-component', 'table-row', { 'selected': this.props.isSelected })} tabIndex={0} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} ref={e => this.componentElement = e}>
        <td className="table-cell sid">
          <SidField sid={this.props.item.sid} bold={this.props.isSelected} />
        </td>
        <td className="table-cell title">
          <TitleField title={this.props.item.title} state={this.props.item.state} />
          {
            this.props.item.state && this.props.item.state.key !== 'closed' &&
              <ItemPriorityIndicator className="priority-indicator" itemPriority={this.props.item.priority} />
          }
        </td>
        <td className="table-cell project">
          <ProjectField project={this.props.item.project} />
        </td>
        <td className="table-cell type">
          <ItemTypeField itemType={this.props.item.type} />
        </td>
        <td className="table-cell priority">
          <ItemPriorityField itemPriority={this.props.item.priority} />
        </td>
        <td className="table-cell state">
          <ItemStateField itemState={this.props.item.state} />
        </td>
        <td className="table-cell assigned-to">
          <UserField user={this.props.item.assignedTo} />
        </td>
        <td className="table-cell milestone">
          <MilestoneField milestone={this.props.item.milestone} />
        </td>
      </tr>
    );
  }
};

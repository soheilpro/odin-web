import * as React from 'react';
import { Nautilus } from '../nautilus';
import { IssueField } from './issue-field';

export class StateIssueField extends IssueField {
  getItem() {
    return this.props.issue.getState();
  }

  getItems() {
    return Nautilus.Instance.getStates();
  }

  itemToString(item) {
    return item ? item.title : '';
  }

  itemFromString(item, items) {
    return _.find(items, (item : any) => item.title.toLowerCase() === item.toLowerCase());
  }

  itemComparer(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  setItem(item) {
    Nautilus.Instance.updateIssue(this.props.issue, { state: item || null });
  }
};

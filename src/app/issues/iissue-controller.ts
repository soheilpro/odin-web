import { IIssue } from '../application';

export interface IIssueController {
  addIssue(issue: IIssue, parentIssue?: IIssue): void;
  editIssue(issue: IIssue): void;
  deleteIssue(issue: IIssue): void;
}

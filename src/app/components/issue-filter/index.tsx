import * as _ from 'underscore';
import * as React from 'react';
import * as NQL from '../../nql';
import Expression from '../expression';
import IssueProjectFilter from '../issue-project-filter';
import IssueTypeFilter from '../issue-type-filter';

require('../../assets/stylesheets/base.less');
require('./index.less');

interface IQueryObject {
  [key: string]: NQL.Expression;
};

interface IIssueFilterProps {
  query?: NQL.Expression;
}

interface IIssueFilterState {
  queries?: IQueryObject;
}

export default class IssueFilter extends React.Component<IIssueFilterProps, IIssueFilterState> {
  private filters = [
    { key: 'project', Component: IssueProjectFilter },
    { key: 'type',    Component: IssueTypeFilter },
  ];

  constructor(props: IIssueFilterProps) {
    super();

    this.handleFilterChange = this.handleFilterChange.bind(this);

    this.state = {
      queries: this.getQueryObject(props.query) || {},
    };
  }

  private getQueryObject(query: NQL.Expression) {
    if (!query)
      return null;

    let children = (query as NQL.AndExpression).children.slice();
    let queries: IQueryObject = {};

    for (let child of children) {
      for (let filter of this.filters) {
        if (filter.Component.canParseQuery(child)) {
          queries[filter.key] = child;
          break;
        }
      }
    }

    return queries;
  }

  private handleFilterChange(key: string, query: NQL.IExpression) {
    let queries = _.clone(this.state.queries);

    if (query)
      queries[key] = query;
    else
      delete queries[key];

    this.setState({
      queries: queries,
    });
  }

  private getQuery(queries: IQueryObject) {
    let queryValues = _.values(queries);

    if (queryValues.length === 0)
      return null;

    return new NQL.AndExpression(queryValues);
  }

  render() {
    return (
      <div className="issue-filter-component">
        <div className="text">
          <Expression expression={this.getQuery(this.state.queries)} />
        </div>
        <div className="filters">
          {
            this.filters.map(filter => {
              return (
                <filter.Component query={this.state.queries[filter.key]} onChange={_.partial(this.handleFilterChange, filter.key)} ref={null} children={null} key={filter.key} />
              );
            })
          }
        </div>
      </div>
    );
  }
};

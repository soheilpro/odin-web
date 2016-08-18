import { IExpression } from './expression'
import { ExpressionVisitor } from './expressionvisitor'
import { AndExpression } from './expressions/and'
import { CastExpression } from './expressions/cast'
import { ComparisonExpression } from './expressions/comparison'
import { ConstantExpression } from './expressions/constant'
import { ListExpression } from './expressions/list'
import { LocalExpression } from './expressions/local'
import { MethodCallExpression } from './expressions/methodcall'
import { OrExpression } from './expressions/or'
import { PropertyExpression } from './expressions/property'

export interface IExpressionObject {
  type: string;
  args: (IExpressionObject | IExpressionObject[] | string)[]
}

export class ExpressionObjectConverter extends ExpressionVisitor<IExpressionObject, {}> {
  convert(expression: IExpression, context: {}): IExpressionObject {
    return this.visit(expression, context);
  }

  visitAnd(expression: AndExpression, context: {}): IExpressionObject {
    return {
      type: 'And',
      args: [
        expression.children.map(e => this.visit(e, context))
      ]
    };
  }

  visitCast(expression: CastExpression, context: {}): IExpressionObject {
    return {
      type: 'Cast',
      args: [
        this.visit(expression.child, context),
        expression.type
      ]
    };
  }

  visitComparison(expression: ComparisonExpression, context: {}): IExpressionObject {
    return {
      type: 'Comparison',
      args: [
        this.visit(expression.left, context),
        this.visit(expression.right, context),
        expression.operator
      ]
    };
  }

  visitConstant(expression: ConstantExpression, context: {}): IExpressionObject {
    return {
      type: 'Constant',
      args: [
        expression.value,
        expression.type
      ]
    };
  }

  visitList(expression: ListExpression, context: {}): IExpressionObject {
    return {
      type: 'List',
      args: [
        expression.children.map(e => this.visit(e, context))
      ]
    };
  }

  visitLocal(expression: LocalExpression, context: {}): IExpressionObject {
    return {
      type: 'Local',
      args: [
        expression.name
      ]
    };
  }

  visitMethodCall(expression: MethodCallExpression, context: {}): IExpressionObject {
    return {
      type: 'MethodCall',
      args: [
        this.visit(expression.target, context),
        expression.name,
        expression.args.map(e => this.visit(e, context))
      ]
    };
  }

  visitOr(expression: OrExpression, context: {}): IExpressionObject {
    return {
      type: 'Or',
      args: [
        expression.children.map(e => this.visit(e, context))
      ]
    };
  }

  visitProperty(expression: PropertyExpression, context: {}): IExpressionObject {
    return {
      type: 'Property',
      args: [
        this.visit(expression.target, context),
        expression.name
      ]
    };
  }

  parse(value: IExpressionObject): IExpression {
    if (value.type === 'And')
      return new AndExpression(
        (value.args[0] as IExpressionObject[]).map(o => this.parse(o))
      );

    if (value.type === 'Cast')
      return new CastExpression(
        this.parse(value.args[0] as IExpressionObject),
        value.args[1] as string
      );

    if (value.type === 'Comparison')
      return new ComparisonExpression(
        this.parse(value.args[0] as IExpressionObject),
        this.parse(value.args[1] as IExpressionObject),
        value.args[2] as string
      );

    if (value.type === 'Constant')
      return new ConstantExpression(
        value.args[0] as any,
        value.args[1] as string
      );

    if (value.type === 'List')
      return new ListExpression(
        (value.args[0] as IExpressionObject[]).map(o => this.parse(o))
      );

    if (value.type === 'Local')
      return new LocalExpression(
        value.args[0] as string
      );

    if (value.type === 'MethodCall')
      return new MethodCallExpression(
        this.parse(value.args[0] as IExpressionObject),
        value.args[1] as string,
        (value.args[2] as IExpressionObject[]).map(o => this.parse(o))
      );

    if (value.type === 'Or')
      return new OrExpression(
        (value.args[0] as IExpressionObject[]).map(o => this.parse(o))
      );

    if (value.type === 'Property')
      return new PropertyExpression(
        this.parse(value.args[0] as IExpressionObject),
        value.args[1] as string
      );

    throw new Error('Not Implemented');
  }
}

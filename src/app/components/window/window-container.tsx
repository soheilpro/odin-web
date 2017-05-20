import * as React from 'react';
import { KeyCode } from '../../keyboard';

require('../../assets/stylesheets/base.less');
require('./window-container.less');

interface IWindowContainerProps {
  top?: number;
  width?: number;
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  blurCheckElement?: HTMLElement;
  onCloseRequest?(): void;
}

interface IWindowContainerState {
  zIndex?: number;
}

export class WindowContainer extends React.PureComponent<IWindowContainerProps, IWindowContainerState> {
  static defaultProps = {
    closeOnBlur: true,
    closeOnEsc: true,
  };

  private static zIndexCounter = 1000;

  private componentElement?: HTMLElement;

  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {};
  }

  componentWillMount() {
    this.state = {
      zIndex: WindowContainer.zIndexCounter++,
    };
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.which === KeyCode.Escape) {
      event.preventDefault();

      if (this.props.closeOnEsc)
        this.props.onCloseRequest();
    }
  }

  private handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!this.props.closeOnBlur)
      return;

    setTimeout(() => {
      if ((this.props.blurCheckElement || this.componentElement).contains(document.activeElement))
        return;

      if (this.props.closeOnEsc)
        this.props.onCloseRequest();
    }, 0);
  }

  render() {
    return (
      <div className="window-container-component" style={{ top: this.props.top, left: `calc(100% / 2 - ${this.props.width}px / 2)`, width: this.props.width, zIndex: this.state.zIndex }} tabIndex={0} onKeyDown={this.handleKeyDown} onBlur={this.handleBlur} ref={e => this.componentElement = e}>
        {this.props.children}
      </div>
    );
  }
};

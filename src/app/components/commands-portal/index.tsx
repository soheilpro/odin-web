import * as React from 'react';
import { ICommandProvider, ICommand } from '../../commands';
import { KeyCombination, isInputEvent } from '../../keyboard';
import { ServiceManager } from '../../services';
import { IWindow } from '../../windows';
import ViewCommandsCommand from './view-commands-command';
import CommandsWindow from '../commands-window';
import UndoCommand from './undo-command';

interface ICommandsPortalProps {
}

interface ICommandsPortalState {
}

export default class CommandsPortal extends React.Component<ICommandsPortalProps, ICommandsPortalState> implements ICommandProvider {
  private actionManager = ServiceManager.Instance.getActionManager();
  private commandManager = ServiceManager.Instance.getCommandManager();
  private windowManager = ServiceManager.Instance.getWindowManager();
  private keyboardEvents: KeyboardEvent[] = [];
  private commandsWindow: IWindow;

  constructor() {
    super();

    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleViewCommandsCommandExecute = this.handleViewCommandsCommandExecute.bind(this);
    this.handleCommandsWindowSelect = this.handleCommandsWindowSelect.bind(this);

    this.state = {};
  }

  componentWillMount() {
    this.commandManager.registerCommandProvider(this);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    this.commandManager.unregisterCommandProvider(this);
  }

  getCommands() {
    return [
      new ViewCommandsCommand(this.handleViewCommandsCommandExecute),
      new UndoCommand(),
    ];
  }

  private handleDocumentKeyDown(event: KeyboardEvent) {
    if (isInputEvent(event))
      return;

    this.keyboardEvents.push(event);

    // Starting from the event before the last event, if we encounter a stale event, remove that event and all events before that
    for (let i = this.keyboardEvents.length - 2; i >= 0; i--) {
      if (this.keyboardEvents[i + 1].timeStamp - this.keyboardEvents[i].timeStamp > 500) {
        this.keyboardEvents.splice(0, i + 1);
        break;
      }
    }

    // Find (fully of partially) matching commands
    let matchingCommands: ICommand[] = [];
    for (let command of this.commandManager.getCommands()) {
      if (!command.shortcut)
        continue;

      if (KeyCombination.matchesSome(command.shortcut, this.keyboardEvents) > 0)
        matchingCommands.push(command);
    }

    // No mathing command
    if (matchingCommands.length === 0) {

      // Reset events
      this.keyboardEvents = [];
    }
    // One matching command
    else if (matchingCommands.length === 1) {
      let command = matchingCommands[0];

      // Fully matching command
      if (command.shortcut.length === this.keyboardEvents.length) {
        command.execute();

        event.preventDefault();
        this.keyboardEvents = [];
      }
      else {
        // Partially matching command
        // Wait for more events
      }
    }
  }

  private handleViewCommandsCommandExecute() {
    this.commandsWindow = {
      content: <CommandsWindow onSelect={this.handleCommandsWindowSelect} />,
      top: 20,
      closeOnBlur: true,
      closeOnEsc: true,
    };

    this.windowManager.showWindow(this.commandsWindow);
  }

  private handleCommandsWindowSelect(command: ICommand) {
    command.execute();
    this.windowManager.closeWindow(this.commandsWindow);
  }

  render() {
    return (
      <div className="commands-portal component">
      </div>
    );
  }
};

import { IAction } from './iaction';

export interface IActionManager {
  getActions(): IAction[];
  execute(action: IAction): void;
  undo(): void;
}

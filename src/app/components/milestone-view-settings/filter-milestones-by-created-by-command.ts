import { BaseCommand } from '../../commands';
import { KeyCode } from '../../keyboard';

export default class FilterMilestonesByCreatedByCommand extends BaseCommand {
  constructor(private onExecute: () => void) {
    super();
  }

  get id() {
    return 'milestone-created-by-filter';
  }

  get title() {
    return 'Filter Milestones by Created By';
  }

  get shortcut() {
    return [
      { keyCode: KeyCode.F },
      { keyCode: KeyCode.M },
      { keyCode: KeyCode.C },
    ];
  }

  execute() {
    this.onExecute();
  }
}

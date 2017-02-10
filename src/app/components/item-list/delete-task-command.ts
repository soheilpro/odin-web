import { ITask } from '../../application';
import { BaseCommand } from '../../commands';
import { KeyCode } from '../../keyboard';
import { ServiceManager } from '../../services';

export default class DeleteTaskCommand extends BaseCommand {
  private taskController = ServiceManager.Instance.getTaskController();

  constructor(private task: ITask) {
    super();
  }

  get id() {
    return 'delete-task';
  }

  get name() {
    return 'Delete Task';
  }

  get shortcut() {
    return [{ keyCode: KeyCode.Delete }];
  }

  get enabled() {
    return !!this.task;
  }

  execute() {
    this.taskController.deleteTask(this.task);
  }
}
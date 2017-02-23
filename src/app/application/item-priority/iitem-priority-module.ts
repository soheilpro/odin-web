import { IModule } from '../imodule';
import { IItemPriority } from '../../sdk';
import { ItemKind } from '../item-kind';

export interface IItemPriorityModule extends IModule {
  getAll(itemKind: ItemKind): IItemPriority[];
  get(ItemPriority: IItemPriority): IItemPriority;
}

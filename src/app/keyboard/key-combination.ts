import { IKeyCombination } from './ikey-combination';
import { IShortcut } from './ishortcut';

export class KeyCombination {
  static matches(keyCombination: IKeyCombination, event: KeyboardEvent): boolean {
    if (keyCombination.keyCode !== event.keyCode)
      return false;

    if ((keyCombination.ctrlKey || false) !== event.ctrlKey)
      return false;

    if ((keyCombination.shiftKey || false) !== event.shiftKey)
      return false;

    if ((keyCombination.altKey || false) !== event.altKey)
      return false;

    if ((keyCombination.metaKey || false) !== event.metaKey)
      return false;

    return true;
  }

  static matchesAll(keyCombinations: IShortcut, events: KeyboardEvent[]): boolean {
    for (let i = 0; i < keyCombinations.length; i++)
      if (!this.matches(keyCombinations[i], events[i]))
        return false;

    return true;
  }
}
interface IKeyCombination {
  which: number;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
}

interface ICondition {
  (event: KeyboardEvent): boolean;
}

interface IHandler {
  (event: KeyboardEvent): void;
}

export class KeyMaster {
  static handle(event: KeyboardEvent, keyCombination: IKeyCombination, condition: boolean | ICondition, handler: IHandler, preventDefault?: boolean) {
    if (keyCombination.which != event.which)
      return;

    if ((keyCombination.ctrlKey || false) !== event.ctrlKey)
      return;

    if ((keyCombination.shiftKey || false) !== event.shiftKey)
      return;

    if ((keyCombination.altKey || false) !== event.altKey)
      return;

    if ((keyCombination.metaKey || false) !== event.metaKey)
      return;

    if (condition !== null) {
      if (typeof condition === 'boolean') {
        if (!condition)
          return;
      }
      else if (!condition(event)) {
        return;
      }
    }

    var result = handler(event);

    if (preventDefault !== undefined ? preventDefault : result)
      event.preventDefault();
  }
}

export function isInInput(event: KeyboardEvent) {
  return (event.target as HTMLElement).nodeName === 'INPUT' ||
         (event.target as HTMLElement).nodeName === 'TEXTAREA';
}

export function isNotInInput(event: KeyboardEvent) {
  return !isInInput(event);
}

export enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  Pause = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  LeftArrow = 37,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40,
  Insert = 45,
  Delete = 46,
  Num1 = 49,
  Num2 = 50,
  Num3 = 51,
  Num4 = 52,
  Num5 = 53,
  Num6 = 54,
  Num7 = 55,
  Num8 = 56,
  Num9 = 57,
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,
  LeftMeta = 91,
  RightMeta = 92,
  Select = 93,
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  Multiply = 106,
  Add = 107,
  Subtract = 109,
  Decimal = 110,
  Divide = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NumLock = 144,
  ScrollLock = 145,
  Semicolon = 186,
  Equals = 187,
  Comma = 188,
  Dash = 189,
  Period = 190,
  ForwardSlash = 191,
  GraveAccent = 192,
  OpenBracket = 219,
  BackSlash = 220,
  CloseBracket = 221,
  SingleQuote = 222
}

// Wrap Math in a chaining-style function.

class MathChain {
  _value: number;
  constructor(value: number) {
    this._value = value;
  }
  get() {
    return this._value;
  }
}

export const mathChain = (value: number) => new MathChain(value);

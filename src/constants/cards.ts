interface IRatio {
  x: number;
  y: number;
  readonly frac: number;
  _frac: undefined | number;
}

const maxCardWidth = 0.85; // as a percentage of the parent element
const maxCardHeight = 0.7; // as a percentage of the parent element
const cardRatio: IRatio = {
  x: 5,
  y: 8,
  get frac() {
    return this._frac ?? (this._frac = this.x / this.y);
  },
  _frac: undefined, // lazy getter pattern
};

export { maxCardWidth, maxCardHeight, cardRatio };

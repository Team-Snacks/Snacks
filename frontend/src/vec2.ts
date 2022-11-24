export class Vec2 {
  v: [number, number]
  constructor(a: number, b: number) {
    this.v = [a, b]
  }

  static zero() {
    return new Vec2(0, 0)
  }
  static one() {
    return new Vec2(1, 1)
  }

  neg() {
    return new Vec2(-this.v[0], -this.v[1])
  }
  round() {
    return new Vec2(Math.round(this.v[0]), Math.round(this.v[1]))
  }
  eq(other: Vec2): boolean {
    return this.v[0] === other.v[0] && this.v[1] === other.v[1]
  }
  add(other: Vec2) {
    return new Vec2(this.v[0] + other.v[0], this.v[1] + other.v[1])
  }
  sub(other: Vec2) {
    return new Vec2(this.v[0] - other.v[0], this.v[1] - other.v[1])
  }

  /**
   * @example
   * vec2(1, 2).mul(3, 4) // => vec2(3, 8)
   */
  mul(other: Vec2): Vec2
  /**
   * @example
   * vec2(1, 2).mul(2) // => vec2(2, 4)
   */
  mul(scalar: number): Vec2
  mul(other: Vec2 | number) {
    switch (typeof other) {
      case 'number':
        return new Vec2(this.v[0] * other, this.v[1] * other)
      default:
        return new Vec2(this.v[0] * other.v[0], this.v[1] * other.v[1])
    }
  }
  /**
   * @example
   * vec2(3, 8).div(3, 4) // => vec2(1, 2)
   */
  div(other: Vec2): Vec2
  /**
   * @example
   * vec2(2, 4).div(2) // => vec2(1, 2)
   */
  div(scalar: number): Vec2
  div(other: Vec2 | number) {
    switch (typeof other) {
      case 'number':
        return new Vec2(this.v[0] / other, this.v[1] / other)
      default:
        return new Vec2(this.v[0] / other.v[0], this.v[1] / other.v[1])
    }
  }
}

export class Pos extends Vec2 {
  constructor(x: number, y: number) {
    super(x, y)
  }
  get x() {
    return this.v[0]
  }
  get y() {
    return this.v[1]
  }
  set x(x: number) {
    this.v[0] = x
  }
  set y(y: number) {
    this.v[1] = y
  }
}

export class Size extends Vec2 {
  constructor(width: number, height: number) {
    super(width, height)
  }
  get w() {
    return this.v[0]
  }
  get h() {
    return this.v[1]
  }
  set w(width: number) {
    this.v[0] = width
  }
  set h(height: number) {
    this.v[1] = height
  }
}

type Cons = (a: number, b: number) => Vec2
export const vec2: Cons = (a, b) => new Vec2(a, b)
export const pos: Cons = (a, b) => new Pos(a, b)
export const size: Cons = (a, b) => new Size(a, b)

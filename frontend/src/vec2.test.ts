import { pos, Pos, size, Size, vec2, Vec2 } from './vec2'
import { describe, expect, test } from 'vitest'

type Create = 'Vec2' | 'Pos' | 'Size'
const create =
  (type: Create = 'Vec2') =>
  (a: number, b: number) => {
    switch (type) {
      case 'Vec2':
        return vec2(a, b)
      case 'Pos':
        return pos(a, b)
      case 'Size':
        return size(a, b)
    }
  }

describe.each(['Vec2', 'Pos', 'Size'] as Create[])('%s 메소드', type => {
  const cons = create(type)
  const a = cons(1, 2)
  const b = cons(3, 4)
  const decimal = cons(1.7, 2.3)

  test('neg', () => expect(a.neg()).toEqual(cons(-1, -2)))

  test('add', () => expect(a.add(b)).toEqual(cons(4, 6)))
  test('sub', () => expect(a.sub(b)).toEqual(cons(-2, -2)))
  test('round', () => expect(decimal.round()).toEqual(cons(2, 2)))

  describe('mul', () => {
    test(`with Vec2`, () => expect(a.mul(b)).toEqual(cons(3, 8)))
    test(`with number`, () => expect(a.mul(2)).toEqual(cons(2, 4)))
  })

  describe('div', () => {
    test('with cons', () => expect(a.div(b)).toEqual(cons(1 / 3, 0.5)))
    test('with number', () => expect(a.div(2)).toEqual(cons(0.5, 1)))
  })
})

describe('Size와 Pos 사이', () => {
  const a = size(1, 1)
  const b = pos(1, 1)
  test('Size + Pos', () => {
    expect(a.add(b)).toEqual(vec2(2, 2))
  })
  test('Size == Pos', () => {
    expect(a).toEqual(b)
    expect(a.eq(b)).toBe(true)
  })

  // @ts-expect-error
  test('Size.x는 없음', () => expect(a.x).toBeUndefined())
  // @ts-expect-error
  test('Pos.w는 없음', () => expect(b.w).toBeUndefined())
})

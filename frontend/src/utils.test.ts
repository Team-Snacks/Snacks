import { cartesianProduct } from 'utils'
import { describe, expect, test } from 'vitest'

describe('cartesianProduct', () => {
  test('[(i, j) | i <- [0 .. 1], j <- [0 .. 1]]', () => {
    // prettier-ignore
    expect(cartesianProduct([0, 1], [0, 1])).toEqual([
      [0, 0], [0, 1],
      [1, 0], [1, 1],
    ])
  })

  test('[(i, j) | i <- [0 .. 1], j <- [0 .. 2]]', () => {
    // prettier-ignore
    expect(cartesianProduct([0, 1], [0, 1, 2])).toEqual([
      [0, 0], [0, 1], [0, 2],
      [1, 0], [1, 1], [1, 2],
    ])
  })

  test('[(i, j) | i <- [0 .. 2], j <- [0 .. 2]]', () => {
    // prettier-ignore
    expect(cartesianProduct([0, 1, 2], [0, 1, 2])).toEqual([
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
      ])
  })
})

import { cartesianProduct, range, replicate } from 'utils'
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

describe('range', () => {
  test.each([
    { end: 5, expected: [0, 1, 2, 3, 4] },
    { end: 0, expected: [] },
    { end: -3, expected: [] },
  ])('range($end) -> [$expected]', ({ end, expected }) =>
    expect(range(end)).toEqual(expected)
  )

  test.each([
    { start: 0, end: 5, expected: [0, 1, 2, 3, 4] },
    { start: 1, end: 5, expected: [1, 2, 3, 4] },
    { start: 5, end: -5, expected: [] },
    { start: -2, end: 2, expected: [-2, -1, 0, 1] },
  ])('range($start, $end) -> [$expected]', ({ start, end, expected }) =>
    expect(range(start, end)).toEqual(expected)
  )

  test.each([
    { start: 0, end: 5, step: 2, expected: [0, 2, 4] },
    { start: 1, end: 5, step: 2, expected: [1, 3] },
    { start: 5, end: -5, step: 2, expected: [] },
    { start: -2, end: 2, step: 2, expected: [-2, 0] },
  ])(
    'range($start, $end, $step) -> [$expected]',
    ({ start, end, step, expected }) =>
      expect(range(start, end, step)).toEqual(expected)
  )
})

describe('replicate', () => {
  test.each([{ fn: () => 3, expected: [3, 3, 3] }])(
    'replicate(3, $fn) -> [$expected]',
    ({ fn, expected }) => expect(replicate(3, fn)).toEqual(expected)
  )

  test.each([{ fn: () => 'string', expected: ['string', 'string', 'string'] }])(
    'replicate(3, $fn) -> [$expected]',
    ({ fn, expected }) => expect(replicate(3, fn)).toEqual(expected)
  )

  test.each(
    // prettier-ignore
    [{ fn: () => [1, 2, 3], expected: [[1, 2, 3], [1, 2, 3], [1, 2, 3]] }]
  )('replicate(3, $fn) -> [$expected]', ({ fn, expected }) => {
    const gen = replicate(3, fn)
    expect(gen).toEqual(expected)

    const [first, second, third] = gen
    expect(first).toSatisfy(x => x !== second && x !== third)
    expect(second).toSatisfy(x => x !== first && x !== third)
    expect(third).toSatisfy(x => x !== first && x !== second)
  })
})

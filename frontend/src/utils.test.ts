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
  type Range = {
    start: number
    end: number
    step: number
    expected: number[]
  }

  test.each`
    end   | expected
    ${5}  | ${[0, 1, 2, 3, 4]}
    ${0}  | ${[]}
    ${-3} | ${[]}
  `(
    'range($end) -> $expected',
    ({ end, expected }: Omit<Range, 'start' | 'step'>) =>
      expect(range(end)).toEqual(expected)
  )

  test.each`
    start | end   | expected
    ${0}  | ${5}  | ${[0, 1, 2, 3, 4]}
    ${1}  | ${5}  | ${[1, 2, 3, 4]}
    ${5}  | ${-5} | ${[]}
    ${-2} | ${2}  | ${[-2, -1, 0, 1]}
  `(
    'range($start, $end) -> [$expected]',
    ({ start, end, expected }: Omit<Range, 'step'>) =>
      expect(range(start, end)).toEqual(expected)
  )

  test.each`
    start | end   | step | expected
    ${0}  | ${5}  | ${2} | ${[0, 2, 4]}
    ${1}  | ${5}  | ${2} | ${[1, 3]}
    ${5}  | ${-5} | ${2} | ${[]}
    ${-2} | ${2}  | ${2} | ${[-2, 0]}
  `(
    'range($start, $end, $step) -> [$expected]',
    ({ start, end, step, expected }: Range) =>
      expect(range(start, end, step)).toEqual(expected)
  )
})

describe('replicate', () => {
  type Replicate<T> = {
    fn: () => T
    expected: [T, T, T]
  }
  test.each`
    fn                | expected
    ${() => 3}        | ${[3, 3, 3]}
    ${() => 'string'} | ${['string', 'string', 'string']}
  `('replicate(3, $fn) -> [$expected]', <T>({ fn, expected }: Replicate<T>) =>
    expect(replicate(3, fn)).toEqual(expected)
  )

  test.each`
    fn                 | expected
    ${() => [1, 2, 3]} | ${[[1, 2, 3], [1, 2, 3], [1, 2, 3]]}
  `('replicate(3, $fn) -> [$expected]', <T>({ fn, expected }: Replicate<T>) => {
    const gen = replicate(3, fn)
    expect(gen).toEqual(expected)

    const [first, second, third] = gen
    expect(first).toSatisfy(x => x !== second && x !== third)
    expect(second).toSatisfy(x => x !== first && x !== third)
    expect(third).toSatisfy(x => x !== first && x !== second)
  })
})

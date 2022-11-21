/**
 * 곱집합 구하기
 *
 * @example
 * [0, 0] 부터 [1, 1] 까지의 곱집합
 * ```ts
 * cartesianProduct([0, 1], [0, 1]) // [[0, 0], [0, 1], [1, 0], [1, 1]]
 * ```
 * 원본: {@link https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef?permalink_comment_id=3530882#gistcomment-3530882}
 */
export const cartesianProduct = <T>(...xs: T[][]) =>
  xs.reduce<T[][]>(
    (acc, x) => acc.flatMap(set => x.map(value => [...set, value])),
    [[]]
  )

/**
 * 파이썬에서 보던 range 함수
 *
 * @param start 시작값
 * @param end 끝값 (생략시 0부터 시작)
 * @param step 증가값 (기본값: 1)
 *
 * @example
 * ```ts
 * range(5) // [0, 1, 2, 3, 4]
 * range(0, 5) // [0, 1, 2, 3, 4]
 * range(1, 5) // [1, 2, 3, 4]
 * range(0, 5, 2) // [0, 2, 4]
 * ```
 */
export const range = (
  ...args: [number] | [number, number] | [number, number, number]
): number[] => {
  switch (args.length) {
    case 1: {
      const [end] = args
      return end > 0 ? [...Array(end).keys()] : []
    }
    case 2: {
      const [start, end] = args
      const len = end - start
      return len > 0 ? [...Array(len).keys()].map(i => i + start) : []
    }
    case 3: {
      const [start, end, step] = args
      const res = []
      for (let i = start; i < end; i += step) {
        res.push(i)
      }
      return res
    }
  }
}

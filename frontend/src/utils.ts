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
    (acc, x) =>
      acc.flatMap(set => x.map(value => [...set, value])),
    [[]]
  )

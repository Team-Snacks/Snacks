import { test, expect } from 'vitest'
import { movableToEmpty as isMovableToEmpty, moveItemSwap } from './GridTools'
import {
  coordinateRangeWidgets,
  makeGridCoordinates,
  makeWidgetCoordinates,
} from './GridTools'
import { mock } from 'dummy'
import { pos } from 'vec2'

test.each(
  // prettier-ignore
  [{ widget: mock[0], res: [pos(0, 0)] },
  { widget: mock[1], res: [pos(1, 0), pos(2, 0)] },
  { widget: mock[2], res: [pos(0, 1), pos(0, 2)] },
  { widget: mock[3], res: [pos(3, 1), pos(3, 2), pos(4, 1),pos(4, 2)] }]
)('makeWidgetCoordinates($widget) -> [$res]', ({ widget, res }) =>
  expect(makeWidgetCoordinates(widget)).toEqual(res)
)

test.each(
  // prettier-ignore
  [{ start: pos(0, 0 ), end: pos(1, 1), res: [mock[0]] },
  { start: pos(0, 0), end: pos(2, 2), res: [mock[0], mock[1], mock[2], mock[4]] },
  { start: pos(2, 2), end: pos(3,3), res: []}]
)('coordinateRangeWidgets($start, $end) -> [$res]', ({ start, end, res }) =>
  expect(coordinateRangeWidgets(mock, start, end)).toEqual(res)
)

test('makeGridCoordinates', () => {
  expect(makeGridCoordinates(mock)).toEqual([
    [{ uuid: 'weather01' }, { uuid: 'weather03' }, { uuid: 'weather03' }],
    [{ uuid: 'memo02' }, { uuid: 'todo05' }, { uuid: 'empty' }],
    [{ uuid: 'memo02' }, { uuid: 'empty' }, { uuid: 'empty' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
  ])
})

test.each([
  { pos: pos(1, 1), res: mock[4] },
  { pos: pos(1, 0), res: null },
  { pos: pos(0, 1), res: null },
  { pos: pos(2, 2), res: null },
])('moveItemSwap(mock[0], $pos, mock) -> [$res]', ({ pos, res }) =>
  expect(moveItemSwap(mock[0], pos, mock)).toEqual(res)
)

test.each([
  { item: mock[0], pos: pos(1, 1), res: false },
  { item: mock[0], pos: pos(1, 0), res: false },
  { item: mock[0], pos: pos(0, 1), res: false },
  { item: mock[0], pos: pos(2, 2), res: true },
  { item: mock[1], pos: pos(1, 0), res: true },
  { item: mock[2], pos: pos(2, 0), res: true },
  { item: mock[3], pos: pos(0, -1), res: true },
  { item: mock[4], pos: pos(1, 0), res: true },
])('isMovableToEmpty($item, $pos,, mock) -> [$res]', ({ item, pos, res }) =>
  expect(isMovableToEmpty(item, pos, mock)).toEqual(res)
)

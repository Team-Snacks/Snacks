import { test, expect } from 'vitest'
import { movableToEmpty as isMovableToEmpty, moveItemSwap } from './GridTools'
import {
  coordinateRangeWidgets,
  makeGridCoordinates,
  makeWidgetCoordinates,
} from './GridTools'
import { mock } from 'dummy'

test.each(
  // prettier-ignore
  [{ widget: mock[0], res: [{ x: 0, y: 0 }] },
  { widget: mock[1], res: [{ x: 1, y: 0 }, { x: 2, y: 0 }] },
  { widget: mock[2], res: [{ x: 0, y: 1 }, { x: 0, y: 2 }] },
  { widget: mock[3], res: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 2 }] }]
)('makeWidgetCoordinates($widget) -> [$res]', ({ widget, res }) =>
  expect(makeWidgetCoordinates(widget)).toEqual(res)
)

test.each(
  // prettier-ignore
  [{ start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, res: [mock[0]] },
  { start: { x: 0, y: 0 }, end: { x: 2, y: 2 }, res: [mock[0], mock[1], mock[2], mock[4]] },
  { start: { x: 2, y: 2 }, end: { x: 3, y: 3 }, res: []}]
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
  { pos: { x: 1, y: 1 }, res: mock[4] },
  { pos: { x: 1, y: 0 }, res: null },
  { pos: { x: 0, y: 1 }, res: null },
  { pos: { x: 2, y: 2 }, res: null },
])('moveItemSwap(mock[0], $pos, mock) -> [$res]', ({ pos, res }) =>
  expect(moveItemSwap(mock[0], pos, mock)).toEqual(res)
)

test.each([
  { item: mock[0], pos: { x: 1, y: 1 }, res: false },
  { item: mock[0], pos: { x: 1, y: 0 }, res: false },
  { item: mock[0], pos: { x: 0, y: 1 }, res: false },
  { item: mock[0], pos: { x: 2, y: 2 }, res: true },
  { item: mock[1], pos: { x: 1, y: 0 }, res: true },
  { item: mock[2], pos: { x: 2, y: 0 }, res: true },
  { item: mock[3], pos: { x: 0, y: -1 }, res: true },
  { item: mock[4], pos: { x: 1, y: 0 }, res: true },
])('isMovableToEmpty($item, $pos, mock) -> [$res]', ({ item, pos, res }) =>
  expect(isMovableToEmpty(item, pos, mock)).toEqual(res)
)

import { test, expect } from 'vitest'
import { isMovable, moveItemSwap } from './GridTools'
import {
  coordinateRangeWidgets,
  makeGridCoordinates,
  makeWidgetCoordinates,
} from './GridTools'
import { mock } from 'dummy'

test('makeWidgetCoordinates', () => {
  expect(makeWidgetCoordinates(mock[0])).toEqual([{ x: 0, y: 0 }])
  expect(makeWidgetCoordinates(mock[1])).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ])
  expect(makeWidgetCoordinates(mock[2])).toEqual([
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ])
  expect(makeWidgetCoordinates(mock[3])).toEqual([
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
  ])
})

test('coordinateRangeWidgets', () => {
  expect(coordinateRangeWidgets(mock, { x: 0, y: 0 }, { x: 1, y: 1 })).toEqual([
    mock[0],
  ])
  expect(coordinateRangeWidgets(mock, { x: 0, y: 0 }, { x: 2, y: 2 })).toEqual([
    mock[0],
    mock[1],
    mock[2],
    mock[4],
  ])
  expect(coordinateRangeWidgets(mock, { x: 2, y: 2 }, { x: 3, y: 3 })).toEqual(
    []
  )
})

test('makeGridCoordinates', () => {
  expect(makeGridCoordinates(mock)).toEqual([
    [{ uuid: 'weather01' }, { uuid: 'weather03' }, { uuid: 'weather03' }],
    [{ uuid: 'memo02' }, { uuid: 'todo05' }, { uuid: 'empty' }],
    [{ uuid: 'memo02' }, { uuid: 'empty' }, { uuid: 'empty' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
  ])
})

test('moveItemSwap', () => {
  expect(moveItemSwap(mock[0], { x: 1, y: 1 }, mock)).toEqual(mock[4])
  expect(moveItemSwap(mock[0], { x: 1, y: 0 }, mock)).toEqual(false)
  expect(moveItemSwap(mock[0], { x: 0, y: 1 }, mock)).toEqual(false)
  expect(moveItemSwap(mock[0], { x: 2, y: 2 }, mock)).toEqual(false)
})

test('moveItemEmpty', () => {
  expect(isMovable(mock[0], { x: 1, y: 1 }, mock)).toEqual(false)
  expect(isMovable(mock[0], { x: 1, y: 0 }, mock)).toEqual(false)
  expect(isMovable(mock[0], { x: 0, y: 1 }, mock)).toEqual(false)
  expect(isMovable(mock[0], { x: 2, y: 2 }, mock)).toEqual(true)
  expect(isMovable(mock[1], { x: 1, y: 0 }, mock)).toEqual(true)
  expect(isMovable(mock[2], { x: 2, y: 0 }, mock)).toEqual(true)
  expect(isMovable(mock[3], { x: 0, y: -1 }, mock)).toEqual(true)
  expect(isMovable(mock[4], { x: 1, y: 0 }, mock)).toEqual(true)
})

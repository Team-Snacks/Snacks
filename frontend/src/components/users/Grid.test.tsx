import { test, expect } from 'vitest'
import { moveItemEmpty, moveItemSwap } from './GridTools'
import {
  coordinateRangeWidgets,
  makeGridCoordinates,
  makeWidgetCoordinates,
} from './GridTools'

// 이런 모양입니다
// [1][2][2][ ][ ]
// [3][5][ ][4][4]
// [3][ ][ ][4][4]
const gridRandomSizes = [
  {
    uuid: 'weather01',
    name: 'weather',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'memo02',
    name: 'memo',
    x: 1,
    y: 0,
    w: 2,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'weather03',
    name: 'weather',
    x: 0,
    y: 1,
    w: 1,
    h: 2,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'ascii04',
    name: 'ascii',
    x: 3,
    y: 1,
    w: 2,
    h: 2,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'todo05',
    name: 'todo',
    x: 1,
    y: 1,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
]

test('makeWidgetCoordinates 테스트', () => {
  expect(makeWidgetCoordinates(gridRandomSizes[0])).toEqual([{ x: 0, y: 0 }])
  expect(makeWidgetCoordinates(gridRandomSizes[1])).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ])
  expect(makeWidgetCoordinates(gridRandomSizes[2])).toEqual([
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ])
  expect(makeWidgetCoordinates(gridRandomSizes[3])).toEqual([
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ])
})

test('coordinateRangeWidgets 테스트', () => {
  expect(
    coordinateRangeWidgets(gridRandomSizes, { x: 0, y: 0 }, { x: 1, y: 1 })
  ).toEqual([gridRandomSizes[0]])
  expect(
    coordinateRangeWidgets(gridRandomSizes, { x: 0, y: 0 }, { x: 2, y: 2 })
  ).toEqual([
    gridRandomSizes[0],
    gridRandomSizes[1],
    gridRandomSizes[2],
    gridRandomSizes[4],
  ])
  expect(
    coordinateRangeWidgets(gridRandomSizes, { x: 2, y: 2 }, { x: 3, y: 3 })
  ).toEqual([])
})

test('makeGridCoordinates 테스트', () => {
  expect(makeGridCoordinates(gridRandomSizes)).toEqual([
    [{ uuid: 'weather01' }, { uuid: 'weather03' }, { uuid: 'weather03' }],
    [{ uuid: 'memo02' }, { uuid: 'todo05' }, { uuid: 'empty' }],
    [{ uuid: 'memo02' }, { uuid: 'empty' }, { uuid: 'empty' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
  ])
})

test('moveItemSwap 테스트', () => {
  expect(
    moveItemSwap(gridRandomSizes[0], { x: 1, y: 1 }, gridRandomSizes)
  ).toEqual(gridRandomSizes[4])
  expect(
    moveItemSwap(gridRandomSizes[0], { x: 1, y: 0 }, gridRandomSizes)
  ).toEqual(false)
  expect(
    moveItemSwap(gridRandomSizes[0], { x: 0, y: 1 }, gridRandomSizes)
  ).toEqual(false)
  expect(
    moveItemSwap(gridRandomSizes[0], { x: 2, y: 2 }, gridRandomSizes)
  ).toEqual(false)
})

test('moveItemEmpty 테스트', () => {
  expect(
    moveItemEmpty(gridRandomSizes[0], { x: 1, y: 1 }, gridRandomSizes)
  ).toEqual(false)
  expect(
    moveItemEmpty(gridRandomSizes[0], { x: 1, y: 0 }, gridRandomSizes)
  ).toEqual(false)
  expect(
    moveItemEmpty(gridRandomSizes[0], { x: 0, y: 1 }, gridRandomSizes)
  ).toEqual(false)
  expect(
    moveItemEmpty(gridRandomSizes[0], { x: 2, y: 2 }, gridRandomSizes)
  ).toEqual(true)
  expect(
    moveItemEmpty(gridRandomSizes[1], { x: 1, y: 0 }, gridRandomSizes)
  ).toEqual(true)
  expect(
    moveItemEmpty(gridRandomSizes[2], { x: 2, y: 0 }, gridRandomSizes)
  ).toEqual(true)
  expect(
    moveItemEmpty(gridRandomSizes[3], { x: 0, y: -1 }, gridRandomSizes)
  ).toEqual(true)
  expect(
    moveItemEmpty(gridRandomSizes[4], { x: 1, y: 0 }, gridRandomSizes)
  ).toEqual(true)
})

import { test, expect } from 'vitest'
import {
  coordinateRangeWidgets,
  makeGridCoordinates,
  makeWidgetCoordinates,
} from './GridTools'

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
  expect(makeWidgetCoordinates(gridRandomSizes, 0)).toEqual([{ x: 0, y: 0 }])
  expect(makeWidgetCoordinates(gridRandomSizes, 1)).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ])
  expect(makeWidgetCoordinates(gridRandomSizes, 2)).toEqual([
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ])
  expect(makeWidgetCoordinates(gridRandomSizes, 3)).toEqual([
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ])
})

test('coordinateRangeWidgets 테스트', () => {
  expect(
    coordinateRangeWidgets(gridRandomSizes, { x: 0, y: 0 }, { x: 1, y: 1 })
  ).toEqual([
    {
      uuid: 'weather01',
      name: 'weather',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      data: JSON.parse('{"aa" : "bb"}'),
    },
  ])
  expect(
    coordinateRangeWidgets(gridRandomSizes, { x: 0, y: 0 }, { x: 2, y: 2 })
  ).toEqual([
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
      uuid: 'todo05',
      name: 'todo',
      x: 1,
      y: 1,
      w: 1,
      h: 1,
      data: JSON.parse('{"aa" : "bb"}'),
    },
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

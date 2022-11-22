import { Widgets } from 'common'

export const layoutDummy: Widgets = [
  {
    uuid: 'weather01',
    name: 'weather',
    x: 2,
    y: 1,
    w: 2,
    h: 2,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'memo02',
    name: 'memo',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'weather03',
    name: 'weather',
    x: 3,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'ascii04',
    name: 'ascii',
    x: 4,
    y: 1,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'todo05',
    name: 'todo',
    x: 4,
    y: 2,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'memo06',
    name: 'memo',
    x: 0,
    y: 2,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'timer07',
    name: 'timer',
    x: 1,
    y: 2,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
]

export const widgetDummy = {
  uuid: 'weather01',
  name: 'weather',
  x: 0,
  y: 0,
  w: 1,
  h: 1,
  data: JSON.parse('{"aa" : "bb"}'),
}


// 이런 모양입니다
// [1][2][2][ ][ ]
// [3][5][ ][4][4]
// [3][ ][ ][4][4]
export const mock: Widgets = [
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

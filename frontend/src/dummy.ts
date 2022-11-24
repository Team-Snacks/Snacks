import { Widgets } from 'common'
import { pos, size } from 'vec2'

export const layoutDummy: Widgets = [
  {
    uuid: 'weather01',
    name: 'weather',
    pos: pos(2, 1),
    size: size(2, 2),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'memo02',
    name: 'memo',
    pos: pos(2, 0),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'weather03',
    name: 'weather',
    pos: pos(3, 0),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'ascii04',
    name: 'ascii',
    pos: pos(4, 1),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'todo05',
    name: 'todo',
    pos: pos(4, 2),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'memo06',
    name: 'memo',
    pos: pos(0, 2),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'timer07',
    name: 'timer',
    pos: pos(1, 2),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
]

export const widgetDummy = {
  uuid: 'weather01',
  name: 'weather',
  pos: pos(0, 0),
  size: size(1, 1),
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
    pos: pos(0, 0),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'memo02',
    name: 'memo',
    pos: pos(1, 0),
    size: size(2, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'weather03',
    name: 'weather',
    pos: pos(0, 1),
    size: size(1, 2),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'ascii04',
    name: 'ascii',
    pos: pos(3, 1),
    size: size(2, 2),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: 'todo05',
    name: 'todo',
    pos: pos(1, 1),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
]

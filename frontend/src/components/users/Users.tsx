import { layoutType } from 'common'
import { Grid } from './Grid'
import { Navigation } from './Navigation'
import { Store } from './Store'

const dummy: layoutType = [
  {
    uuid: '1',
    name: 'weather',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '2',
    name: 'memo',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '3',
    name: 'weather',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '4',
    name: 'ascii',
    x: 3,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '5',
    name: 'todo',
    x: 4,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '6',
    name: 'memo',
    x: 0,
    y: 1,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '7',
    name: 'timer',
    x: 1,
    y: 1,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
]

export const Users = () => {
  return (
    <div>
      <Navigation />
      <Store />
      <Grid gridItems={dummy} />
    </div>
  )
}

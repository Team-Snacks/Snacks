import { Button, Navbar } from '@mantine/core'
import { layoutType } from 'common'
import { Grid } from './Grid'
import { Navigation as tmp } from './Navigation'
import type { Story } from '@ladle/react'
import React from 'react'

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
const tmpStyle: React.CSSProperties = {
  background: '#ffffaa',
  width: '250px',
  height: 'auto',
  position: 'absolute',
  top: '80px',
  zIndex: '1',
}

export const Navigation = tmp

export const grid: Story<{ widgets: layoutType }> = ({ widgets }) => (
  <Grid gridItems={widgets} />
)
grid.args = { widgets: dummy }

export const store: Story<{
  storeVisible: boolean
  style: React.CSSProperties
}> = ({ storeVisible, style }) => (
  <div>
    {storeVisible === true ? (
      <Navbar style={style}>
        <Button>{'<<'}</Button>
        <div>위젯</div>
        <div>위젯</div>
      </Navbar>
    ) : (
      <></>
    )}
  </div>
)
store.args = { storeVisible: true, style: tmpStyle }

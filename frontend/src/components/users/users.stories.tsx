import { Button, Navbar } from '@mantine/core'
import { Widgets } from 'common'
import { Grid } from './Grid'
import { Navigation as tmp } from './Navigation'
import type { Story } from '@ladle/react'
import React from 'react'
import { layoutDummy } from 'dummy'

const tmpStyle: React.CSSProperties = {
  background: '#ffffaa',
  width: '250px',
  height: 'auto',
  position: 'absolute',
  top: '80px',
  zIndex: '1',
}

export const Navigation = tmp

export const grid: Story<{ widgets: Widgets }> = ({ widgets }) => (
  <Grid widgets={widgets} />
)
grid.args = { widgets: layoutDummy }

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

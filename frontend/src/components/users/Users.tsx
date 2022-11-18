import { layoutDummy } from 'Dummy'
import { Grid } from './Grid'
import { Navigation } from './Navigation'
import { Store } from './Store'

export const Users = () => {
  return (
    <div>
      <Navigation />
      <Store />
      <Grid widgets={layoutDummy} />
    </div>
  )
}

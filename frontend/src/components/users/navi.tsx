import { Button } from '@mantine/core'
import { Logo } from 'components/common'

export const Navi = () => {
  return (
    <nav style={{ background: '#aaffff' }}>
      <Logo />
      <Button>스토어</Button>
      <Button>유저</Button>
    </nav>
  )
}

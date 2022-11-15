import { Button } from '@mantine/core'
import { Logo } from 'components/common'
import { storeVisibleAtom } from 'Atoms'
import { useSetAtom } from 'jotai'

export const Navigation = () => {
  const setStoreVisible = useSetAtom(storeVisibleAtom)
  const tmpStyle: React.CSSProperties = { background: '#aaffff' }

  return (
    <nav style={tmpStyle}>
      <Logo />
      <Button onClick={() => setStoreVisible(true)}>스토어</Button>
      <Button>유저</Button>
    </nav>
  )
}

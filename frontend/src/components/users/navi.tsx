import { Button } from '@mantine/core'
import { Logo } from 'components/common/Index'
import { storeAtom } from 'Atoms'
import { useSetAtom } from 'jotai'

export const Navi = () => {
  const setStoreVisible = useSetAtom(storeAtom)
  const tmpStyle: React.CSSProperties = { background: '#aaffff' }

  return (
    <nav style={tmpStyle}>
      <Logo />
      <Button onClick={() => setStoreVisible(true)}>스토어</Button>
      <Button>유저</Button>
    </nav>
  )
}

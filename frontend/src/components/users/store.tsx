import { Button, Navbar } from '@mantine/core'
import { storeAtom } from 'atoms'
import { useAtom } from 'jotai'

export const Store = () => {
  const [storeVisible, setStoreVisible] = useAtom(storeAtom)
  const tmpStyle: React.CSSProperties = {
    background: '#ffffaa',
    width: '250px',
    height: 'auto',
    position: 'absolute',
    top: '80px',
    zIndex: '1',
  }
  return (
    <div>
      {storeVisible === true ? (
        <Navbar style={tmpStyle}>
          <Button onClick={() => setStoreVisible(false)}>{'<<'}</Button>
          <div>위젯</div>
          <div>위젯</div>
        </Navbar>
      ) : (
        <></>
      )}
    </div>
  )
}

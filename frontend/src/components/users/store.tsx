import { Button, Navbar } from '@mantine/core'

export const Store = () => {
  return (
    <Navbar
      style={{
        background: '#ffffaa',
        width: '300px',
      }}
    >
      <Button>{'<<'}</Button>
      <div>위젯</div>
      <div>위젯</div>
    </Navbar>
  )
}

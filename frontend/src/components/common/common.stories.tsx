import type { Story } from '@ladle/react'
import { Hello } from './hello'
import { Logo } from './logo'

export const HelloStory: Story<{ name: string }> = ({ name }) => (
  <Hello name={name} />
)
HelloStory.args = {
  name: 'Wor!!!d',
}

export const LogoStory = () => <Logo />

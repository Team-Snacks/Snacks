import type { Story } from '@ladle/react'
import { Hello } from './Hello'
import { Logo } from './Logo'

export const HelloStory: Story<{ name: string }> = ({ name }) => (
  <Hello name={name} />
)
HelloStory.args = {
  name: 'Wor!!!d',
}

export const LogoStory = () => <Logo />

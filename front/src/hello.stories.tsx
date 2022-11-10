import type { Story } from '@ladle/react'
import { Hello } from './hello'

export const HelloStory: Story<{ name: string }> = ({ name }) => (
  <Hello name={name} />
)
HelloStory.args = {
  name: 'Wor!!!d',
}

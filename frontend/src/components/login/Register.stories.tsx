import { Button, Paper, Stack, Text } from '@mantine/core'
import { Logo } from '../common'
import { CredentialInput } from './CredentialInput.stories'
import { GoogleIcon } from 'assets/GoogleIcon'

export const Register = () => {
  return (
    <>
      <CredentialInput />
      <Button variant='default'>회원가입</Button>
    </>
  )
}

export const OAuthRegister = () => (
  <>
    <Text>또는</Text>
    <Button variant='default' leftIcon={<GoogleIcon />}>
      구글 이메일로 회원가입
    </Button>
  </>
)

export const RegisterPanel = () => {
  return (
    <Paper>
      <Stack align='center'>
        <Logo />
        <OAuthRegister />
      </Stack>
    </Paper>
  )
}

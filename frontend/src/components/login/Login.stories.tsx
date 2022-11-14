import { Button, Paper, Stack, Text } from '@mantine/core'
import { Logo } from '../common'
import { CredentialInput } from './CredentialInput.stories'
import { GoogleIcon } from 'assets/GoogleIcon'

export const Login = () => (
  <>
    <CredentialInput />
    <Button variant='default'>로그인</Button>
  </>
)

export const TryRegister = () => (
  <>
    <Text>아직 계정이 없으신가요?</Text>
    <Button variant='default'>회원가입</Button>
  </>
)

export const OAuthLogin = () => (
  <>
    <Text>또는</Text>
    <Button variant='default' leftIcon={<GoogleIcon />}>
      구글 이메일로 로그인
    </Button>
  </>
)

export const LoginPanel = () => {
  return (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Login />
        <TryRegister />
        <OAuthLogin />
      </Stack>
    </Paper>
  )
}

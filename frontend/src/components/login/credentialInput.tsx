import { TextInput } from '@mantine/core'
import { Credential } from 'common'
import { atom, useAtom } from 'jotai'

export const credentialAtom = atom<Credential>({ id: '', password: '' })

/**
 * 전역 credentialAtom 입력창
 */
export const CredentialInput = () => {
  const [cred, setCred] = useAtom(credentialAtom)
  return (
    <>
      <TextInput
        withAsterisk
        placeholder='아이디 혹은 이메일'
        value={cred.id}
        onChange={event => setCred({ ...cred, id: event.currentTarget.value })}
      />
      <TextInput
        withAsterisk
        placeholder='비밀번호'
        value={cred.password}
        onChange={event =>
          setCred({ ...cred, password: event.currentTarget.value })
        }
      />
    </>
  )
}

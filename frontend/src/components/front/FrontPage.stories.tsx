import { Button, Image, ScrollArea, Stack, Text, Title } from '@mantine/core'
import snacksHands from 'assets/snacks-hands.png'
import example from 'assets/example.png'

const Description1 = () => (
  <>
    <Image src={snacksHands} />
    <Title>브라우저를 위한 위젯 보드</Title>
    <Text>
      Snacks를 사용해 브라우저를 꾸며보세요. Snacks는 브라우저가 복잡할 때, 자주
      찾는 서비스를 쉽게 이용하고 싶을 때 빛을 발합니다.
    </Text>
  </>
)

const Description2 = () => (
  <>
    <Image src={example} />
    <Title>다양한 위젯과 간단한 배치</Title>
    <Text>
      원하는 위젯을 마켓에서 쉽게 추가 및 삭제할 수 있습니다. 클릭 몇 번으로
      여러분만의 대시보드를 꾸며보세요.
    </Text>
  </>
)

const UseNow = () => (
  <>
    <Title order={3}>Snacks 이용하기</Title>
    <Button>가입하기</Button>
  </>
)

export const FrontPage = () => (
  <ScrollArea type='never'>
    <Stack align='center' spacing={100}>
      <Description1 />
      <Description2 />
      <UseNow />
    </Stack>
  </ScrollArea>
)

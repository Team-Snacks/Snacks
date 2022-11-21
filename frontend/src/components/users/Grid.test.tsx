import { test, expect } from 'vitest'

const addSelf = (a: number) => {
  return a + a
}

test('테스트', () => {
  expect(addSelf(3)).to.equal(6)
  expect(addSelf(4)).to.equal(8)
})

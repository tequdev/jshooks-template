import { buf2hex, buf2str, hex2buf, hex2str, str2hex } from '@/utils'

it('hex2str', () => {
  expect(hex2str('414243')).toEqual('ABC')
})
it('str2hex', () => {
  expect(str2hex('ABC')).toEqual('414243')
})
it('buf2str', () => {
  expect(buf2str([0x41, 0x42, 0x43])).toEqual('ABC')
})
it('buf2hex', () => {
  expect(buf2hex([0x41, 0x42, 0x43])).toEqual('414243')
})
it('hex2buf', () => {
  expect(hex2buf('414243')).toEqual([0x41, 0x42, 0x43])
})

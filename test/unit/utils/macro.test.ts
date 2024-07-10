import {
  uint8ArrayFromNumber,
  uint8ArrayToNumber,
  uint8FromHex,
  uint8Tohex,
  uint16FromHex,
  uint16Tohex,
  uint32FromHex,
  uint32Tohex,
  uint64BigFromHex,
  uint64FromHex,
  uint64Tohex,
} from '@/utils'

describe('uint8', () => {
  it('uint8ArrayFromNumber', () => {
    expect(uint8ArrayFromNumber(0x10)).toEqual([0x10])
    expect(uint8ArrayFromNumber(0xff)).toEqual([0xff])
  })
  it('uint8ArrayToNumber', () => {
    expect(uint8ArrayToNumber([0x10])).toEqual(0x10)
    expect(uint8ArrayToNumber([0xff])).toEqual(0xff)
  })
  it('uint8Tohex', () => {
    expect(uint8Tohex(0x00)).toEqual('00')
    expect(uint8Tohex(0xff)).toEqual('FF')
  })
  it('uint8FromHex', () => {
    expect(uint8FromHex('10')).toEqual(0x10)
    expect(uint8FromHex('FF')).toEqual(0xff)
  })
})

describe('uint16', () => {
  // it('uint16ArrayFromNumber', () => {
  //   expect(uint16ArrayFromNumber(0xFF)).toEqual([0xFF])
  //   expect(uint16ArrayFromNumber(0xFFFF)).toEqual([0xFFFF])
  // })
  // it('uint16ArrayToNumber', () => {
  //   expect(uint16ArrayToNumber([0xFF])).toEqual(0xFF)
  //   expect(uint16ArrayToNumber([0xFFFF])).toEqual(0xFFFF)
  // })
  it('uint16Tohex', () => {
    expect(uint16Tohex(0x10)).toEqual('0010')
    expect(uint16Tohex(0xff)).toEqual('00FF')
    expect(uint16Tohex(0xffff)).toEqual('FFFF')
  })
  it('uint16FromHex', () => {
    expect(uint16FromHex('0010')).toEqual(0x10)
    expect(uint16FromHex('00FF')).toEqual(0xff)
    expect(uint16FromHex('FFFF')).toEqual(0xffff)
  })
})

describe('uint32', () => {
  // it('uint32ArrayFromNumber', () => {
  //   expect(uint32ArrayFromNumber(0xFFFF)).toEqual([0xFFFF])
  //   expect(uint32ArrayFromNumber(0xFFFFFFFF)).toEqual([0xFFFFFFFF])
  // })
  // it('uint32ArrayToNumber', () => {
  //   expect(uint32ArrayToNumber([0xFFFF])).toEqual(0xFFFF)
  //   expect(uint32ArrayToNumber([0xFFFFFFFF])).toEqual(0xFFFFFFFF)
  // })
  it('uint32Tohex', () => {
    expect(uint32Tohex(0x10)).toEqual('00000010')
    expect(uint32Tohex(0xff)).toEqual('000000FF')
    expect(uint32Tohex(0xffff)).toEqual('0000FFFF')
    expect(uint32Tohex(0xffffffff)).toEqual('FFFFFFFF')
  })
  it('uint32FromHex', () => {
    expect(uint32FromHex('00000010')).toEqual(0x10)
    expect(uint32FromHex('000000FF')).toEqual(0xff)
    expect(uint32FromHex('0000FFFF')).toEqual(0xffff)
    expect(uint32FromHex('FFFFFFFF')).toEqual(0xffffffff)
  })
})

describe('uint64', () => {
  // it('uint64ArrayFromBigInt', () => {
  //   expect(uint64ArrayFromBigInt(64n)).toEqual([64n])
  //   expect(uint64ArrayFromBigInt(0xFFFFFFFFFFFFFFFFn)).toEqual([0xFFFFFFFFFFFFFFFFn])
  // })
  // it('uint64ArrayFromNumber', () => {
  //   expect(uint64ArrayFromNumber(64)).toEqual([64])
  //   expect(uint64ArrayFromNumber(0x0000FFFFFFFFFFFF)).toEqual([0x0000FFFFFFFFFFFF])
  // })
  // it('uint64ArrayToBigInt', () => {
  //   expect(uint64ArrayToBigInt([64n])).toEqual(64n)
  //   expect(uint64ArrayToBigInt([0xFFFFFFFFFFFFFFFFn])).toEqual(0xFFFFFFFFFFFFFFFFn)
  // })
  // it('uint64ArrayToNumber', () => {
  //   expect(uint64ArrayToNumber([64])).toEqual(64)
  //   expect(uint64ArrayToNumber([0x0000FFFFFFFFFFFF])).toEqual(0x0000FFFFFFFFFFFF)
  // })
  it('uint64Tohex', () => {
    expect(uint64Tohex(0x10n)).toEqual('0000000000000010')
    expect(uint64Tohex(0xffn)).toEqual('00000000000000FF')
    expect(uint64Tohex(0xffffn)).toEqual('000000000000FFFF')
    expect(uint64Tohex(0xffffffffn)).toEqual('00000000FFFFFFFF')
    expect(uint64Tohex(0xffffffffffffffffn)).toEqual('FFFFFFFFFFFFFFFF')
  })
  it('uint64FromHex', () => {
    expect(uint64FromHex('0000000000000010')).toEqual(0x10)
    expect(uint64FromHex('00000000000000FF')).toEqual(0xff)
    expect(uint64FromHex('000000000000FFFF')).toEqual(0xffff)
    expect(uint64FromHex('00000000FFFFFFFF')).toEqual(0xffffffff)
    expect(uint64FromHex('0000FFFFFFFFFFFF')).toEqual(0x0000ffffffffffff)
    expect(uint64FromHex('FFFFFFFFFFFFFFFF')).toEqual(0xffffffffffffffff)
  })
  it('uint64BigFromHex', () => {
    expect(uint64BigFromHex('0000000000000010')).toEqual(0x10n)
    expect(uint64BigFromHex('00000000000000FF')).toEqual(0xffn)
    expect(uint64BigFromHex('000000000000FFFF')).toEqual(0xffffn)
    expect(uint64BigFromHex('00000000FFFFFFFF')).toEqual(0xffffffffn)
    expect(uint64BigFromHex('FFFFFFFFFFFFFFFF')).toEqual(0xffffffffffffffffn)
  })
})

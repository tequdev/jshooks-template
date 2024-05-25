import { convertBuffer2hex, convertHexToBuffer, convertHexToString, convertStringToHex, uint16ArrayFromNumber, uint16ArrayToNumber, uint16FromHex, uint16Tohex, uint32ArrayFromNumber, uint32ArrayToNumber, uint32FromHex, uint32Tohex, uint64ArrayFromBigInt, uint64ArrayFromNumber, uint64ArrayToBigInt, uint64ArrayToNumber, uint64BigFromHex, uint64FromHex, uint64Tohex, uint8ArrayFromNumber, uint8ArrayToNumber, uint8FromHex, uint8Tohex } from "./macro"

it('convertHexToString', () => {
  expect(convertHexToString('414243')).toEqual('ABC')
})
it('convertStringToHex', () => {
  expect(convertStringToHex('ABC')).toEqual('414243')
})
it('convertBuffer2hex', () => {
  expect(convertBuffer2hex([0x41, 0x42, 0x43])).toEqual('414243')
})
it('convertHexToBuffer', () => {
  expect(convertHexToBuffer('414243')).toEqual([0x41, 0x42, 0x43])
})

describe('uint8', () => {
  it('uint8ArrayFromNumber', () => {
    expect(uint8ArrayFromNumber(0x10)).toEqual([0x10])
    expect(uint8ArrayFromNumber(0xFF)).toEqual([0xFF])
  })
  it('uint8ArrayToNumber', () => {
    expect(uint8ArrayToNumber([0x10])).toEqual(0x10)
    expect(uint8ArrayToNumber([0xFF])).toEqual(0xFF)
  })
  it('uint8Tohex', () => {
    expect(uint8Tohex(0x10)).toEqual('10')
    expect(uint8Tohex(0xFF)).toEqual('FF')
  })
  it('uint8FromHex', () => {
    expect(uint8FromHex('10')).toEqual(0x10)
    expect(uint8FromHex('FF')).toEqual(0xFF)
  })
})

describe('uint16', () => {
  it('uint16ArrayFromNumber', () => {
    expect(uint16ArrayFromNumber(0xFF)).toEqual([0xFF])
    expect(uint16ArrayFromNumber(0xFFFF)).toEqual([0xFFFF])
  })
  it('uint16ArrayToNumber', () => {
    expect(uint16ArrayToNumber([0xFF])).toEqual(0xFF)
    expect(uint16ArrayToNumber([0xFFFF])).toEqual(0xFFFF)
  })
  it('uint16Tohex', () => {
    expect(uint16Tohex(0x10)).toEqual('0010')
    expect(uint16Tohex(0xFF)).toEqual('00FF')
    expect(uint16Tohex(0xFFFF)).toEqual('FFFF')
  })
  it('uint16FromHex', () => {
    expect(uint16FromHex('0010')).toEqual(0x10)
    expect(uint16FromHex('00FF')).toEqual(0xFF)
    expect(uint16FromHex('FFFF')).toEqual(0xFFFF)
  })
})

describe('uint32', () => {
  it('uint32ArrayFromNumber', () => {
    expect(uint32ArrayFromNumber(0xFFFF)).toEqual([0xFFFF])
    expect(uint32ArrayFromNumber(0xFFFFFFFF)).toEqual([0xFFFFFFFF])
  })
  it('uint32ArrayToNumber', () => {
    expect(uint32ArrayToNumber([0xFFFF])).toEqual(0xFFFF)
    expect(uint32ArrayToNumber([0xFFFFFFFF])).toEqual(0xFFFFFFFF)
  })
  it('uint32Tohex', () => {
    expect(uint32Tohex(0x10)).toEqual('00000010')
    expect(uint32Tohex(0xFF)).toEqual('000000FF')
    expect(uint32Tohex(0xFFFF)).toEqual('0000FFFF')
    expect(uint32Tohex(0xFFFFFFFF)).toEqual('FFFFFFFF')
  })
  it('uint32FromHex', () => {
    expect(uint32FromHex('00000010')).toEqual(0x10)
    expect(uint32FromHex('000000FF')).toEqual(0xFF)
    expect(uint32FromHex('0000FFFF')).toEqual(0xFFFF)
    expect(uint32FromHex('FFFFFFFF')).toEqual(0xFFFFFFFF)
  })
})

describe('uint64', () => {
  it('uint64ArrayFromBigInt', () => {
    expect(uint64ArrayFromBigInt(64n)).toEqual([64n])
    expect(uint64ArrayFromBigInt(0xFFFFFFFFFFFFFFFFn)).toEqual([0xFFFFFFFFFFFFFFFFn])
  })
  it('uint64ArrayFromNumber', () => {
    expect(uint64ArrayFromNumber(64)).toEqual([64])
    expect(uint64ArrayFromNumber(0x0000FFFFFFFFFFFF)).toEqual([0x0000FFFFFFFFFFFF])
  })
  it('uint64ArrayToBigInt', () => {
    expect(uint64ArrayToBigInt([64n])).toEqual(64n)
    expect(uint64ArrayToBigInt([0xFFFFFFFFFFFFFFFFn])).toEqual(0xFFFFFFFFFFFFFFFFn)
  })
  it('uint64ArrayToNumber', () => {
    expect(uint64ArrayToNumber([64])).toEqual(64)
    expect(uint64ArrayToNumber([0x0000FFFFFFFFFFFF])).toEqual(0x0000FFFFFFFFFFFF)
  })
  it('uint64Tohex', () => {
    expect(uint64Tohex(0x10n)).toEqual('0000000000000010')
    expect(uint64Tohex(0xFFn)).toEqual('00000000000000FF')
    expect(uint64Tohex(0xFFFFn)).toEqual('000000000000FFFF')
    expect(uint64Tohex(0xFFFFFFFFn)).toEqual('00000000FFFFFFFF')
    expect(uint64Tohex(0xFFFFFFFFFFFFFFFFn)).toEqual('FFFFFFFFFFFFFFFF')
  })
  it('uint64FromHex', () => {
    expect(uint64FromHex('0000000000000010')).toEqual(0x10)
    expect(uint64FromHex('00000000000000FF')).toEqual(0xFF)
    expect(uint64FromHex('000000000000FFFF')).toEqual(0xFFFF)
    expect(uint64FromHex('00000000FFFFFFFF')).toEqual(0xFFFFFFFF)
    expect(uint64FromHex('0000FFFFFFFFFFFF')).toEqual(0x0000FFFFFFFFFFFF)
    expect(uint64FromHex('FFFFFFFFFFFFFFFF')).toEqual(0xFFFFFFFFFFFFFFFF)
  })
  it('uint64BigFromHex', () => {
    expect(uint64BigFromHex('0000000000000010')).toEqual(0x10n)
    expect(uint64BigFromHex('00000000000000FF')).toEqual(0xFFn)
    expect(uint64BigFromHex('000000000000FFFF')).toEqual(0xFFFFn)
    expect(uint64BigFromHex('00000000FFFFFFFF')).toEqual(0xFFFFFFFFn)
    expect(uint64BigFromHex('FFFFFFFFFFFFFFFF')).toEqual(0xFFFFFFFFFFFFFFFFn)
  })
})

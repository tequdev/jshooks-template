export const doneEmpty = () => {
  accept('', 0)
}
export const doneMsg = (msg: string) => {
  accept(msg, 0)
}
export const done = (msg: number) => {
  accept(msg.toString(), 0)
}
export const assert: (cond: boolean, msg?: string) => asserts cond = (cond, msg) => {
  if (!cond) rollback(`Assertion failed: ${msg || ''}`, -1)
}
export const nope = (msg: string) => {
  rollback(msg, -1)
}

const numberToHex = (value: number | bigint, byte: number) =>
  value
    .toString(16)
    .padStart(byte / 4, '0')
    .toUpperCase()

// uint8
export const uint8ArrayFromNumber = (value: number) => {
  const a = Uint8Array.from([value])
  return Array.from(a.toReversed())
}
export const uint8ArrayToNumber = (buffer: number[]) => {
  const view = new DataView(Uint8Array.from(buffer).buffer)
  return Number(view.getUint8(0))
}
export const uint8Tohex = (value: number) => {
  return numberToHex(value, 8)
}
export const uint8FromHex = (hex: string) => {
  return Number.parseInt(hex, 16)
}

// uint16
// export const uint16ArrayFromNumber = (value: number) => {
//   const a = Uint16Array.from([value])
//   return Array.from(a.toReversed())
// }
// export const uint16ArrayToNumber = (buffer: number[]) => {
//   const view = new DataView(Uint16Array.from(buffer).buffer)
//   return Number(view.getUint16(0, true))
// }
export const uint16Tohex = (value: number) => {
  return numberToHex(value, 16)
}
export const uint16FromHex = (hex: string) => {
  return Number.parseInt(hex, 16)
}

// uint32
// export const uint32ArrayFromNumber = (value: number) => {
//   const li = Uint32Array.from([value])
//   return Array.from(new Uint32Array(li.buffer).toReversed())
// }
// export const uint32ArrayToNumber = (buffer: number[]) => {
//   const view = new DataView(new Uint32Array(buffer).buffer)
//   return Number(view.getUint32(0, true))
// }
export const uint32Tohex = (value: number) => {
  return numberToHex(value, 32)
}
export const uint32FromHex = (hex: string) => {
  return Number.parseInt(hex, 16)
}

// uint64
// export const uint64ArrayFromBigInt = (value: bigint) => {
//   const li = BigUint64Array.from([value])
//   return Array.from(new BigUint64Array(li.buffer).toReversed())
// }
// export const uint64ArrayFromNumber = (value: number) => {
//   const li = BigUint64Array.from([BigInt(value)])
//   return Array.from(new BigUint64Array(li.buffer).toReversed()).map((b) => Number(b as bigint))
// }
// export const uint64ArrayToBigInt = (buffer: bigint[]) => {
//   const view = new DataView(new BigUint64Array(buffer).buffer)
//   return view.getBigUint64(0, true)
// }
// export const uint64ArrayToNumber = (buffer: number[]) => {
//   const view = new DataView(new BigUint64Array(buffer.map(b => BigInt(b))).buffer)
//   return Number(view.getBigUint64(0, true))
// }
export const uint64Tohex = (value: bigint | number) => {
  return numberToHex(value, 64)
}
export const uint64FromHex = (hex: string) => {
  return Number.parseInt(hex, 16)
}
export const uint64BigFromHex = (hex: string) => {
  return BigInt(`0x${hex}`)
}

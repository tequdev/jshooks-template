export const doneEmpty = () => {
  accept('', 0)
}
export const doneMsg = (msg: string) => {
  accept(msg, 0)
}
export const done = (msg: number) => {
  accept(msg.toString(), 0)
}
export const nope = (msg: string) => {
  rollback(msg, -1)
}

export const hex2str = (hex: string) => {
  const intArr: number[] = []
  for (let j = 0; j < hex.length; j += 2) {
    intArr.push(Number.parseInt(`0x${hex.slice(j, j + 2)}`, 16))
  }
  return buf2str(intArr)
}
export const str2hex = (str: string) => {
  return buf2hex(str2buf(str))
}
export const buf2str = (arr: number[]) => {
  return String.fromCodePoint(...arr)
}
export const str2buf = (str: string) => {
  return str.split('').map((c) => c.charCodeAt(0))
}
export const buf2hex = (arr: number[]) => {
  return arr.map((n) => n.toString(16).padStart(2, '0')).join('')
}
export const hex2buf = (hex: string) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return hex.match(/.{2}/g)!.map((c) => Number.parseInt(c, 16))
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
export const uint8FromNumber = (value: number) => {
  if (value < 0 || 0xff < value) rollback('uint8FromNumber: value out of range', -1)
  return [value]
}
export const uint8ToNumber = (value: number[]) => {
  return value[0]
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
export const uint16FromNumber = (value: number) => {
  if (value < 0 || 0xffff < value) rollback('uint16FromNumber: value out of range', -1)
  return [value & 0xff, (value >> 8) & 0xff]
}
export const uint16ToNumber = (value: number[]) => {
  const view = new DataView(new Uint8Array(value).buffer)
  return Number(view.getUint16(0))
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
export const uint32FromNumber = (value: number) => {
  if (value < 0 || 0xffffffff < value) rollback('uint32FromNumber: value out of range', -1)
  return [value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff]
}
export const uint32ToNumber = (value: number[]) => {
  const view = new DataView(new Uint8Array(value).buffer)
  return Number(view.getUint32(0))
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
export const uint64FromBigInt = (value: bigint) => {
  if (value < 0n || 0xffffffffffffffffn < value) rollback('uint64FromBigInt: value out of range', -1)
  return [
    Number(value & 0xffn),
    Number((value >> 8n) & 0xffn),
    Number((value >> 16n) & 0xffn),
    Number((value >> 24n) & 0xffn),
    Number((value >> 32n) & 0xffn),
    Number((value >> 40n) & 0xffn),
    Number((value >> 48n) & 0xffn),
    Number((value >> 56n) & 0xffn),
  ]
}
export const uint64ToBigInt = (value: number[]) => {
  const view = new DataView(new Uint8Array(value).buffer)
  return Number(view.getBigUint64(0, true))
}

type FieldType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'account' | 'hash256'

type FieldTypeToValue<T extends FieldType> = T extends 'uint8'
  ? number
  : T extends 'uint16'
    ? number
    : T extends 'uint32'
      ? number
      : T extends 'uint64'
        ? bigint
        : T extends 'account'
          ? number[]
          : T extends 'hash256'
            ? number[]
            : never

type FieldTypeToValues<T extends FieldType[]> = {
  [K in keyof T]: FieldTypeToValue<T[K]>
}

export const encodeBuffer = <const T extends FieldType[]>(values: FieldTypeToValues<T>, types: T): number[] => {
  return types.flatMap((t, i) => {
    const v = values[i]
    switch (t) {
      case 'uint8': {
        return uint8FromNumber(v as number)
      }
      case 'uint16': {
        return uint16FromNumber(v as number)
      }
      case 'uint32': {
        return uint32FromNumber(v as number)
      }
      case 'uint64': {
        return uint64FromBigInt(v as bigint)
      }
      case 'account': {
        return v as number[]
      }
      case 'hash256': {
        return v as number[]
      }
      default:
        throw new Error('Invalid type')
    }
  })
}

export const decodeBuffer = <const T extends FieldType[]>(buffer: number[], types: T): FieldTypeToValues<T> => {
  let offset = 0
  return types.map((type) => {
    if (offset >= buffer.length) rollback('decodeBuffer: buffer length is too short', 0)

    switch (type) {
      case 'uint8': {
        const value = uint8ToNumber(buffer.slice(offset, offset + 1))
        offset += 1
        return value
      }
      case 'uint16': {
        const value = uint16ToNumber(buffer.slice(offset, offset + 2))
        offset += 2
        return value
      }
      case 'uint32': {
        const value = uint32ToNumber(buffer.slice(offset, offset + 4))
        offset += 4
        return value
      }
      case 'uint64': {
        const value = uint64ToBigInt(buffer.slice(offset, offset + 8))
        offset += 8
        return value
      }
      case 'account': {
        const value = buffer.slice(offset, offset + 20)
        offset += 20
        return value
      }
      case 'hash256': {
        const value = buffer.slice(offset, offset + 32)
        offset += 32
        return value
      }
      default:
        throw new Error('Invalid type')
    }
  }) as FieldTypeToValues<T>
}
// const acc = [0x6B, 0x30, 0xE2, 0x94, 0xF3, 0x40, 0x3F, 0xF8, 0x7C, 0xEF, 0x9E, 0x72, 0x21, 0x7F, 0xF7, 0xEB, 0x4A, 0x6A, 0x43, 0xF4]
// const hash = [0x40, 0x84, 0x55, 0xDC, 0x2C, 0xDD, 0x7C, 0x27, 0x66, 0x45, 0xE3, 0xAF, 0x94, 0x44, 0x95, 0xDA, 0x88, 0xB7, 0xEB, 0x1D, 0x86, 0x9D, 0x11, 0x0E, 0x9C, 0xA8, 0x36, 0x8A, 0x35, 0x88, 0xAA, 0x48]
// const buffer = encodeBuffer([0xff, 0xffff, 0xffff, 1000n, acc, hash], ['uint8', 'uint16', 'uint32', 'uint64', 'account', 'hash256'])
// const [uint8value, uint16value, uint32value, uint64value, accountvalue, hash256value] = decodeBuffer(buffer, ['uint8', 'uint16', 'uint32', 'uint64', 'account', 'hash256'])

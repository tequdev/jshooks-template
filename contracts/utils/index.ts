export * from './macro'
export const console = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  log: (key: string, msg: any) => trace(key, msg, false),
}

export const hex2str = (hex: string) => {
  const intArr: number[] = []
  for (let j = 0; j < hex.length; j += 2) {
    intArr.push(Number.parseInt(`0x${hex.slice(j, j + 2)}`, 16))
  }
  return buf2str(intArr)
}
export const str2hex = (str: string) => {
  return str
    .split('')
    .map((c) => c.charCodeAt(0).toString(16))
    .join('')
}

export const buf2str = (arr: number[]) => {
  return String.fromCodePoint(...arr)
}
export const buf2hex = (arr: number[]) => {
  return arr.map((n) => n.toString(16).padStart(2, '0')).join('')
}
export const hex2buf = (hex: string) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return hex.match(/.{2}/g)!.map((c) => Number.parseInt(c, 16))
}

export const SUB_OFFSET = (x: number) => Number(BigInt(x) >> BigInt(32))
export const SUB_LENGTH = (x: number) => x & 0xffffffff

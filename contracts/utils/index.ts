export * from './macro'

export const console = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  log: (key: string, msg: any) => trace(key, msg, false),
}

export const SUB_OFFSET = (x: number) => Number(BigInt(x) >> BigInt(32))
export const SUB_LENGTH = (x: number) => x & 0xffffffff

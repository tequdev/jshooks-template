import { buf2hex, hex2buf, hex2str } from '@/utils'
import { TRANSACTION_TYPE_MAP } from '@transia/ripple-binary-codec'
import type { Transaction as OriginTransaction } from '@transia/xahau-models'
import {
  type Transaction,
  decode,
  decodeAccountID,
  encode,
  encodeAccountID,
  verifyKeypairSignature,
} from '@transia/xrpl'
import type { HookParameter } from '@transia/xrpl/dist/npm/models/common'
import { hashTx } from '@transia/xrpl/dist/npm/utils/hashes'
import sha512Half from '@transia/xrpl/dist/npm/utils/hashes/sha512Half'
import { ALREADY_SET, DOESNT_EXIST, INVALID_ARGUMENT, PREREQUISITE_NOT_MET, TOO_BIG, TOO_SMALL } from 'jshooks-api'

export type MockedHookAPI = {
  hookResult: () => HookResult
  resetHookResult: () => void
  setTransaction: (tx: OriginTransaction) => void
  setHookParameters: (params: HookParameter[]) => void
}

export type HookResult = {
  result: 'rollback' | 'accept' | undefined
  msg: string
  code: number
}

export const mockedHookApi = (): MockedHookAPI => {
  let originTransaction: OriginTransaction | undefined
  let hookParameters: HookParameter[] | undefined
  let result: HookResult['result'] = undefined
  let resultMsg: HookResult['msg'] = ''
  let resultCode: HookResult['code'] = 0

  const _accept: typeof accept = vi.fn((msg, code) => {
    if (!result) {
      result = 'accept'
      resultMsg = msg
      resultCode = code
    }
    return 0
  })

  const _emit: typeof emit = vi.fn((tx) => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    let txblob: string
    if (Array.isArray(tx)) txblob = tx.map((v) => v.toString(16)).join('')
    else txblob = encode(tx as Transaction)
    return hex2buf(hashTx(txblob))
  })

  const _prepare: typeof prepare = vi.fn((template) => {
    template.Fee = '100'
    template.SigningPubKey = ''
    template.Sequence = 0
    template.Account = util_raddr(hook_account() as number[]) as string
    if (!template.FirstLedgerSequence) {
      template.LastLedgerSequence = 1 + 1
    }
    if (!template.LastLedgerSequence) {
      template.LastLedgerSequence = 1 + 5
    }
    if (!template.EmitDetails) {
      template.EmitDetails = {
        EmitGeneration: etxn_generation(),
        EmitBurden: etxn_burden(),
        EmitParentTxnID: buf2hex(util_sha512h('EmitParentTxnID') as number[]),
        EmitHookHash: buf2hex(util_sha512h('EmitHookHash') as number[]),
      }
    }
    return template
  })

  const _otxn_json: typeof otxn_json = vi.fn(() => {
    if (originTransaction) return originTransaction
    throw new Error('use setInvokedTransaction() to set the transaction')
  })
  const _slot_json: typeof slot_json = vi.fn(() => {
    throw new Error('global.slot_json Should be mocked')
  })
  const _sto_to_json: typeof sto_to_json = vi.fn((sto_in) => {
    // TODO: support STObject
    const hex = typeof sto_in === 'string' ? sto_in : buf2hex(sto_in)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return decode(hex) as any
  })
  const _sto_from_json: typeof sto_from_json = vi.fn((json_in) => {
    // TODO: support STObject
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const hex = encode(json_in as any)
    return hex2buf(hex)
  })
  // etxn
  let expected_etxn_count = -1
  const _etxn_burden: typeof etxn_burden = vi.fn(() => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    const currentBurden = originTransaction?.EmitDetails?.EmitBurden || 1
    return currentBurden * expected_etxn_count
  })
  const _etxn_details: typeof etxn_details = vi.fn(() => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    throw new Error('global.etxn_details Should be mocked')
  })
  const _etxn_fee_base: typeof etxn_fee_base = vi.fn((txblob) => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    return 10
  })
  const _etxn_generation: typeof etxn_generation = vi.fn(() => {
    const current = originTransaction?.EmitDetails?.EmitGeneration || 0
    return current + 1
  })
  const _etxn_nonce: typeof etxn_nonce = vi.fn(() => {
    return util_sha512h('etxn_nonce')
  })
  const _etxn_reserve: typeof etxn_reserve = vi.fn((count) => {
    const n = Number(count)
    if (expected_etxn_count > -1) return ALREADY_SET
    if (n < 1) return TOO_SMALL
    if (n > 255) return TOO_BIG
    expected_etxn_count = n
    return n
  })
  // fee
  const _fee_base: typeof fee_base = vi.fn(() => {
    return 10
  })
  // float
  const _float_compare: typeof float_compare = vi.fn(() => {
    throw new Error('global.float_compare Should be mocked')
  })
  const _float_divide: typeof float_divide = vi.fn(() => {
    throw new Error('global.float_divide Should be mocked')
  })
  const _float_int: typeof float_int = vi.fn(() => {
    throw new Error('global.float_int Should be mocked')
  })
  const _float_invert: typeof float_invert = vi.fn(() => {
    throw new Error('global.float_invert Should be mocked')
  })
  const _float_log: typeof float_log = vi.fn(() => {
    throw new Error('global.float_log Should be mocked')
  })
  const _float_mantissa: typeof float_mantissa = vi.fn(() => {
    throw new Error('global.float_mantissa Should be mocked')
  })
  const _float_mulratio: typeof float_mulratio = vi.fn(() => {
    throw new Error('global.float_mulratio Should be mocked')
  })
  const _float_multiply: typeof float_multiply = vi.fn(() => {
    throw new Error('global.float_multiply Should be mocked')
  })
  const _float_negate: typeof float_negate = vi.fn(() => {
    throw new Error('global.float_negate Should be mocked')
  })
  const _float_one: typeof float_one = vi.fn(() => {
    throw new Error('global.float_one Should be mocked')
  })
  const _float_root: typeof float_root = vi.fn(() => {
    throw new Error('global.float_root Should be mocked')
  })
  const _float_set: typeof float_set = vi.fn(() => {
    throw new Error('global.float_set Should be mocked')
  })
  const _float_sign: typeof float_sign = vi.fn(() => {
    throw new Error('global.float_sign Should be mocked')
  })
  const _float_sto: typeof float_sto = vi.fn(() => {
    throw new Error('global.float_sto Should be mocked')
  })
  const _float_sto_set: typeof float_sto_set = vi.fn(() => {
    throw new Error('global.float_sto_set Should be mocked')
  })
  const _float_sum: typeof float_sum = vi.fn(() => {
    throw new Error('global.float_sum Should be mocked')
  })
  // hook
  const _hook_account: typeof hook_account = vi.fn(() => {
    return util_accid('rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn')
  })
  const _hook_again: typeof hook_again = vi.fn(() => {
    throw new Error('global.hook_again Should be mocked')
  })
  const _hook_hash: typeof hook_hash = vi.fn(() => {
    return util_sha512h('hook_hash')
  })
  const _hook_param: typeof hook_param = vi.fn((param_key) => {
    if (!hookParameters) throw new Error('use setInvokedTransaction() to set the transaction')
    const key = typeof param_key === 'string' ? param_key : buf2hex(param_key)
    const param = hookParameters.find((p) => p.HookParameter.HookParameterName === key)
    if (!param) return DOESNT_EXIST
    return hex2buf(param.HookParameter.HookParameterValue)
  })
  const _otxn_param: typeof otxn_param = vi.fn((param_key) => {
    if (!originTransaction) throw new Error('use setInvokedTransaction() to set the transaction')
    if (!originTransaction?.HookParameters) return DOESNT_EXIST
    const key = typeof param_key === 'string' ? param_key : buf2hex(param_key)
    const param = originTransaction.HookParameters.find((p) => p.HookParameter.HookParameterName === key)
    if (!param) return DOESNT_EXIST
    return hex2buf(param.HookParameter.HookParameterValue)
  })
  const _hook_param_set: typeof hook_param_set = vi.fn(() => {
    throw new Error('global.hook_param_set Should be mocked')
  })
  const _hook_pos: typeof hook_pos = vi.fn(() => {
    throw new Error('global.hook_pos Should be mocked')
  })
  const _hook_skip: typeof hook_skip = vi.fn((hhash, flags) => {
    const hashBuf = typeof hhash === 'string' ? hex2buf(hhash) : hhash
    const f = Number(flags)
    if (hashBuf.length !== 32 || f < 0 || 1 < f) return INVALID_ARGUMENT
    return 1
  })
  // ledger
  const _ledger_keylet: typeof ledger_keylet = vi.fn(() => {
    throw new Error('global.ledger_keylet Should be mocked')
  })
  const _ledger_last_hash: typeof ledger_last_hash = vi.fn(() => {
    return util_sha512h('ledger_last_hash')
  })
  const _ledger_last_time: typeof ledger_last_time = vi.fn(() => {
    return 1704067200 - 946684800 // 2024-01-01T00:00:00Z
  })
  const _ledger_nonce: typeof ledger_nonce = vi.fn(() => {
    return util_sha512h('ledger_nonce')
  })
  const _ledger_seq: typeof ledger_seq = vi.fn(() => {
    return 5698428
  })
  // otxn
  const _meta_slot: typeof meta_slot = vi.fn(() => {
    throw new Error('global.meta_slot Should be mocked')
  })
  const _otxn_burden: typeof otxn_burden = vi.fn(() => {
    throw new Error('global.otxn_burden Should be mocked')
  })
  const _otxn_field: typeof otxn_field = vi.fn(() => {
    throw new Error('global.otxn_field Should be mocked')
  })
  const _otxn_generation: typeof otxn_generation = vi.fn(() => {
    throw new Error('global.otxn_generation Should be mocked')
  })
  const _otxn_id: typeof otxn_id = vi.fn(() => {
    throw new Error('global.otxn_id Should be mocked')
  })
  const _otxn_slot: typeof otxn_slot = vi.fn(() => {
    throw new Error('global.otxn_slot Should be mocked')
  })
  const _otxn_type: typeof otxn_type = vi.fn(() => {
    if (!originTransaction) throw new Error('use setInvokedTransaction() to set the transaction')
    const type = TRANSACTION_TYPE_MAP[originTransaction.TransactionType]
    if (type === undefined) throw new Error('TransactionType not found')
    return type
  })
  // rollback
  const _rollback: typeof rollback = vi.fn((msg, code) => {
    if (!result) {
      result = 'rollback'
      resultMsg = msg
      resultCode = code
    }
    return 0
  })
  // slot
  const _slot: typeof slot = vi.fn(() => {
    throw new Error('global.slot Should be mocked')
  })
  const _slot_clear: typeof slot_clear = vi.fn(() => {
    throw new Error('global.slot_clear Should be mocked')
  })
  const _slot_count: typeof slot_count = vi.fn(() => {
    throw new Error('global.slot_count Should be mocked')
  })
  const _slot_float: typeof slot_float = vi.fn(() => {
    throw new Error('global.slot_float Should be mocked')
  })
  const _slot_set: typeof slot_set = vi.fn(() => {
    throw new Error('global.slot_set Should be mocked')
  })
  const _slot_size: typeof slot_size = vi.fn(() => {
    throw new Error('global.slot_size Should be mocked')
  })
  const _slot_subarray: typeof slot_subarray = vi.fn(() => {
    throw new Error('global.slot_subarray Should be mocked')
  })
  const _slot_subfield: typeof slot_subfield = vi.fn(() => {
    throw new Error('global.slot_subfield Should be mocked')
  })
  const _slot_type: typeof slot_type = vi.fn(() => {
    throw new Error('global.slot_type Should be mocked')
  })
  // state
  let s = {} as Record<string, number[]>
  const _state: typeof state = vi.fn((key) => {
    const hexKey = typeof key === 'string' ? key : buf2hex(key)
    if (!s[hexKey]) return DOESNT_EXIST
    return s[hexKey]
  })
  const _state_foreign: typeof state_foreign = vi.fn(() => {
    throw new Error('global.state_foreign Should be mocked')
  })
  const _state_foreign_set: typeof state_foreign_set = vi.fn(() => {
    throw new Error('global.state_foreign_set Should be mocked')
  })
  const _state_set: typeof state_set = vi.fn((data, key) => {
    const hexKey = typeof key === 'string' ? key : buf2hex(key)
    const bufferData = typeof data === 'string' ? hex2buf(data) : data
    if (!bufferData) {
      delete s[hexKey]
      return 0
    }
    if (bufferData.every((v) => v === 0)) delete s[hexKey]
    else s[hexKey] = bufferData
    return bufferData.length
  })
  // sto
  const _sto_emplace: typeof sto_emplace = vi.fn(() => {
    throw new Error('global.sto_emplace Should be mocked')
  })
  const _sto_erase: typeof sto_erase = vi.fn(() => {
    throw new Error('global.sto_erase Should be mocked')
  })
  const _sto_subarray: typeof sto_subarray = vi.fn(() => {
    throw new Error('global.sto_subarray Should be mocked')
  })
  const _sto_subfield: typeof sto_subfield = vi.fn(() => {
    throw new Error('global.sto_subfield Should be mocked')
  })
  const _sto_validate: typeof sto_validate = vi.fn(() => {
    throw new Error('global.sto_validate Should be mocked')
  })
  // trace
  const _trace: typeof trace = vi.fn((key, value, isHex) => {
    console.log(key, isHex ? hex2str(value) : value)
    return 0
  })
  // util
  const _util_accid: typeof util_accid = vi.fn((radd) => {
    return [...decodeAccountID(radd)]
  })
  const _util_keylet: typeof util_keylet = vi.fn(() => {
    throw new Error('global.util_keylet Should be mocked')
  })
  const _util_raddr: typeof util_raddr = vi.fn((acc_id) => {
    let buf: number[]
    if (typeof acc_id === 'string') buf = hex2buf(acc_id)
    else buf = acc_id
    return encodeAccountID(Buffer.from(buf))
  })
  const _util_sha512h: typeof util_sha512h = vi.fn((data) => {
    let hex: string
    if (typeof data === 'string') hex = data
    else hex = buf2hex(data)
    return hex2buf(sha512Half(hex))
  })
  const _util_verify: typeof util_verify = vi.fn((data, sig, key) => {
    const message = typeof data === 'string' ? hex2buf(data) : data
    const signature = typeof sig === 'string' ? hex2buf(sig) : sig
    const publicKey = typeof key === 'string' ? hex2buf(key) : key
    return verifyKeypairSignature(message, signature, publicKey) ? 1 : 0
  })

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).accept = _accept
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).emit = _emit
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).prepare = _prepare
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_json = _otxn_json
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_json = _slot_json
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_to_json = _sto_to_json
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_from_json = _sto_from_json
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).etxn_burden = _etxn_burden
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).etxn_details = _etxn_details
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).etxn_fee_base = _etxn_fee_base
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).etxn_generation = _etxn_generation
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).etxn_nonce = _etxn_nonce
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).etxn_reserve = _etxn_reserve
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).fee_base = _fee_base
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_compare = _float_compare
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_divide = _float_divide
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_int = _float_int
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_invert = _float_invert
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_log = _float_log
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_mantissa = _float_mantissa
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_mulratio = _float_mulratio
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_multiply = _float_multiply
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_negate = _float_negate
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_one = _float_one
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_root = _float_root
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_set = _float_set
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_sign = _float_sign
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_sto = _float_sto
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_sto_set = _float_sto_set
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).float_sum = _float_sum
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_account = _hook_account
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_again = _hook_again
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_hash = _hook_hash
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_param = _hook_param
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_param = _otxn_param
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_param_set = _hook_param_set
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_pos = _hook_pos
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).hook_skip = _hook_skip
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).ledger_keylet = _ledger_keylet
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).ledger_last_hash = _ledger_last_hash
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).ledger_last_time = _ledger_last_time
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).ledger_nonce = _ledger_nonce
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).ledger_seq = _ledger_seq
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).meta_slot = _meta_slot
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_burden = _otxn_burden
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_field = _otxn_field
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_generation = _otxn_generation
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_id = _otxn_id
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_slot = _otxn_slot
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).otxn_type = _otxn_type
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).rollback = _rollback
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot = _slot
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_clear = _slot_clear
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_count = _slot_count
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_float = _slot_float
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_set = _slot_set
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_size = _slot_size
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_subarray = _slot_subarray
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_subfield = _slot_subfield
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).slot_type = _slot_type
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).state = _state
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).state_foreign = _state_foreign
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).state_foreign_set = _state_foreign_set
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).state_set = _state_set
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_emplace = _sto_emplace
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_erase = _sto_erase
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_subarray = _sto_subarray
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_subfield = _sto_subfield
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).sto_validate = _sto_validate
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).trace = _trace
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).util_accid = _util_accid
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).util_keylet = _util_keylet
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).util_raddr = _util_raddr
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).util_sha512h = _util_sha512h
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(global as any).util_verify = _util_verify

  const setTransaction = (tx: OriginTransaction) => {
    originTransaction = tx
  }
  const setHookParameters = (params: HookParameter[]) => {
    hookParameters = params
  }

  const hookResult = (): HookResult => ({
    result,
    msg: resultMsg,
    code: resultCode,
  })
  const resetHookResult = () => {
    s = {}
    result = undefined
    resultMsg = ''
    resultCode = 0
    hookParameters = undefined
    originTransaction = undefined
    expected_etxn_count = -1
    s = {}
  }
  return {
    hookResult,
    resetHookResult,
    setTransaction,
    setHookParameters,
  }
}

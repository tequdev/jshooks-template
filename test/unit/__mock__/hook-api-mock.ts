import { buf2hex, hex2buf, hex2str } from '@/utils'
import type { JSIntArray, JSJSON } from '@/utils/extern'
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

  global.accept = vi.fn((msg, code) => {
    if (!result) {
      result = 'accept'
      resultMsg = msg
      resultCode = code
    }
  })
  global.emit = vi.fn((tx) => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    let txblob: string
    if (Array.isArray(tx)) txblob = tx.map((v) => v.toString(16)).join('')
    else txblob = encode(tx as Transaction)
    return hex2buf(hashTx(txblob))
  })
  global.prepare = vi.fn((template) => {
    template.Fee = '100'
    template.SigningPubKey = ''
    template.Sequence = 0
    template.Account = util_raddr(hook_account() as JSIntArray) as string
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
        EmitParentTxnID: buf2hex(util_sha512h('EmitParentTxnID') as JSIntArray),
        EmitHookHash: buf2hex(util_sha512h('EmitHookHash') as JSIntArray),
      }
    }
    return template
  })
  global.otxn_json = vi.fn(() => {
    if (originTransaction) return originTransaction
    throw new Error('use setInvokedTransaction() to set the transaction')
  })
  global.slot_json = vi.fn(() => {
    throw new Error('global.slot_json Should be mocked')
  })
  global.sto_to_json = vi.fn((sto_in) => {
    // TODO: support STObject
    const hex = typeof sto_in === 'string' ? sto_in : buf2hex(sto_in)
    return decode(hex) as unknown as JSJSON
  })
  global.sto_from_json = vi.fn((json_in) => {
    // TODO: support STObject
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const hex = encode(json_in as any)
    return hex2buf(hex)
  })
  // etxn
  let expected_etxn_count = -1
  global.etxn_burden = vi.fn(() => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    const currentBurden = originTransaction?.EmitDetails?.EmitBurden || 1
    return currentBurden * expected_etxn_count
  })
  global.etxn_details = vi.fn(() => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    throw new Error('global.etxn_details Should be mocked')
  })
  global.etxn_fee_base = vi.fn((txblob) => {
    if (expected_etxn_count <= -1) return PREREQUISITE_NOT_MET
    return 10
  })
  global.etxn_generation = vi.fn(() => {
    const current = originTransaction?.EmitDetails?.EmitGeneration || 0
    return current + 1
  })
  global.etxn_nonce = vi.fn(() => {
    return util_sha512h('etxn_nonce')
  })
  global.etxn_reserve = vi.fn((count) => {
    const n = Number(count)
    if (expected_etxn_count > -1) return ALREADY_SET
    if (n < 1) return TOO_SMALL
    if (n > 255) return TOO_BIG
    expected_etxn_count = n
    return n
  })
  // fee
  global.fee_base = vi.fn(() => {
    return 10
  })
  // float
  global.float_compare = vi.fn(() => {
    throw new Error('global.float_compare Should be mocked')
  })
  global.float_divide = vi.fn(() => {
    throw new Error('global.float_divide Should be mocked')
  })
  global.float_int = vi.fn(() => {
    throw new Error('global.float_int Should be mocked')
  })
  global.float_invert = vi.fn(() => {
    throw new Error('global.float_invert Should be mocked')
  })
  global.float_log = vi.fn(() => {
    throw new Error('global.float_log Should be mocked')
  })
  global.float_mantissa = vi.fn(() => {
    throw new Error('global.float_mantissa Should be mocked')
  })
  global.float_mulratio = vi.fn(() => {
    throw new Error('global.float_mulratio Should be mocked')
  })
  global.float_multiply = vi.fn(() => {
    throw new Error('global.float_multiply Should be mocked')
  })
  global.float_negate = vi.fn(() => {
    throw new Error('global.float_negate Should be mocked')
  })
  global.float_one = vi.fn(() => {
    throw new Error('global.float_one Should be mocked')
  })
  global.float_root = vi.fn(() => {
    throw new Error('global.float_root Should be mocked')
  })
  global.float_set = vi.fn(() => {
    throw new Error('global.float_set Should be mocked')
  })
  global.float_sign = vi.fn(() => {
    throw new Error('global.float_sign Should be mocked')
  })
  global.float_sto = vi.fn(() => {
    throw new Error('global.float_sto Should be mocked')
  })
  global.float_sto_set = vi.fn(() => {
    throw new Error('global.float_sto_set Should be mocked')
  })
  global.float_sum = vi.fn(() => {
    throw new Error('global.float_sum Should be mocked')
  })
  global.float_compare = vi.fn(() => {
    throw new Error('global.float_compare Should be mocked')
  })
  // hook
  global.hook_account = vi.fn(() => {
    return util_accid('rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn')
  })
  global.hook_again = vi.fn(() => {
    throw new Error('global.hook_again Should be mocked')
  })
  global.hook_hash = vi.fn(() => {
    return util_sha512h('hook_hash')
  })
  global.hook_param = vi.fn((param_key) => {
    if (!hookParameters) throw new Error('use setInvokedTransaction() to set the transaction')
    const key = typeof param_key === 'string' ? param_key : buf2hex(param_key)
    const param = hookParameters.find((p) => p.HookParameter.HookParameterName === key)
    if (!param) return DOESNT_EXIST
    return hex2buf(param.HookParameter.HookParameterValue)
  })
  global.otxn_param = vi.fn((param_key) => {
    if (!originTransaction) throw new Error('use setInvokedTransaction() to set the transaction')
    if (!originTransaction?.HookParameters) return DOESNT_EXIST
    const key = typeof param_key === 'string' ? param_key : buf2hex(param_key)
    const param = originTransaction.HookParameters.find((p) => p.HookParameter.HookParameterName === key)
    if (!param) return DOESNT_EXIST
    return hex2buf(param.HookParameter.HookParameterValue)
  })
  global.hook_param_set = vi.fn(() => {
    throw new Error('global.hook_param_set Should be mocked')
  })
  global.hook_pos = vi.fn(() => {
    throw new Error('global.hook_pos Should be mocked')
  })
  global.hook_skip = vi.fn((hhash, flags) => {
    const hashBuf = typeof hhash === 'string' ? hex2buf(hhash) : hhash
    const f = Number(flags)
    if (hashBuf.length !== 32 || f < 0 || 1 < f) return INVALID_ARGUMENT
    return 1
  })
  // ledger
  global.ledger_keylet = vi.fn(() => {
    throw new Error('global.ledger_keylet Should be mocked')
  })
  global.ledger_last_hash = vi.fn(() => {
    return util_sha512h('ledger_last_hash')
  })
  global.ledger_last_time = vi.fn(() => {
    return 1704067200 - 946684800 // 2024-01-01T00:00:00Z
  })
  global.ledger_nonce = vi.fn(() => {
    return util_sha512h('ledger_nonce')
  })
  global.ledger_seq = vi.fn(() => {
    return 5698428
  })
  // otxn
  global.meta_slot = vi.fn(() => {
    throw new Error('global.meta_slot Should be mocked')
  })
  global.otxn_burden = vi.fn(() => {
    throw new Error('global.otxn_burden Should be mocked')
  })
  global.otxn_field = vi.fn(() => {
    throw new Error('global.otxn_field Should be mocked')
  })
  global.otxn_generation = vi.fn(() => {
    throw new Error('global.otxn_generation Should be mocked')
  })
  global.otxn_id = vi.fn(() => {
    throw new Error('global.otxn_id Should be mocked')
  })
  global.otxn_slot = vi.fn(() => {
    throw new Error('global.otxn_slot Should be mocked')
  })
  global.otxn_type = vi.fn(() => {
    if (!originTransaction) throw new Error('use setInvokedTransaction() to set the transaction')
    const type = TRANSACTION_TYPE_MAP[originTransaction.TransactionType]
    if (type === undefined) throw new Error('TransactionType not found')
    return type
  })
  // rollback
  global.rollback = vi.fn((msg, code) => {
    if (!result) {
      result = 'rollback'
      resultMsg = msg
      resultCode = code
    }
  })
  // slot
  global.slot = vi.fn(() => {
    throw new Error('global.slot Should be mocked')
  })
  global.slot_clear = vi.fn(() => {
    throw new Error('global.slot_clear Should be mocked')
  })
  global.slot_count = vi.fn(() => {
    throw new Error('global.slot_count Should be mocked')
  })
  global.slot_float = vi.fn(() => {
    throw new Error('global.slot_float Should be mocked')
  })
  global.slot_set = vi.fn(() => {
    throw new Error('global.slot_set Should be mocked')
  })
  global.slot_size = vi.fn(() => {
    throw new Error('global.slot_size Should be mocked')
  })
  global.slot_subarray = vi.fn(() => {
    throw new Error('global.slot_subarray Should be mocked')
  })
  global.slot_subfield = vi.fn(() => {
    throw new Error('global.slot_subfield Should be mocked')
  })
  global.slot_type = vi.fn(() => {
    throw new Error('global.slot_type Should be mocked')
  })
  // state
  let s = {} as Record<string, JSIntArray>
  global.state = vi.fn((key) => {
    const hexKey = typeof key === 'string' ? key : buf2hex(key)
    if (!s[hexKey]) return DOESNT_EXIST
    return s[hexKey]
  })
  global.state_foreign = vi.fn(() => {
    throw new Error('global.state_foreign Should be mocked')
  })
  global.state_foreign_set = vi.fn(() => {
    throw new Error('global.state_foreign_set Should be mocked')
  })
  global.state_set = vi.fn((data, key) => {
    const hexKey = typeof key === 'string' ? key : buf2hex(key)
    const bufferData = typeof data === 'string' ? hex2buf(data) : data
    if (bufferData.every((v) => v === 0)) delete s[hexKey]
    else s[hexKey] = bufferData
    return bufferData.length
  })
  // sto
  global.sto_emplace = vi.fn(() => {
    throw new Error('global.sto_emplace Should be mocked')
  })
  global.sto_erase = vi.fn(() => {
    throw new Error('global.sto_erase Should be mocked')
  })
  global.sto_subarray = vi.fn(() => {
    throw new Error('global.sto_subarray Should be mocked')
  })
  global.sto_subfield = vi.fn(() => {
    throw new Error('global.sto_subfield Should be mocked')
  })
  global.sto_validate = vi.fn(() => {
    throw new Error('global.sto_validate Should be mocked')
  })
  // trace
  global.trace = vi.fn((key, value, isHex) => {
    console.log(key, isHex ? hex2str(value) : value)
    return 0
  })
  global.trace_float = vi.fn(() => {
    throw new Error('global.trace_float Should be mocked')
  })
  global.trace_num = vi.fn(() => {
    throw new Error('global.trace_num Should be mocked')
  })
  global.trace_slot = vi.fn(() => {
    throw new Error('global.trace_slot Should be mocked')
  })
  // util
  global.util_accid = vi.fn((radd) => {
    return [...decodeAccountID(radd)]
  })
  global.util_keylet = vi.fn(() => {
    throw new Error('global.util_keylet Should be mocked')
  })
  global.util_raddr = vi.fn((acc_id) => {
    let buf: number[]
    if (typeof acc_id === 'string') buf = hex2buf(acc_id)
    else buf = acc_id
    return encodeAccountID(Buffer.from(buf))
  })
  global.util_sha512h = vi.fn((data) => {
    let hex: string
    if (typeof data === 'string') hex = data
    else hex = buf2hex(data)
    return hex2buf(sha512Half(hex))
  })
  global.util_verify = vi.fn((data, sig, key) => {
    const message = typeof data === 'string' ? hex2buf(data) : data
    const signature = typeof sig === 'string' ? hex2buf(sig) : sig
    const publicKey = typeof key === 'string' ? hex2buf(key) : key
    return verifyKeypairSignature(message, signature, publicKey) ? 1 : 0
  })

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

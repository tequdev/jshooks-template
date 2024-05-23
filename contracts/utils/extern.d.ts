import type { Transaction } from "@transia/xrpl-models"
import { HookErrorCodes } from './error';
// For documentation please see: https://xrpl-hooks.readme.io/reference/

type HookErrorCode = number

type JSInt = number | string

type JSInt64 = number

type JSIntArray = number[]

type JSIntArrayOrHexString = JSIntArray | string

type TransactionJSON = Transaction

declare global {
  function g(guard_id: number, maxiter: number): JSInt64 | HookErrorCode

  function accept(message: string, error_code: number): void

  function emit(tx: JSIntArrayOrHexString | TransactionJSON): JSIntArray | HookErrorCode

  function prepare(template: TransactionJSON): TransactionJSON

  function otxn_json(): TransactionJSON | HookErrorCode

  function slot_json(slotno: JSInt): TransactionJSON | HookErrorCode

  function sto_to_json(sto_in: JSIntArrayOrHexString): TransactionJSON | HookErrorCode

  function sto_from_json(json_in: TransactionJSON): JSIntArray | HookErrorCode

  function etxn_burden(): JSInt64 | HookErrorCode

  function etxn_details(): JSIntArray | HookErrorCode

  function etxn_fee_base(txblob: JSIntArrayOrHexString): JSInt64 | HookErrorCode

  function etxn_generation(): JSInt64 | HookErrorCode

  function etxn_nonce(): JSIntArray | HookErrorCode

  function etxn_reserve(count: JSInt): JSInt64 | HookErrorCode

  function fee_base(): JSInt64 | HookErrorCode

  function float_compare(float1: JSInt, float2: JSInt, mode: JSInt): JSInt64 | HookErrorCode

  function float_divide(float1: JSInt, float2: JSInt): JSInt64 | HookErrorCode

  function float_int(float1: JSInt, decimal_places: JSInt, abs: JSInt): JSInt64 | HookErrorCode

  function float_invert(float1: JSInt): JSInt64 | HookErrorCode

  function float_log(float1: JSInt): JSInt64 | HookErrorCode

  function float_mantissa(float1: JSInt): JSInt64 | HookErrorCode

  function float_mulratio(float1: JSInt, round_up: JSInt, numerator: JSInt, denominator: JSInt): JSInt64 | HookErrorCode

  function float_multiply(float1: JSInt, float2: JSInt): JSInt64 | HookErrorCode

  function float_negate(float1: JSInt): JSInt64 | HookErrorCode

  function float_one(): JSInt64 | HookErrorCode

  function float_root(float1: JSInt, n: JSInt): JSInt64 | HookErrorCode

  function float_set(exponent: JSInt, mantissa: JSInt): JSInt64 | HookErrorCode

  function float_sign(float1: JSInt): JSInt64 | HookErrorCode

  function float_sto(
    currency: JSIntArrayOrHexString,
    issuer: JSIntArrayOrHexString,
    float1: JSInt,
    field_code: JSInt,
  ): JSIntArray | HookErrorCode

  function float_sum(float1: JSInt, float2: JSInt): JSInt64 | HookErrorCode

  function hook_account(): JSIntArray | HookErrorCode

  function hook_again(): JSInt64 | HookErrorCode

  function hook_hash(hook_no: JSInt): JSIntArray | HookErrorCode

  function hook_param(name: JSIntArrayOrHexString): nunber[] | HookErrorCode

  function otxn_param(param_key: JSIntArrayOrHexString): JSIntArray | HookErrorCode

  function hook_param_set(val: JSIntArrayOrHexString, key: JSIntArrayOrHexString, hhash: JSIntArrayOrHexString): JSInt64 | HookErrorCode

  function hook_pos(): JSInt64 | HookErrorCode

  function hook_skip(hhash: JSIntArrayOrHexString, flags: JSInt): JSInt64 | HookErrorCode

  function ledger_keylet(lo: JSIntArrayOrHexString, hi: JSIntArrayOrHexString): JSIntArray | HookErrorCode

  function ledger_last_hash(): JSIntArray

  function ledger_last_time(): JSInt64 | HookErrorCode

  function ledger_nonce(): JSIntArray | HookErrorCode

  function ledger_seq(): JSInt64 | HookErrorCode

  function meta_slot(slot_no: number): JSInt64 | HookErrorCode

  function otxn_burden(): JSInt64 | HookErrorCode

  function otxn_field(field_id: JSInt): JSIntArray | HookErrorCode

  function otxn_generation(): JSInt64 | HookErrorCode

  function otxn_id(flags_in: number): ToJSIntArray | HookErrorCode

  function otxn_slot(slot_no: JSInt): JSInt64 | HookErrorCode

  function otxn_type(): JSInt64 | HookErrorCode

  function rollback(message: string, error_code: number): void

  function slot(slot: JSInt): ToJSIntArray | HookErrorCode

  function slot_clear(slot: JSInt): JSInt64 | HookErrorCode

  function slot_count(slot: JSInt): JSInt64 | HookErrorCode

  function slot_float(slot_no: JSInt): JSInt64 | HookErrorCode

  function slot_set(key: JSIntArrayOrHexString, slot_into: JSInt): JSInt64 | HookErrorCode

  function slot_size(slot: JSInt): JSInt64 | HookErrorCode

  function slot_subarray(parent_slot: JSInt, array_id: JSInt, new_slot: JSInt): JSInt64 | HookErrorCode

  function slot_subfield(parent_slot: JSInt, field_id: JSInt, new_slot: JSInt): JSInt64 | HookErrorCode

  function slot_type(slot_no: JSInt, flags: JSInt): JSInt64 | HookErrorCode

  function state(key: JSIntArrayOrHexString): JSIntArray

  function state_foreign(
    val: JSIntArrayOrHexString,
    key: JSIntArrayOrHexString,
    ns: JSIntArrayOrHexString,
    acc: JSIntArrayOrHexString,
  ): JSIntArray | HookErrorCode

  function state_foreign_set(
    val: JSIntArrayOrHexString,
    key: JSIntArrayOrHexString,
    ns: JSIntArrayOrHexString,
    acc: JSIntArrayOrHexString,
  ): JSInt64 | HookErrorCode

  function state_set(
    data: JSIntArrayOrHexString,
    key: JSIntArrayOrHexString,
  ): JSInt64 | HookErrorCode

  function sto_emplace(sto: JSIntArrayOrHexString, field: JSIntArrayOrHexString, field_id: JSInt): JSIntArray | HookErrorCode

  function sto_erase(sto: JSIntArrayOrHexString, field_id: JSInt): JSIntArray | HookErrorCode

  function sto_subarray(sto: JSIntArrayOrHexString, array_id: JSInt): JSInt64 | HookErrorCode

  function sto_subfield(sto: JSIntArrayOrHexString, field_id: JSInt): JSInt64 | HookErrorCode

  function sto_validate(sto: JSIntArrayOrHexString): JSInt64 | HookErrorCode

  function trace(message: string, data: string, as_hex: boolean): JSInt64 | HookErrorCode

  function trace_float(
    read_ptr: number,
    read_len: number,
    float1: number,
  ): JSInt64 | HookErrorCode

  function trace_num(
    read_ptr: number,
    read_len: number,
    number: number,
  ): JSInt64 | HookErrorCode

  function trace_slot(
    read_ptr: number,
    read_len: number,
    slot: number,
  ): JSInt64 | HookErrorCode

  function util_accid(raddr: string): JSIntArray | HookErrorCode

  function util_keylet(
    keylet_type: JSInt,
    a: JSInt,
    b: JSInt,
    c: JSInt,
    d: JSInt,
    e: JSInt,
    f: JSInt,
  ): JSIntArray | HookErrorCode

  function util_raddr(acc_id: JSIntArrayOrHexString): string | HookErrorCode

  function util_sha512h(data: JSIntArrayOrHexString): JSIntArray | HookErrorCode

  function util_verify(rawData: JSIntArrayOrHexString, rawSig: JSIntArrayOrHexString, rawKey: JSIntArrayOrHexString): JSInt64 | HookErrorCode
}

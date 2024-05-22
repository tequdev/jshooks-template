// For documentation please see: https://xrpl-hooks.readme.io/reference/

type JSInt = number | string

type JSIntArrayOrHexString = number[] | string

declare global {
  function g(guard_id: number, maxiter: number): number

  function accept(message: string, error_code: number): void

  function emit(tx: JSIntArrayOrHexString | object): number[] | number

  function prepare(template: object): object

  function otxn_json(): object | number

  function etxn_burden(): number

  function etxn_details(): number[] | number

  function etxn_fee_base(txblob: JSIntArrayOrHexString): number

  function etxn_generation(): number

  function etxn_nonce(): number[] | number

  function etxn_reserve(count: JSInt): number

  function fee_base(): number

  function float_compare(float1: JSInt, float2: JSInt, mode: JSInt): number

  function float_divide(float1: JSInt, float2: JSInt): number

  function float_int(float1: JSInt, decimal_places: JSInt, abs: JSInt): number

  function float_invert(float1: JSInt): number

  function float_log(float1: JSInt): number

  function float_mantissa(float1: JSInt): number

  function float_mulratio(float1: JSInt, round_up: JSInt, numerator: JSInt, denominator: JSInt): number

  function float_multiply(float1: JSInt, float2: JSInt): number

  function float_negate(float1: JSInt): number

  function float_one(): number

  function float_root(float1: JSInt, n: JSInt): number

  function float_set(exponent: JSInt, mantissa: JSInt): number

  function float_sign(float1: JSInt): number

  function float_sto(
    currency: JSIntArrayOrHexString,
    issuer: JSIntArrayOrHexString,
    float1: JSInt,
    field_code: JSInt,
  ): number[] | number

  function float_sum(float1: JSInt, float2: JSInt): number

  function hook_account(): ArrayBuffer | number

  function hook_again(): number

  function hook_hash(hook_no: JSInt): number[] | number

  function hook_param(name: JSIntArrayOrHexString): nunber[] | number

  function otxn_param(param_key: JSIntArrayOrHexString): number[] | number

  function hook_param_set(val: JSIntArrayOrHexString, key: JSIntArrayOrHexString, hhash: JSIntArrayOrHexString): number

  function hook_pos(): number

  function hook_skip(hhash: JSIntArrayOrHexString, flags: JSInt): number

  function ledger_keylet(lo: JSIntArrayOrHexString, hi: JSIntArrayOrHexString): number[] | number

  function ledger_last_hash(): number[]

  function ledger_last_time(): number

  function ledger_nonce(): number[] | number

  function ledger_seq(): number

  function meta_slot(slot_no: number): number

  function otxn_burden(): number

  function otxn_field(field_id: JSInt): number[] | number

  function otxn_generation(): number

  function otxn_id(flags_in: number): ArrayBuffer | number

  function otxn_slot(slot_no: JSInt): number

  function otxn_type(): number

  function rollback(message: string, error_code: number): void

  function slot(slot: JSInt): ArrayBuffer | number

  function slot_clear(slot: JSInt): number

  function slot_count(slot: JSInt): number

  function slot_float(slot_no: JSInt): number

  function slot_set(key: JSIntArrayOrHexString, slot_into: JSInt): number

  function slot_size(slot: JSInt): number

  function slot_subarray(parent_slot: JSInt, array_id: JSInt, new_slot: JSInt): number

  function slot_subfield(parent_slot: JSInt, field_id: JSInt, new_slot: JSInt): number

  function slot_type(slot_no: JSInt, flags: JSInt): number

  function state(key: JSIntArrayOrHexString): number[]

  function state_foreign(
    val: JSIntArrayOrHexString,
    key: JSIntArrayOrHexString,
    ns: JSIntArrayOrHexString,
    acc: JSIntArrayOrHexString,
  ): number[] | number

  function state_foreign_set(
    val: JSIntArrayOrHexString,
    key: JSIntArrayOrHexString,
    ns: JSIntArrayOrHexString,
    acc: JSIntArrayOrHexString,
  ): number

  function state_set(
    data: JSIntArrayOrHexString,
    key: JSIntArrayOrHexString,
  ): number

  function sto_emplace(sto: JSIntArrayOrHexString, field: JSIntArrayOrHexString, field_id: JSInt): number[] | number

  function sto_erase(sto: JSIntArrayOrHexString, field_id: number): number[] | number

  function sto_subarray(sto: JSIntArrayOrHexString, array_id: JSInt): number

  function sto_subfield(sto: JSIntArrayOrHexString, field_id: JSInt): number

  function sto_validate(sto: JSIntArrayOrHexString): number

  function trace(message: string, data: string, as_hex: boolean): number

  function trace_float(
    read_ptr: number,
    read_len: number,
    float1: number,
  ): number

  function trace_num(
    read_ptr: number,
    read_len: number,
    number: number,
  ): number

  function trace_slot(
    read_ptr: number,
    read_len: number,
    slot: number,
  ): number

  function util_accid(raddr: string): number[] | number

  function util_keylet(
    keylet_type: JSInt,
    a: JSInt,
    b: JSInt,
    c: JSInt,
    d: JSInt,
    e: JSInt,
    f: JSInt,
  ): number[] | number

  function util_raddr(acc_id: string): string | number

  function util_sha512h(data: JSIntArrayOrHexString): number[] | number

  function util_verify(rawData: JSIntArrayOrHexString, rawSig: JSIntArrayOrHexString, rawKey: JSIntArrayOrHexString): number
}
export type { }

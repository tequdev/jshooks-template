// For documentation please see: https://xrpl-hooks.readme.io/reference/

declare global {
  function g(guard_id: number, maxiter: number): number

  function accept(message: string, error_code: number): void

  function emit(tx: number[] | string | object): number[] | number

  function prepare(template: object): object

  function otxn_json(): object | number

  function etxn_burden(): number

  function etxn_details(): number[] | number

  function etxn_fee_base(txblob: number): number

  function etxn_generation(): number

  function etxn_nonce(): number[] | number

  function etxn_reserve(count: number): number

  function fee_base(): number

  function float_compare(float1: number, float2: number, mode: number): number

  function float_divide(float1: number, float2: number): number

  function float_exponent(float1: number): number

  function float_exponent_set(float1: number, exponent: number): number

  function float_int(float1: number, decimal_places: number, abs: number): number

  function float_invert(float1: number): number

  function float_log(float1: number): number

  function float_mantissa(float1: number): number

  function float_mantissa_set(float1: number, mantissa: number): number

  function float_mulratio(float1: number, round_up: number, numerator: number, denominator: number): number

  function float_multiply(float1: number, float2: number): number

  function float_negate(float1: number): number

  function float_one(): number

  function float_root(float1: number, n: number): number

  function float_set(exponent: number, mantissa: number): number

  function float_sign(float1: number): number

  function float_sign_set(float1: number, negative: number): number

  function float_sto(
    currency: number,
    issuer: number,
    float1: number,
    field_code: number,
  ): number[] | number

  function float_sto_set(
    buf: number,
  ): number

  function float_sum(float1: number, float2: number): number

  function hook_account(): ArrayBuffer | number

  function hook_again(): number

  function hook_hash(hook_no: number): number[] | number

  function hook_param(name: number[] | string): nunber[] | number

  function otxn_param(param_key: number): number[] | number

  function hook_param_set(val: number[] | string, key: number[] | string, hhash: number[] | string): number

  function hook_pos(): number

  function hook_skip(hhash: number[] | string, flags: number): number

  function ledger_keylet(lo: number[] | string, hi: number[] | string): number[] | number

  function ledger_last_hash(): number[]

  function ledger_last_time(): number

  function ledger_nonce(): number[] | number

  function ledger_seq(): number

  function meta_slot(slot_no: number): number

  function otxn_burden(): number

  function otxn_field(field_id: number): number[] | number

  function otxn_generation(): number

  function otxn_id(flags_in: number): ArrayBuffer | number

  function otxn_slot(slot_no: number): number

  function otxn_type(): number

  function rollback(message: string, error_code: number): void

  function slot(slot: number): ArrayBuffer | number

  function slot_clear(slot: number): number

  function slot_count(slot: number): number

  function slot_float(slot_no: number): number

  function slot_set(key: number[] | string, slot_into: number): number

  function slot_size(slot: number): number

  function slot_subarray(parent_slot: number, array_id: number, new_slot: number): number

  function slot_subfield(parent_slot: number, field_id: number, new_slot: number): number

  function slot_type(slot_no: number, flags: number): number

  function state(key: number[] | string): number[]

  function state_foreign(
    val: number[] | string,
    key: number[] | string,
    ns: number[] | string,
    acc: number[] | string,
  ): number[] | number

  function state_foreign_set(
    val: number[] | string,
    key: number[] | string,
    ns: number[] | string,
    acc: number[] | string,
  ): number

  function state_set(
    data: number[] | string,
    key: number[] | string,
  ): number

  function sto_emplace(sto: number[] | string, field: number[] | string, field_id: number): number[] | number

  function sto_erase(sto: number[] | string, field_id: number): number[] | number

  function sto_subarray(sto: number[] | string, array_id: number): number

  function sto_subfield(sto: number[] | string, field_id: number): number

  function sto_validate(sto: number[] | string): number

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
    keylet_type: number,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): number[] | number

  function util_raddr(acc_id: string): string | number

  function util_sha512h(data: number[] | string): number[] | number

  function util_verify(rawData: number[] | string, rawSig: number[] | string, rawKey: number[] | string): number
}
export type { }

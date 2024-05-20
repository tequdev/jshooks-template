// For documentation please see: https://xrpl-hooks.readme.io/reference/

declare global {
  export declare function g(guard_id: number, maxiter: number): number

  export declare function accept(message: string, error_code: number): void

  export declare function emit(
    write_ptr: number,
    write_len: number,
    read_ptr: number,
    read_len: number,
  ): number

  export declare function etxn_burden(): number

  export declare function etxn_details(): number[] | number

  export declare function etxn_fee_base(txblob: number): number

  export declare function etxn_generation(): number

  export declare function etxn_nonce(): number[] | number

  export declare function etxn_reserve(count: number): number

  export declare function fee_base(): number

  export declare function float_compare(float1: number, float2: number, mode: number): number

  export declare function float_divide(float1: number, float2: number): number

  export declare function float_exponent(float1: number): number

  export declare function float_exponent_set(float1: number, exponent: number): number

  export declare function float_int(float1: number, decimal_places: number, abs: number): number

  export declare function float_invert(float1: number): number

  export declare function float_log(float1: number): number

  export declare function float_mantissa(float1: number): number

  export declare function float_mantissa_set(float1: number, mantissa: number): number

  export declare function float_mulratio(float1: number, round_up: number, numerator: number, denominator: number): number

  export declare function float_multiply(float1: number, float2: number): number

  export declare function float_negate(float1: number): number

  export declare function float_one(): number

  export declare function float_root(float1: number, n: number): number

  export declare function float_set(exponent: number, mantissa: number): number

  export declare function float_sign(float1: number): number

  export declare function float_sign_set(float1: number, negative: number): number

  export declare function float_sto(
    write_ptr: number,
    write_len: number,
    cread_ptr: number,
    cread_len: number,
    iread_ptr: number,
    iread_len: number,
    float1: number,
    field_code: number,
  ): number

  export declare function float_sto_set(
    read_ptr: number,
    read_len: number,
  ): number

  export declare function float_sum(float1: number, float2: number): number

  export declare function hook_account(): ArrayBuffer

  export declare function hook_again(): number

  export declare function hook_hash(hook_no: number): number[] | number

  export declare function hook_param(name: number[] | string): nunber[] | number

  export declare function otxn_param(param_key: number): number[] | number

  export declare function hook_param_set(val: number[] | string, key: number[] | string, hhash: number[] | string): number

  export declare function hook_pos(): number

  export declare function hook_skip(hhash: number[] | string, flags: number): number

  export declare function ledger_keylet(lo: number[] | string, hi: number[] | string): number[] | number

  export declare function ledger_last_hash(): number[]

  export declare function ledger_last_time(): number

  export declare function ledger_nonce(): number[] | number

  export declare function ledger_seq(): number

  export declare function meta_slot(slot_no: number): number

  export declare function otxn_burden(): number

  export declare function otxn_field(field_id: number): number[] | number

  export declare function otxn_generation(): number

  export declare function otxn_id(flags_in: number): ArrayBuffer | number

  export declare function otxn_slot(slot_no: number): number

  export declare function otxn_type(): number

  export declare function rollback(message: string, error_code: number): void

  export declare function slot(slot: number): ArrayBuffer | number

  export declare function slot_clear(slot: number): number

  export declare function slot_count(slot: number): number

  export declare function slot_float(slot_no: number): number

  export declare function slot_set(key: number[] | string, slot_into: number): number

  export declare function slot_size(slot: number): number

  export declare function slot_subarray(parent_slot: number, array_id: number, new_slot: number): number

  export declare function slot_subfield(parent_slot: number, field_id: number, new_slot: number): number

  export declare function slot_type(slot_no: number, flags: number): number

  export declare function state(key: number[] | string): number[]

  export declare function state_foreign(
    val: number[] | string,
    key: number[] | string,
    ns: number[] | string,
    acc: number[] | string,
  ): number[] | number

  export declare function state_foreign_set(
    val: number[] | string,
    key: number[] | string,
    ns: number[] | string,
    acc: number[] | string,
  ): number

  export declare function state_set(
    data: number[] | string,
    key: number[] | string,
  ): number

  export declare function sto_emplace(sto: number[] | string, field: number[] | string, field_id: number): number[] | number

  export declare function sto_erase(sto: number[] | string, field_id: number): number[] | number

  export declare function sto_subarray(sto: number[] | string, array_id: number): number

  export declare function sto_subfield(sto: number[] | string, field_id: number): number

  export declare function sto_validate(sto: number[] | string): number

  export declare function trace(message: string, data: string, as_hex: boolean
  ): string | number

  export declare function trace_float(
    read_ptr: number,
    read_len: number,
    float1: number,
  ): number

  export declare function trace_num(
    read_ptr: number,
    read_len: number,
    number: number,
  ): number

  export declare function trace_slot(
    read_ptr: number,
    read_len: number,
    slot: number,
  ): number

  export declare function util_accid(raddr: string): number[] | number

  export declare function util_keylet(
    keylet_type: number,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): number[] | number

  export declare function util_raddr(acc_id: string): string | number

  export declare function util_sha512h(data: number[] | string): number[] | number

  export declare function util_verify(rawData: number[] | string, rawSig: number[] | string, rawKey: number[] | string): number
}
export type { }

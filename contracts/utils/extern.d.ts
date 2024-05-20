// For documentation please see: https://xrpl-hooks.readme.io/reference/

declare global {
  export declare function g(guard_id: number, maxiter: number): number
  export declare function accept(
    read_ptr: number,
    read_len: number,
    error_code: number,
  ): number

  export declare function emit(
    write_ptr: number,
    write_len: number,
    read_ptr: number,
    read_len: number,
  ): number

  export declare function etxn_burden(): number

  export declare function etxn_details(
    write_ptr: number,
    write_len: number,
  ): number

  export declare function etxn_fee_base(
    read_ptr: number,
    read_len: number,
  ): number

  export declare function etxn_generation(): number

  export declare function etxn_nonce(
    write_ptr: number,
    write_len: number,
  ): number

  export declare function etxn_reserve(count: number): number

  export declare function fee_base(): number

  export declare function float_compare(
    float1: number,
    float2: number,
    mode: number,
  ): number

  export declare function float_divide(float1: number, float2: number): number

  export declare function float_exponent(float1: number): number

  export declare function float_exponent_set(
    float1: number,
    exponent: number,
  ): number

  export declare function float_int(
    float1: number,
    decimal_places: number,
    abs: number,
  ): number

  export declare function float_invert(float1: number): number

  export declare function float_log(float1: number): number

  export declare function float_mantissa(float1: number): number

  export declare function float_mantissa_set(
    float1: number,
    mantissa: number,
  ): number

  export declare function float_mulratio(
    float1: number,
    round_up: number,
    numerator: number,
    denominator: number,
  ): number

  export declare function float_multiply(float1: number, float2: number): number

  export declare function float_negate(float1: number): number

  export declare function float_one(): number

  export declare function float_root(float1: number, n: number): number

  export declare function float_set(exponent: number, mantissa: number): number

  export declare function float_sign(float1: number): number

  export declare function float_sign_set(
    float1: number,
    negative: number,
  ): number

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

  export declare function hook_account(
    write_ptr: number,
    write_len: number,
  ): number

  export declare function hook_again(): number

  export declare function hook_hash(
    write_ptr: number,
    write_len: number,
    hook_no: number,
  ): number

  export declare function hook_param(
    write_ptr: number,
    write_len: number,
    read_ptr: number,
    read_len: number,
  ): number

  export declare function otxn_param(
    write_ptr: number,
    write_len: number,
    read_ptr: number,
    read_len: number,
  ): number

  export declare function hook_param_set(
    read_ptr: number,
    read_len: number,
    kread_ptr: number,
    kread_len: number,
    hread_ptr: number,
    hread_len: number,
  ): number

  export declare function hook_pos(): number

  export declare function hook_skip(
    read_ptr: number,
    read_len: number,
    flags: number,
  ): number

  export declare function ledger_keylet(
    write_ptr: number,
    write_len: number,
    lread_ptr: number,
    lread_len: number,
    hread_ptr: number,
    hread_len: number,
  ): number

  export declare function ledger_last_hash(
    write_ptr: number,
    write_len: number,
  ): number

  export declare function ledger_last_time(): number

  export declare function ledger_nonce(
    write_ptr: number,
    write_len: number,
  ): number

  export declare function ledger_seq(): number

  export declare function meta_slot(slot_no: number): number

  export declare function otxn_burden(): number

  export declare function otxn_field(
    write_ptr: number,
    write_len: number,
    field_id: number,
  ): number

  export declare function otxn_field_txt(
    write_ptr: number,
    write_len: number,
    field_id: number,
  ): number

  export declare function otxn_generation(): number

  export declare function otxn_id(
    write_ptr: number,
    write_len: number,
    flags: number,
  ): number

  export declare function otxn_slot(slot_no: number): number

  export declare function otxn_type(): number

  export declare function rollback(
    read_ptr: number,
    read_len: number,
    error_code: number,
  ): number

  export declare function slot(
    write_ptr: number,
    write_len: number,
    slot: number,
  ): number

  export declare function slot_clear(slot: number): number

  export declare function slot_count(slot: number): number

  export declare function slot_float(slot_no: number): number

  export declare function slot_id(
    write_ptr: number,
    write_len: number,
    slot: number,
  ): number

  export declare function slot_set(
    read_ptr: number,
    read_len: number,
    slot: number,
  ): number

  export declare function slot_size(slot: number): number

  export declare function slot_subarray(
    parent_slot: number,
    array_id: number,
    new_slot: number,
  ): number

  export declare function slot_subfield(
    parent_slot: number,
    field_id: number,
    new_slot: number,
  ): number

  export declare function slot_type(slot_no: number, flags: number): number

  export declare function state(
    write_ptr: number,
    write_len: number,
    kread_ptr: number,
    kread_len: number,
  ): number

  export declare function state_foreign(
    write_ptr: number,
    write_len: number,
    kread_ptr: number,
    kread_len: number,
    nread_ptr: number,
    nread_len: number,
    aread_ptr: number,
    aread_len: number,
  ): number

  export declare function state_foreign_set(
    read_ptr: number,
    read_len: number,
    kread_ptr: number,
    kread_len: number,
    nread_ptr: number,
    nread_len: number,
    aread_ptr: number,
    aread_len: number,
  ): number

  export declare function state_set(
    read_ptr: number,
    read_len: number,
    kread_ptr: number,
    kread_len: number,
  ): number

  export declare function sto_emplace(
    write_ptr: number,
    write_len: number,
    sread_ptr: number,
    sread_len: number,
    fread_ptr: number,
    fread_len: number,
    field_id: number,
  ): number

  export declare function sto_erase(
    write_ptr: number,
    write_len: number,
    read_ptr: number,
    read_len: number,
    field_id: number,
  ): number

  export declare function sto_subarray(
    read_ptr: number,
    read_len: number,
    array_id: number,
  ): number

  export declare function sto_subfield(
    read_ptr: number,
    read_len: number,
    field_id: number,
  ): number

  export declare function sto_validate(
    tread_ptr: number,
    tread_len: number,
  ): number

  export declare function trace(
    mread_ptr: number,
    mread_len: number,
    dread_ptr: number,
    dread_len: number,
    as_hex: number,
  ): number

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

  export declare function util_accid(raddr: any): number | string

  export declare function util_keylet(
    write_ptr: number,
    write_len: number,
    keylet_type: number,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): number

  export declare function util_raddr(acc_id: any): number | string

  export declare function util_sha512h(
    write_ptr: number,
    write_len: number,
    read_ptr: number,
    read_len: number,
  ): number

  export declare function util_verify(
    dread_ptr: number,
    dread_len: number,
    sread_ptr: number,
    sread_len: number,
    kread_ptr: number,
    kread_len: number,
  ): number
}
export type { }

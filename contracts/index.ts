// @ts-nocheck
import { ttINVOKE } from "./utils/tts"

const transactiontype = () => otxn_type()

const Hook = (arg) => {
  trace('HookOnTT.js: Called.', false)
  // _g(1, 1)

  const tt = transactiontype()
  if (tt !== ttINVOKE) {
    return rollback('hook_on_tt: HookOn field is incorrectly set.', -37)
  }
  return accept('HookOnTT.js: Finished.', 13)
}

export { Hook }

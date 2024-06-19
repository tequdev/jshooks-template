import { assert } from './utils'

const Hook = (arg: number) => {
  trace('TRC', 'index.ts: Called.', false)

  const txn = otxn_json()
  assert(typeof txn !== 'number')

  if (txn.TransactionType !== 'Invoke') return rollback('index.ts: not an Invoke transaction', 14)

  return accept('HookOnTT.js: Finished.', 16)
}

export { Hook }

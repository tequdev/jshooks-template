import { assert, console } from './utils'

const Hook = (arg: number) => {
  console.log('TRC', 'index.ts: Called.')

  const txn = otxn_json()
  assert(typeof txn !== 'number')

  if (txn.TransactionType !== 'Invoke') {
    return rollback('index.ts: Not an Invoke transaction', -1)
  }

  return accept('index.ts: Finished.', 1)
}

export { Hook }

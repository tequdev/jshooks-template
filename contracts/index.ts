import { assert, fallback } from 'jshooks-api'
import { console, hex2buf } from './utils'

const Hook = (arg: number) => {
  console.log('TRC', 'index.ts: Called.')

  const txn = assert(otxn_json())

  const data = fallback(state(hex2buf('ABC')))

  console.log('TRC', data)

  if (txn.TransactionType !== 'Invoke') {
    return rollback('index.ts: Not an Invoke transaction', -1)
  }

  return accept('index.ts: Finished.', 1)
}

export { Hook }

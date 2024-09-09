import { assert } from 'jshooks-api'

const Hook = (arg: number) => {
  const tx = assert(otxn_json())
  if (tx.TransactionType !== 'Payment') return accept('index.ts: Only payment transactions are allowed', -1)

  const hookAccount = assert(util_raddr(assert(hook_account())))
  if (hookAccount === tx.Account) return accept('index.ts: Outgoing payment', 1)

  if (tx.Account === tx.Destination) return accept('index.ts: Self Payment', 1)

  const dt = tx.DestinationTag
  if (dt === undefined) return rollback('index.ts: DestinationTag is required', -1)

  const dtStr = dt.toString()

  const raw = dtStr.slice(0, dtStr.length - 1)
  const checksum = dtStr.slice(dtStr.length - 1, dtStr.length)

  const checksumCalc =
    raw.split('').reduce((prev, curr) => {
      return prev + Number.parseInt(curr, 10)
    }, 0) % 10

  if (checksumCalc !== Number.parseInt(checksum, 10)) return rollback('index.ts: Invalid DestinationTag', -1)

  return accept('index.ts: Valid DestinationTag', 1)
}

export { Hook }

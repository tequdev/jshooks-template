import { Hook } from '@/index'
import { mockedHookApi, type MockedHookAPI } from '../__mock__/hook-api-mock'

let api: MockedHookAPI

beforeAll(() => {
  api = mockedHookApi()
})

beforeEach(() => {
  api.resetHookResult()
})

it('Invoke', () => {
  api.setTransaction({
    TransactionType: "Invoke",
    Account: "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
  })

  Hook(0)
  expect(api.hookResult().result).toBe('accept')
})

it('Payment', () => {
  api.setTransaction({
    TransactionType: "Payment",
    Account: "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
    Destination: "rHktfGUbjqzU4GsYCMc1pDjdHXb5CJamto",
    Amount: '1000000',
  })

  Hook(0)
  expect(api.hookResult().result).toBe('rollback')
})

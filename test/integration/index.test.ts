import { SetHookFlags } from '@transia/xrpl'

import {
  ExecutionUtility,
  type SetHookParams,
  type XrplIntegrationTestContext,
  Xrpld,
  clearAllHooksV3,
  clearHookStateV3,
  createHookPayload,
  hexNamespace,
  type iHook,
  serverUrl as localServerUrl,
  setHooksV3,
  setupClient,
  teardownClient,
} from '@transia/hooks-toolkit'

const namespace = 'namespace'

const serverUrl = localServerUrl

describe('test', () => {
  let testContext: XrplIntegrationTestContext

  beforeAll(async () => {
    testContext = await setupClient(serverUrl)
    const hook = createHookPayload({
      version: 1,
      createFile: 'index',
      namespace: namespace,
      flags: SetHookFlags.hsfOverride,
      hookOnArray: ['Payment', 'Invoke'],
      fee: '1000',
    })
    await setHooksV3({
      client: testContext.client,
      seed: testContext.alice.seed,
      hooks: [{ Hook: hook }],
    } as SetHookParams)
  })

  afterAll(async () => {
    const clearHook: iHook = {
      Flags: SetHookFlags.hsfNSDelete,
      HookNamespace: hexNamespace(namespace),
    }
    await clearHookStateV3({
      client: testContext.client,
      seed: testContext.alice.seed,
      hooks: [{ Hook: clearHook }],
    } as SetHookParams)
    await clearAllHooksV3({
      client: testContext.client,
      seed: testContext.alice.seed,
    } as SetHookParams)
    await teardownClient(testContext)
  })

  describe('Incomng txn', async () => {
    it('No DestinationTag', async () => {
      const response = Xrpld.submit(testContext.client, {
        tx: {
          TransactionType: 'Payment',
          Account: testContext.bob.address,
          Destination: testContext.alice.address,
          Amount: '1',
        },
        wallet: testContext.bob,
      })
      await expect(response).rejects.toThrow('index.ts: DestinationTag is required')
    })

    it.each([1111, 1112, 1114, 1115, 1116, 1117, 1118, 1119, 1110])('Invalid DestinationTag', async (tag) => {
      const response = Xrpld.submit(testContext.client, {
        tx: {
          TransactionType: 'Payment',
          Account: testContext.bob.address,
          Destination: testContext.alice.address,
          DestinationTag: tag,
          Amount: '1',
        },
        wallet: testContext.bob,
      })
      await expect(response).rejects.toThrow('index.ts: Invalid DestinationTag')
    })

    it.each([1113, 11114, 111115, 123455, 9997, 550])('Valid DestinationTag', async (tag) => {
      const response = await Xrpld.submit(testContext.client, {
        tx: {
          TransactionType: 'Payment',
          Account: testContext.bob.address,
          Destination: testContext.alice.address,
          DestinationTag: tag,
          Amount: '1',
        },
        wallet: testContext.bob,
      })
      expect(response.meta).toHaveProperty('HookExecutions')
      const returnString = (await ExecutionUtility.getHookExecutionsFromMeta(testContext.client, response.meta))
        .executions[0].HookReturnString
      expect(returnString).toBe('index.ts: Valid DestinationTag')
    })
  })

  describe('Outgoing txn', async () => {
    it('Invalid TransactionType', async () => {
      const response = await Xrpld.submit(testContext.client, {
        tx: {
          TransactionType: 'Invoke',
          Account: testContext.alice.address,
        },
        wallet: testContext.alice,
      })
      expect(response.meta).toHaveProperty('HookExecutions')
      const returnString = (await ExecutionUtility.getHookExecutionsFromMeta(testContext.client, response.meta))
        .executions[0].HookReturnString
      expect(returnString).toBe('index.ts: Only payment transactions are allowed')
    })

    it('Outgoing payment', async () => {
      const response = await Xrpld.submit(testContext.client, {
        tx: {
          TransactionType: 'Payment',
          Account: testContext.alice.address,
          Destination: testContext.carol.address,
          Amount: '1',
        },
        wallet: testContext.alice,
      })
      expect(response.meta).toHaveProperty('HookExecutions')
      const returnString = (await ExecutionUtility.getHookExecutionsFromMeta(testContext.client, response.meta))
        .executions[0].HookReturnString
      expect(returnString).toBe('index.ts: Outgoing payment')
    })
  })
})

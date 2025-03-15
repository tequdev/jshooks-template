import { SetHookFlags } from 'xahau'

import {
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

import { compileJS } from '@xahau/hooks-cli'

const namespace = 'namespace'

const serverUrl = localServerUrl

describe('test', () => {
  let testContext: XrplIntegrationTestContext

  beforeAll(async () => {
    await compileJS('./contracts/index.ts', './build/')

    console.log('setupClient')

    testContext = await setupClient(serverUrl)
    console.log('setupClient')

    const createHook = (contract: string) => {
      return createHookPayload({
        version: 1,
        createFile: contract,
        namespace: namespace,
        flags: SetHookFlags.hsfOverride,
        hookOnArray: ['Invoke'],
        fee: '10000',
      })
    }

    await setHooksV3({
      client: testContext.client,
      seed: testContext.alice.seed,
      hooks: [
        { Hook: createHook('index') },
      ],
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
      hooks: [
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
        { Hook: clearHook },
      ],
    } as SetHookParams)
    await clearAllHooksV3({
      client: testContext.client,
      seed: testContext.alice.seed,
    } as SetHookParams)
    await teardownClient(testContext)
  })

  it('', async () => {
    const response = await Xrpld.submit(testContext.client, {
      tx: {
        TransactionType: 'Invoke',
        Account: testContext.alice.address,
      },
      wallet: testContext.alice,
    })
    console.log(response.meta)
    expect(response.meta).toHaveProperty('HookExecutions')
  })
})

import { SetHookFlags, calculateHookOn } from '@transia/xrpl'

import {
  serverUrl,
  XrplIntegrationTestContext,
  setupClient,
  teardownClient,
} from '@transia/hooks-toolkit/dist/npm/src/libs/xrpl-helpers'

import {
  SetHookParams,
  setHooksV3,
  hexNamespace,
  iHook,
  readHookBinaryHexFromNS,
  clearAllHooksV3,
  clearHookStateV3,
} from '@transia/hooks-toolkit'

const namespace = 'namespace'

describe('test', () => {
  let testContext: XrplIntegrationTestContext

  beforeAll(async () => {
    testContext = await setupClient(serverUrl)
    const hook = {
      CreateCode: readHookBinaryHexFromNS('../build/index'),
      Flags: SetHookFlags.hsfOverride,
      HookOn: calculateHookOn(['Invoke']),
      HookNamespace: hexNamespace(namespace),
      HookApiVersion: 0,
    } as iHook
    await setHooksV3({
      client: testContext.client,
      seed: testContext.alice.seed,
      hooks: [{ Hook: hook }],
    } as SetHookParams)
  })

  afterAll(async () => {
    const clearHook = {
      Flags: SetHookFlags.hsfNSDelete,
      HookNamespace: hexNamespace(namespace),
    } as iHook
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

  it('', async () => {
    expect(0).toBe(0)
  })
})

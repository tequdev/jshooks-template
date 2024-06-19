import { SetHookFlags, calculateHookOn } from '@transia/xrpl'

import {
  type XrplIntegrationTestContext,
  serverUrl,
  setupClient,
  teardownClient,
} from '@transia/hooks-toolkit/dist/npm/src/libs/xrpl-helpers'

import {
  type SetHookParams,
  Xrpld,
  clearAllHooksV3,
  clearHookStateV3,
  hexNamespace,
  type iHook,
  setHooksV3,
  wasmToHex,
} from '@transia/hooks-toolkit'

//
// biome-ignore lint/nursery/noNodejsModules: <explanation>
import path from 'node:path'
function readJSHookBinaryHexFromNS(filename: string): string {
  const buildPath = `${process.cwd()}/build`
  return wasmToHex(path.resolve(__dirname, `${buildPath}/${filename}.bc`))
}
//

const namespace = 'namespace'

describe('test', () => {
  let testContext: XrplIntegrationTestContext

  beforeAll(async () => {
    testContext = await setupClient(serverUrl)
    const hook = {
      CreateCode: readJSHookBinaryHexFromNS('../build/index'),
      Flags: SetHookFlags.hsfOverride,
      HookOn: calculateHookOn(['Invoke']),
      HookNamespace: hexNamespace(namespace),
      HookApiVersion: 1, // js-hook
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
    const response = await Xrpld.submit(testContext.client, {
      tx: {
        TransactionType: 'Invoke',
        Account: testContext.alice.address,
      },
      wallet: testContext.alice,
    })
    // biome-ignore lint/style/noRestrictedGlobals: <explanation>
    console.log(response.meta)
    expect(response.meta).toHaveProperty('HookExecutions')
  })
})

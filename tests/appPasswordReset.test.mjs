import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { createRequire } from 'node:module'

const ts = createRequire(import.meta.url)('typescript')

// Load the browser service with the repo's TypeScript compiler; no test framework needed.
const source = await readFile(new URL('../src/services/appPasswordReset.ts', import.meta.url), 'utf8')
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
function loadService() {
  const exports = {}
  new Function('exports', code)(exports)
  return exports
}
const originalFetch = globalThis.fetch
const originalApiUrl = process.env.NEXT_PUBLIC_APP_API_URL

await test('app reset uses the app backend and payload, never the website auth service', async () => {
  delete process.env.NEXT_PUBLIC_APP_API_URL
  try {
    const { resetAppPassword } = loadService()
    let request
    globalThis.fetch = async (url, init) => {
      request = { url, init }
      return Response.json({ success: true, sessionsLoggedOut: 2 })
    }
    const result = await resetAppPassword('app-reset-token', 'NewPassword123')
    assert.equal(result.success, true)
    assert.equal(request.url, 'https://lemontripapp-backend.onrender.com/api/auth/reset-password')
    assert.equal(request.init.method, 'POST')
    assert.equal(request.init.credentials, 'omit')
    assert.deepEqual(JSON.parse(request.init.body), { token: 'app-reset-token', newPassword: 'NewPassword123' })

    globalThis.fetch = async () => Response.json({ error: 'This reset link is invalid or has expired.' }, { status: 400 })
    assert.deepEqual(await resetAppPassword('expired-token', 'NewPassword123'), {
      success: false, message: 'This reset link is invalid or has expired.',
    })
    globalThis.fetch = async () => new Response('<html>Unavailable</html>', { status: 502 })
    assert.equal((await resetAppPassword('token', 'NewPassword123')).success, false)
    globalThis.fetch = async () => { throw new Error('Network failed') }
    assert.equal((await resetAppPassword('token', 'NewPassword123')).success, false)
    globalThis.fetch = async () => Response.json({ message: 'Unexpected website response' })
    assert.equal((await resetAppPassword('token', 'NewPassword123')).success, false)
  } finally {
    globalThis.fetch = originalFetch
    if (originalApiUrl === undefined) delete process.env.NEXT_PUBLIC_APP_API_URL
    else process.env.NEXT_PUBLIC_APP_API_URL = originalApiUrl
  }
})

await test('app API origin can be overridden for local testing', async () => {
  process.env.NEXT_PUBLIC_APP_API_URL = 'http://localhost:4000/'
  try {
    const { resetAppPassword } = loadService()
    globalThis.fetch = async (url) => {
      assert.equal(url, 'http://localhost:4000/api/auth/reset-password')
      return Response.json({ success: true })
    }
    assert.equal((await resetAppPassword('token', 'NewPassword123')).success, true)
  } finally {
    globalThis.fetch = originalFetch
    if (originalApiUrl === undefined) delete process.env.NEXT_PUBLIC_APP_API_URL
    else process.env.NEXT_PUBLIC_APP_API_URL = originalApiUrl
  }
})

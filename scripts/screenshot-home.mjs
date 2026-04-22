import { chromium } from 'playwright'
import { createServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const server = await createServer({ root: ROOT, server: { port: 5199 } })
await server.listen()

const browser = await chromium.launch()
const page = await (await browser.newContext({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,
})).newPage()

await page.goto('http://localhost:5199/interior-guide/')
await page.waitForTimeout(1200)
await page.screenshot({ path: path.join(ROOT, '.omc/screenshots/01-home.png') })
console.log('✓ 01-home.png')

await browser.close()
await server.close()

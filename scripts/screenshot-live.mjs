import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, '.omc/screenshots/live-01-home.png')

const browser = await chromium.launch()
const page = await (await browser.newContext({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,
})).newPage()

await page.goto('https://tael.github.io/interior-guide/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: OUT })
console.log('✓ live 스크린샷 →', OUT)

await browser.close()

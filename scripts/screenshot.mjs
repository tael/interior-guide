import { chromium } from 'playwright'
import { createServer } from 'vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, '.omc', 'screenshots')
fs.mkdirSync(OUT, { recursive: true })

const server = await createServer({
  root: ROOT,
  server: { port: 5199 },
  build: { outDir: 'dist' },
})
await server.listen()

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()
const BASE = 'http://localhost:5199/interior-guide/'

const shots = [
  { name: '01-home',       hash: '' },
  { name: '02-browse',     hash: '#browse' },
  { name: '03-add',        hash: '#add' },
  { name: '04-favorites',  hash: '#favorites' },
]

for (const s of shots) {
  await page.goto(BASE + s.hash)
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(OUT, `${s.name}.png`), fullPage: false })
  console.log(`✓ ${s.name}.png`)
}

await browser.close()
await server.close()
console.log('스크린샷 완료 →', OUT)

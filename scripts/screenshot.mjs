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

await page.goto(BASE)
await page.waitForTimeout(800)

// 홈 화면
await page.screenshot({ path: path.join(OUT, '01-home.png'), fullPage: false })
console.log('✓ 01-home.png')

// 둘러보기 탭 클릭
await page.getByRole('button', { name: /둘러보기/ }).click()
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '02-browse.png'), fullPage: false })
console.log('✓ 02-browse.png')

// 카테고리 내부 (도배 클릭)
await page.getByRole('button', { name: /도배.*비용.*시공/ }).first().click()
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '02b-browse-category.png'), fullPage: false })
console.log('✓ 02b-browse-category.png')

// 질문 추가
await page.getByRole('button', { name: /질문추가/ }).click()
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '03-add.png'), fullPage: false })
console.log('✓ 03-add.png')

// 즐겨찾기
await page.getByRole('button', { name: /즐겨찾기/ }).click()
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '04-favorites.png'), fullPage: false })
console.log('✓ 04-favorites.png')

// 상세 페이지 (검색 탭 돌아간 후 첫 카드 클릭)
await page.getByRole('button', { name: /^검색$/ }).click()
await page.waitForTimeout(300)
await page.locator('article').first().click()
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '05-detail.png'), fullPage: false })
console.log('✓ 05-detail.png')

// 검색 상태
await page.getByRole('button', { name: /^검색$/ }).click()
await page.waitForTimeout(300)
await page.locator('input[type="search"]').fill('도배 비용')
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, '06-search.png'), fullPage: false })
console.log('✓ 06-search.png')

await browser.close()
await server.close()
console.log('스크린샷 완료 →', OUT)

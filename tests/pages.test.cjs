const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const width of [320, 390, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.emulateMedia({ reducedMotion: 'reduce' });
      for (const name of ['index', 'projetos', 'experiencia', 'contato']) {
        const response = await page.goto(base + '/' + name + '.html');
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('#menu-principal [aria-current]').count(), 1);
        assert.equal(await page.locator('#menu-principal [aria-current]').getAttribute('href'), name === 'index' ? '#inicio' : name + '.html');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name + ' overflow ' + width);
        const broken = await page.locator('a[href^="#"]').evaluateAll(es => es.filter(e => !document.getElementById(e.hash.slice(1))).map(e => e.hash));
        assert.deepEqual(broken, []);
        if (width === 390 && name !== 'index') await page.screenshot({path: 'C:/Users/Julia/.codex/visualizations/2026/10/24/01a16e4a-4da8-7d71-87d3-7288fb01268b/mobile-' + name + '.png'});
      }
      await page.locator('#menu-principal a[href="projetos.html"]').click();
      await page.waitForURL('**/projetos.html');
      await page.locator('.colagem-leve').click();
      await page.waitForURL('**/projetos.html#leve-mp4');
      await page.locator('#leve-mp4 summary').click();
      assert.equal(await page.locator('#leve-mp4 details').getAttribute('open'), '');
      await page.locator('#menu-principal a[href="contato.html"]').click();
      await page.waitForURL('**/contato.html');
      const [download] = await Promise.all([page.waitForEvent('download'), page.locator('.cartao-perfil a').click()]);
      assert.ok(download.suggestedFilename().endsWith('.pdf'));
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.locator('.copiar-email').click();
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'juliaromeralage@gmail.com');
      await page.goto(base + '/#base-conhecimento');
      await page.waitForURL('**/#base-conhecimento');
      for (const section of ['projetos', 'experiencia', 'contato', 'inicio']) {
        await page.locator('#menu-principal a[href="#' + section + '"]').click();
        await page.waitForFunction(id => document.querySelector('#menu-principal [aria-current]')?.hash === '#' + id, section);
        assert.equal(new URL(page.url()).pathname, '/');
        assert.ok(await page.locator('#' + section).evaluate(e => Math.abs(e.getBoundingClientRect().top) < 150));
      }
      assert.equal(await page.locator('.capitulo').count(), 3);
      assert.equal(await page.locator('[id]').evaluateAll(es => new Set(es.map(e=>e.id)).size === es.length), true);
      assert.deepEqual(errors, []);
      console.log('PASS ' + width + ': navigation, layouts, details, resume, clipboard, old links');
      await page.close();
    }
    const noScript = await browser.newPage({ javaScriptEnabled: false });
    for (const name of ['index', 'projetos', 'experiencia', 'contato']) {
      await noScript.goto(base + '/' + name + '.html');
      assert.equal(await noScript.locator('h1').isVisible(), true);
      assert.equal(await noScript.locator('#menu-principal a').count(), 5);
    }
    console.log('PASS content and navigation without JavaScript');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

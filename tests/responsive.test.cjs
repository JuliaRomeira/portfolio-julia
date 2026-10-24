const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const shots = process.env.PORTFOLIO_SHOTS;
(async () => {
  const browser = await chromium.launch({channel:'msedge'});
  try {
    const page = await browser.newPage({reducedMotion:'reduce'});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const width of [320,360,390,540,700,768,820,1024,1280,1440,1920]) {
      await page.setViewportSize({width,height:900});
      await page.goto('http://127.0.0.1:4173/index.html#inicio');
      await page.evaluate(() => document.fonts.ready);
      await page.locator('details').evaluateAll(es => es.forEach(e => e.open = true));
      const overflow = await page.evaluate(() => {
        const issues = [];
        for (const el of document.querySelectorAll('main *, header a, footer a')) {
          if (el.closest('.faixa-cinetica, .somente-leitor') || !el.checkVisibility()) continue;
          if (['SCRIPT','STYLE','IFRAME'].includes(el.tagName)) continue;
          const r = el.getBoundingClientRect();
          if (r.width && (r.left < -1 || r.right > innerWidth+1)) issues.push(el.tagName+'.'+el.className);
        }
        return [...new Set(issues)];
      });
      assert.deepEqual(overflow, [], 'Offscreen elements at '+width);
      assert.ok(await page.locator('.notebook').evaluate(e => e.getBoundingClientRect().width <= 901));
      for (const id of ['inicio','projetos','experiencia','contato']) {
        await page.locator('#menu-principal a[href="#'+id+'"]').click();
        await page.waitForFunction(id => document.querySelector('#menu-principal [aria-current]')?.hash === '#'+id, id);
        assert.ok(await page.locator('#'+id).evaluate(e => e.getBoundingClientRect().top >= 0));
      }
      if (shots && [390,768,1440].includes(width)) {
        await page.locator('.galeria-abertura').screenshot({path:shots+'/gallery-'+width+'.png'});
        await page.locator('.projeto-mira').screenshot({path:shots+'/mira-'+width+'.png'});
      }
      console.log('PASS viewport '+width);
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode=1;});

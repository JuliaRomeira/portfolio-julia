const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  try {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:4173/#inicio');
    await page.locator('.faixa-pronta').first().waitFor();
    for (const width of [320, 390, 768, 1440, 1920, 3440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.waitForFunction(() => [...document.querySelectorAll('.faixa-trilho')].every(t =>
        Math.abs(parseFloat(t.style.getPropertyValue('--faixa-passo')) - parseFloat(getComputedStyle(t.firstElementChild).width)) < .1 &&
        t.children.length === Math.ceil(t.parentElement.clientWidth / parseFloat(getComputedStyle(t.firstElementChild).width)) + 1
      ));
      const coverage = await page.locator('.faixa-trilho').evaluateAll(tracks => tracks.map(track => {
        const step = parseFloat(track.style.getPropertyValue('--faixa-passo'));
        const animation = track.getAnimations()[0];
        const duration = animation.effect.getTiming().duration;
        animation.pause();
        return [0, .25, .5, .75, .9999, 1].every(progress => {
          animation.currentTime = duration * progress;
          const offset = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
          return offset <= .1 && track.offsetWidth + offset >= track.parentElement.clientWidth - 1;
        }) && Math.abs(step - parseFloat(getComputedStyle(track.firstElementChild).width)) < .1;
      }));
      assert.ok(coverage.every(Boolean), 'Loop coverage at ' + width);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of ['/', '/projetos.html']) {
      await page.goto('http://127.0.0.1:4173' + path + '#leve-mp4');
      await page.locator('.smartphone').hover();
      const cameraVisible = await page.locator('.smartphone-ilha').evaluate(e => {
        const style = getComputedStyle(e);
        const rect = e.getBoundingClientRect();
        const phone = e.parentElement.getBoundingClientRect();
        const centered = Math.abs((rect.left + rect.width / 2) - (phone.left + phone.width / 2)) < .5;
        return style.visibility === 'visible' && style.opacity === '1' && Number(style.zIndex) >= 2 && rect.width >= 90 && rect.height >= 24 && centered;
      });
      assert.equal(cameraVisible, true, 'Leve camera remains visible and centered on hover');
      await page.locator('.notebook').hover();
      await page.waitForTimeout(220);
      assert.equal(await page.locator('.notebook-tela').evaluate(e => getComputedStyle(e).borderTopColor), 'rgb(215, 189, 129)');
      await page.mouse.move(0, 0);
      await page.locator('.notebook').focus();
      assert.equal(await page.locator('.notebook-tela').evaluate(e => getComputedStyle(e).borderTopColor), 'rgb(215, 189, 129)');
      assert.equal(await page.locator('.faixa-trilho').evaluateAll(es => es.every(e => getComputedStyle(e).animationName === 'none')), true);
    }
    console.log('PASS continuous loops; Leve camera hover; Mira gold hover/focus; reduced motion');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

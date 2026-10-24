const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
(async () => {
  const browser = await chromium.launch({channel: 'msedge', headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:900}});
    await page.goto(base);
    await page.locator('.abertura').waitFor();
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.abertura').count(),0);
    assert.equal(await page.locator(':focus').innerText(),'Pular para o conteúdo');
    await page.waitForFunction(() => document.documentElement.classList.contains('hero-visivel'));
    const initial = await page.locator('.nome-letras').first().evaluate(e => getComputedStyle(e).backgroundPosition);
    await page.waitForFunction(position => getComputedStyle(document.querySelector('.nome-letras')).backgroundPosition !== position, initial);
    await page.goto(base + '/projetos.html');
    assert.equal(await page.locator('.abertura').count(),0);
    await page.locator('#leve-mp4').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1300);
    assert.equal(await page.locator('#titulo-leve').evaluate(e=>getComputedStyle(e).opacity),'1');
    assert.equal(await page.locator('#titulo-leve').evaluate(e=>getComputedStyle(e,'::after').content),'none');
    await page.locator('#base-conhecimento .botao').focus();
    assert.equal(await page.locator('#base-conhecimento .projeto-apoio').evaluate(e=>e.classList.contains('revelar-pendente')),false);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(() => !document.querySelector('.revelar-pendente'));
    assert.equal(await page.locator('.revelar-pendente').count(),0);
    await page.goto(base);
    assert.equal(await page.locator('.abertura').count(),0);
    assert.equal(await page.locator('.nome-letras').first().evaluate(e=>getComputedStyle(e).animationName),'none');
    console.log('PASS opening, keyboard, name motion, project reveals and reduced motion');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

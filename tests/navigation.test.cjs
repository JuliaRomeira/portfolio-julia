const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
for(const name of ['index','projetos','experiencia','contato']) {
  const html=fs.readFileSync(path.join(__dirname,'..',name+'.html'),'utf8');
  const nav=html.match(/<nav id="menu-principal"[\s\S]*?<\/nav>/)[0];
  for(const destination of ['index','projetos','experiencia','contato']) assert.ok(nav.includes('href="'+(name==='index'?'#'+(destination==='index'?'inicio':destination):destination+'.html')+'"'));
  assert.equal((nav.match(/aria-current="(?:page|location)"/g)||[]).length,1);
  const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(canonical,'https://portfolio-julia-nine.vercel.app/'+(name==='index'?'':name+'.html'));
}
console.log('PASS static page navigation and canonical URLs');

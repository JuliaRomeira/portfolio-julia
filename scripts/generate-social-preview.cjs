// Requires sharp and Manrope installed locally (the WOFF2 is in assets/fonts).
const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
 const photo = await sharp(path.join(__dirname,'../assets/julia-romeira.jpg')).resize(320,350,{fit:'cover'}).grayscale().jpeg({quality:95}).toBuffer();
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
 <defs><radialGradient id="glow"><stop stop-color="#9b6cff" stop-opacity=".2"/><stop offset="1" stop-color="#07070a" stop-opacity="0"/></radialGradient><radialGradient id="halo"><stop stop-color="#527dff" stop-opacity=".26"/><stop offset="1" stop-color="#07070a" stop-opacity="0"/></radialGradient><linearGradient id="name"><stop stop-color="#f3f3f1"/><stop offset=".6" stop-color="#eee1f0"/><stop offset="1" stop-color="#bba2da"/></linearGradient></defs>
 <rect width="1200" height="630" fill="#07070a"/><ellipse cx="340" cy="80" rx="520" ry="370" fill="url(#glow)"/><ellipse cx="930" cy="360" rx="380" ry="300" fill="url(#halo)"/>
 <g font-family="Manrope, sans-serif"><text x="56" y="67" font-size="23" font-weight="800" fill="#f3f3f1">JR /</text><text x="1144" y="65" text-anchor="end" font-size="14" letter-spacing="2" fill="#a8a8ac">PORTFÓLIO · DESENVOLVIMENTO DE SOFTWARE</text>
 <path d="M56 86H1144M56 532H1144" stroke="#ffffff" stroke-opacity=".16"/>
 <text x="56" y="154" fill="#d7bd81" font-size="17" letter-spacing="2">OLÁ, SOU A JÚLIA.</text>
 <text x="48" y="274" font-size="111" font-weight="800" letter-spacing="-6" fill="#f3f3f1">JÚLIA</text><text x="48" y="386" font-size="111" font-weight="800" letter-spacing="-6" fill="url(#name)">ROMERA</text>
 <circle cx="650" cy="235" r="33" stroke="#d7bd81" stroke-opacity=".5" fill="none"/><path d="M638 247L662 223M638 223H662V247" stroke="#d7bd81" stroke-width="2" fill="none"/>
 <text x="56" y="452" font-size="21" fill="#a8a8ac">Disciplina hoje.</text><text x="56" y="484" font-size="21" fill="#f3f3f1">Soluções amanhã.</text>
 <image x="824" y="128" width="320" height="350" xlink:href="data:image/jpeg;base64,${photo.toString('base64')}"/><rect x="824" y="128" width="320" height="350" stroke="#ffffff" stroke-opacity=".2" fill="none"/>
 <text x="56" y="576" font-size="17" font-weight="500" fill="#f3f3f1">Projetos que partem de problemas reais.</text><text x="1144" y="576" text-anchor="end" font-size="17" fill="#d7bd81">Conheça meu trabalho ↗</text></g></svg>`;
 await sharp(Buffer.from(svg)).jpeg({quality:90}).toFile(path.join(__dirname,'../assets/social-preview-20261026.jpg'));
})();

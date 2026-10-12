const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const ids = ["inicio", "projetos", "experiencia", "contato"];
const tops = [150, 900, 3600, 4800];
const links = ids.map((id) => ({
  attributes: { href: `#${id}` },
  getAttribute(name) { return this.attributes[name]; },
  setAttribute(name, value) { this.attributes[name] = value; },
  removeAttribute(name) { delete this.attributes[name]; },
}));
const context = {
  scrollY: 0,
  innerHeight: 1785,
  getComputedStyle: () => ({ scrollMarginTop: "88px" }),
  solicitarAtualizacao() {},
  window: { addEventListener() {} },
  document: {
    documentElement: { scrollHeight: 5300 },
    querySelectorAll: () => links,
    querySelector(selector) {
      if (selector === ".cabecalho") return { getBoundingClientRect: () => ({ bottom: 64 }) };
      const index = ids.indexOf(selector.slice(1));
      return { id: ids[index], getBoundingClientRect: () => ({ top: tops[index] - context.scrollY }) };
    },
  },
};
vm.createContext(context);
const source = fs.readFileSync(path.join(__dirname, "../script.js"), "utf8");
vm.runInContext(source.slice(source.indexOf("const linksNavegacao")), context);

function check(y, expected, height = 1785) {
  context.scrollY = y;
  context.innerHeight = height;
  vm.runInContext("atualizarNavegacao()", context);
  assert.deepEqual(links.filter((link) => link.attributes["aria-current"])
    .map((link) => link.attributes.href), [`#${expected}`]);
}

check(0, "inicio");
check(750, "inicio"); // A próxima seção já aparece, mas ainda não foi alcançada.
check(812, "projetos"); // Destino da âncora com scroll-margin-top.
check(2500, "projetos"); // Os outros projetos mantêm a mesma opção ativa.
check(3512, "experiencia", 844);
check(3515, "contato"); // Tela alta: contato não consegue alcançar o cabeçalho.
check(4712, "contato", 500);
check(812, "projetos", 844); // Rolagem de volta.
check(0, "inicio", 844);
console.log("PASS: início, projetos, experiência, contato, âncoras e retorno em telas altas e baixas");

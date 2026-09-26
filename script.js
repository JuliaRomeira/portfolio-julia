const notebook = document.querySelector("[data-notebook]");
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
const smartphone = document.querySelector(".smartphone");
const palcoSmartphone = document.querySelector(".smartphone-stage");
const telaPequena = window.matchMedia("(max-width: 760px)");

// A posição do palco é estável: o movimento do telefone não altera o cálculo.
function atualizarSmartphone() {
  if (!smartphone || !palcoSmartphone) return;
  if (reduzMovimento.matches) {
    smartphone.style.removeProperty("transform");
    return;
  }
  const topo = palcoSmartphone.getBoundingClientRect().top;
  const progresso = limitar((innerHeight * 0.95 - topo) / (innerHeight * 0.65), 0, 1);
  const restante = 1 - progresso;
  const distancia = telaPequena.matches ? 16 : 32;
  const angulo = telaPequena.matches ? 0 : -3;
  smartphone.style.transform = `translateY(${restante * distancia}px) rotate(${restante * angulo}deg)`;
}

function limitar(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

function atualizarNotebook() {
  if (!notebook || reduzMovimento.matches) return;

  const posicao = notebook.getBoundingClientRect();
  const inicio = window.innerHeight * 0.92;
  const fim = window.innerHeight * 0.36;
  const progresso = limitar((inicio - posicao.top) / (inicio - fim), 0, 1);

  const angulo = -72 + progresso * 72;
  const escala = 0.92 + progresso * 0.08;
  const opacidade = 0.15 + progresso * 0.85;

  notebook.style.setProperty("--angulo-tela", `${angulo}deg`);
  notebook.style.setProperty("--escala-tela", escala);
  notebook.style.setProperty("--opacidade-interface", opacidade);
}

let atualizacaoPendente = false;

function solicitarAtualizacao() {
  if (atualizacaoPendente) return;

  atualizacaoPendente = true;
  requestAnimationFrame(() => {
    atualizarNotebook();
    atualizarSmartphone();
    atualizacaoPendente = false;
  });
}

window.addEventListener("scroll", solicitarAtualizacao, { passive: true });
window.addEventListener("resize", solicitarAtualizacao);
atualizarNotebook();
atualizarSmartphone();

// Revelar cada bloco evita esperar que uma seção inteira caiba na tela do celular.
const elementosParaRevelar = [];
document.querySelectorAll("[data-reveal]").forEach((grupo) => {
  const dividir = grupo.matches(".case-grid, .stack-grid, .projeto-conteudo, .base-intro, .experiencia-grid, .stack-titulo");
  elementosParaRevelar.push(...(dividir ? grupo.children : [grupo]));
});

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.remove("revelacao-pendente");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -32px 0px" }
);

elementosParaRevelar.forEach((elemento) => {
  elemento.classList.add("revelacao");
  if (!reduzMovimento.matches && elemento.getBoundingClientRect().top >= innerHeight) {
    elemento.classList.add("revelacao-pendente");
    observador.observe(elemento);
  }
});

reduzMovimento.addEventListener("change", () => {
  if (reduzMovimento.matches) {
    elementosParaRevelar.forEach((elemento) => elemento.classList.remove("revelacao-pendente"));
    observador.disconnect();
  }
  solicitarAtualizacao();
});

const ano = document.querySelector("[data-year]");
if (ano) ano.textContent = new Date().getFullYear();

const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

botaoMenu?.addEventListener("click", () => {
  const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
  botaoMenu.setAttribute("aria-expanded", String(!aberto));
  menu?.classList.toggle("aberto", !aberto);
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    botaoMenu?.setAttribute("aria-expanded", "false");
    menu.classList.remove("aberto");
  });
});

const notebook = document.querySelector("[data-notebook]");
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

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
    atualizacaoPendente = false;
  });
}

window.addEventListener("scroll", solicitarAtualizacao, { passive: true });
window.addEventListener("resize", solicitarAtualizacao);
atualizarNotebook();

const elementosParaRevelar = document.querySelectorAll("[data-reveal]");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) entrada.target.classList.add("visivel");
    });
  },
  { threshold: 0.18 }
);

elementosParaRevelar.forEach((elemento) => observador.observe(elemento));

const ano = document.querySelector("[data-year]");
if (ano) ano.textContent = new Date().getFullYear();

const ano = document.querySelector("[data-year]");
if (ano) ano.textContent = new Date().getFullYear();

// Repete o conteúdo até cobrir a faixa, inclusive no fim de cada volta.
document.fonts.ready.then(() => {
  document.querySelectorAll(".faixa-trilho").forEach((trilho) => {
    const original = trilho.firstElementChild;
    function ajustarFaixa() {
      const passo = parseFloat(getComputedStyle(original).width);
      if (!passo) return;
      const quantidade = Math.ceil(trilho.parentElement.clientWidth / passo) + 1;
      while (trilho.children.length > quantidade) trilho.lastElementChild.remove();
      while (trilho.children.length < quantidade) trilho.append(original.cloneNode(true));
      trilho.style.setProperty("--faixa-passo", passo + "px");
      trilho.classList.add("faixa-pronta");
    }
    ajustarFaixa();
    new ResizeObserver(ajustarFaixa).observe(trilho.parentElement);
  });
});

// O conteúdo permanece visível sem JavaScript ou com movimento reduzido.
function iniciarMovimento() {
  if (!("IntersectionObserver" in window)) return;
  const preferencia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const raiz = document.documentElement;
  const hero = document.querySelector(".apresentacao");
  const alvos = [...document.querySelectorAll(
    "main h2, .projeto-descricao, .projeto-apoio, .notebook, .smartphone-stage, .base-preview, .cargo, .stack-grid article, .minha-atuacao"
  )];
  let abertura;
  let temporizadorEntrada;
  let temporizadorAbertura;

  const revelar = (elemento) => {
    elemento.classList.remove("revelar-pendente");
    elemento.classList.add("revelado");
  };
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      revelar(entrada.target);
      observador.unobserve(entrada.target);
    });
  }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });
  const observadorHero = new IntersectionObserver(([entrada]) => {
    raiz.classList.toggle("hero-visivel", entrada.isIntersecting);
  });

  function encerrarAbertura() {
    clearTimeout(temporizadorEntrada);
    clearTimeout(temporizadorAbertura);
    abertura?.remove();
    abertura = null;
    raiz.classList.remove("entrada-ativa");
  }

  function configurar(comAbertura = false) {
    observador.disconnect();
    observadorHero.disconnect();
    encerrarAbertura();
    alvos.forEach((alvo) => alvo.classList.remove("revelar-pendente", "revelado"));
    raiz.classList.toggle("movimento-ativo", !preferencia.matches);
    if (preferencia.matches) {
      raiz.classList.remove("hero-visivel");
      return;
    }
    if (hero) observadorHero.observe(hero);
    alvos.forEach((alvo) => {
      if (alvo.getBoundingClientRect().top < innerHeight) return;
      alvo.classList.add("revelar-pendente");
      observador.observe(alvo);
    });
    // Links diretos e posições restauradas não devem passar pela abertura.
    if (!hero || !comAbertura || location.hash || scrollY > 24) return;
    raiz.classList.add("entrada-ativa");
    abertura = document.createElement("div");
    abertura.className = "abertura";
    abertura.setAttribute("aria-hidden", "true");
    abertura.innerHTML = `<svg viewBox="0 0 200 150" fill="none" aria-hidden="true">
      <path class="abertura-j" pathLength="1" d="M28 30H80V94C80 130 24 130 24 97" />
      <path class="abertura-r" pathLength="1" d="M108 122V30H137C185 30 185 81 137 81H108M137 81L180 122" />
    </svg>`;
    document.body.append(abertura);
    temporizadorAbertura = setTimeout(() => { abertura?.remove(); abertura = null; }, 1750);
    temporizadorEntrada = setTimeout(() => raiz.classList.remove("entrada-ativa"), 2700);
  }

  // A navegação por teclado e por âncoras tem prioridade sobre a sequência visual.
  document.addEventListener("keydown", encerrarAbertura);
  window.addEventListener("hashchange", encerrarAbertura);
  window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) configurar();
  });
  document.addEventListener("focusin", (evento) => {
    const alvo = evento.target.closest(".revelar-pendente");
    if (alvo) {
      alvo.classList.remove("revelar-pendente");
      observador.unobserve(alvo);
    }
  });
  preferencia.addEventListener("change", () => configurar());
  configurar(true);
}
iniciarMovimento();

// Um brilho acompanha o ponteiro em telas precisas sem interferir em toque ou teclado.
function iniciarGlowInterativo() {
  const glow = document.querySelector(".cursor-orbita");
  const ponteiroPreciso = window.matchMedia("(hover: hover) and (pointer: fine)");
  const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!glow || !ponteiroPreciso.matches || movimentoReduzido.matches) return;

  window.addEventListener("pointermove", (evento) => {
    glow.style.setProperty("--cursor-x", `${evento.clientX}px`);
    glow.style.setProperty("--cursor-y", `${evento.clientY}px`);
    glow.classList.add("cursor-visivel");
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => glow.classList.remove("cursor-visivel"));
}
iniciarGlowInterativo();


const copiarEmail = document.querySelector(".copiar-email");
if (copiarEmail && navigator.clipboard) {
  copiarEmail.hidden = false;
  copiarEmail.addEventListener("click", async () => {
    const aviso = document.querySelector(".aviso-copia");
    try {
      await navigator.clipboard.writeText("juliaromeralage@gmail.com");
      aviso.textContent = "E-mail copiado!";
    } catch {
      aviso.textContent = "Selecione o endereço acima para copiar.";
    }
  });
}
// O menu acompanha a seção sem interceptar a rolagem nativa.
if (document.body.classList.contains("pagina-inicio")) {
  const links = [...document.querySelectorAll('#menu-principal a[href^="#"]')];
  const secoes = links.map(link => document.querySelector(link.getAttribute("href")));
  let agendado = false;
  function atualizarSecao() {
    let atual = 0;
    secoes.forEach((secao, indice) => {
      if (secao.getBoundingClientRect().top <= innerHeight * .35) atual = indice;
    });
    links.forEach((link, indice) => {
      if (indice === atual) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    agendado = false;
  }
  addEventListener("scroll", () => {
    if (!agendado) { agendado = true; requestAnimationFrame(atualizarSecao); }
  }, { passive: true });
  addEventListener("resize", atualizarSecao);
  atualizarSecao();
}

# Direção visual — glow editorial em movimento

## Referências observadas

- Visual: https://www.behance.net/gallery/151731033/Portfolio-CV
- Movimento: https://www.syahrilarfianalmazril.my.id/
- Capturas analisadas em desktop, 1440 × 900, em 24 de outubro de 2026.

A referência do Behance combina título editorial de grande escala, muito espaço negativo, textura granulada e uma mancha difusa rosa/lilás/azul. O portfólio animado trabalha com tipografia monumental, pequenos blocos informativos, abertura desenhada, faixas contínuas, entradas por rolagem e respostas de hover.

## Adaptação para o portfólio da Júlia

A implementação mantém a base escura, o dourado editorial e toda a informação profissional. O glow foi acrescentado como profundidade, não como decoração dominante:

- fundo `#07070a`, texto `#f3f3f1` e dourado `#d7bd81`;
- rosa `#ff4fa3`, lilás `#9b6cff` e azul `#527dff` usados somente em luz, reflexo e movimento;
- auroras desfocadas no hero e halo discreto na fotografia;
- gradiente luminoso em movimento no nome;
- duas faixas diagonais contínuas com tecnologias e áreas reais do portfólio;
- brilho reativo ao cursor apenas em dispositivos com ponteiro preciso;
- previews de projetos com sombras cromáticas sutis.

## Movimento e acessibilidade

- A abertura “JR”, as revelações por rolagem e as pausas fora de tela continuam preservadas.
- As faixas usam movimento linear lento e em direções opostas.
- O glow do cursor não captura eventos e não aparece em toque ou teclado.
- Com `prefers-reduced-motion: reduce`, animações, transições, faixa e cursor são desativados; o conteúdo permanece visível.
- O efeito não altera ordem de leitura, links, foco, contraste estrutural nem conteúdo sem JavaScript.

## Páginas com composições próprias

A página inicial reúne início, projetos, experiência e contato em rolagem contínua, com o menu como atalho e indicador da seção atual. As composições distintas foram preservadas, sem painéis sobrepostos ou captura da rolagem. Os documentos separados continuam disponíveis para links existentes.

- Início: hero aprovado com glow e faixas cinéticas, seguido pelo conteúdo completo das três seções.
- Projetos: galeria assimétrica com links para os três cases completos e suas demonstrações.
- Experiência: abertura tipográfica, percurso visual, histórico profissional existente e tecnologias. Sem inventar datas ou novos cargos.
- Contato: cartão com retrato e currículo, e-mail com cópia e canais de conexão.
- Transições de página por dissolução nos navegadores compatíveis; navegação HTML normal nos demais e sem JavaScript. Movimento reduzido desativa animações.

Referências adicionais inspecionadas no navegador: /projects, /experience e /contact em https://www.syahrilarfianalmazril.my.id/. A referência de projetos usa galeria; experiência usa título monumental e linha do tempo; contato usa composição livre e conexões. As implementações locais são adaptações ao conteúdo da Júlia.

## Limites de fidelidade

As referências orientam composição, luz e ritmo. Tipografia, cores, textos e estrutura foram adaptados à identidade e ao conteúdo da Júlia; não há cópia de componentes, assets ou código das páginas de referência.

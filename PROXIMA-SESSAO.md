# Continuidade do portfólio

## Ponto de parada aprovado

Júlia aprovou manter esta versão por enquanto e quer retomar os refinamentos em outra sessão. Ressalva posterior: ela não gostou do menu atual e pediu explicitamente para revisá-lo na próxima sessão. Os demais pontos abaixo são sugestões para revisão, não autorização para refazer o site automaticamente.

## Preservar na retomada

- Foto à direita do texto no desktop e abaixo da apresentação no celular, com bordas suavizadas. Esta foi a última posição aprovada.
- Fundo escuro, título com tipografia serifada e detalhe dourado discreto.
- Bolinha acompanhando o cursor no hero. O menu compacto centralizado não está aprovado e deve ser revisto.
- Faixa com os três atalhos de projetos: foi explicitamente elogiada pela Júlia.
- Conteúdo factual dos projetos e da experiência profissional.
- Contato compacto, sem o grande espaço vazio antes do rodapé.

## O que foi ajustado

- Animações de entrada voltam a disparar ao percorrer novamente a página.
- Projetos, experiência, tecnologias e contato receberam tipografia e espaçamentos mais consistentes.
- Detalhes dos cases ficam nas áreas expansíveis “Por dentro”; a seção “Minha atuação” permanece visível.
- Tecnologias organizadas em linhas, com adaptação para uma coluna no celular.
- Referência visual utilizada: https://www.avivashishta.com/. A implementação é uma adaptação ao conteúdo e à identidade da Júlia, não uma cópia exata.

## Próxima sessão: pontos a avaliar com Júlia

**Prioridade confirmada: reformular o menu.** Júlia disse: “mexermos no menu não gostei assim”. Rever aparência, disposição e interação no desktop e no celular. A alternativa ainda não foi definida; não tratar o formato atual como uma preferência aprovada. Neste momento, apenas registrar a pendência, sem alterar o menu.

*Prioridade confirmada 2: Júlia quer mudar o estilo de apresentação dos projetos, ela está pensando em colocar somente a descrição e o link de cada projeto, pretende tirar o notebook e celular, confirme se ela realmente que isso e ajuste tudo perfeitamente, como ele pedir.

1. Identificar quais partes ainda incomodam visualmente antes de modificar o que foi aprovado.
2. Revisar a apresentação dos três projetos, incluindo proporção das prévias, espaçamentos e quantidade de informação visível.
3. Avaliar se as áreas expansíveis dos cases facilitam a leitura e se a comparação em vídeo do Leve MP4 está fácil de encontrar.
4. Refinar experiência, tecnologias e contato conforme o feedback, preservando as informações existentes.
5. Revalidar rolagem, cursor, teclado, preferência por movimento reduzido e responsividade após as próximas mudanças.

## Verificações e publicação

- As seções foram verificadas entre 360 e 1440 px, sem rolagem horizontal; os cases foram abertos no navegador e pelo teclado.
- Depois da última mudança de posição da foto, o hero foi conferido em 1440 e 390 px.
- O projeto é HTML/CSS/JavaScript estático: arquivos principais `index.html`, `estilos.css` e `script.js`.
- Repositório: `JuliaRomeira/portfolio-julia`, branch `main`. Conferir o estado atual do Git antes de começar.
- Em 07/10/2026, a versão atual foi publicada diretamente pela CLI na Vercel: https://portfolio-julia-nine.vercel.app. O deploy de produção ficou READY. Não houve push dos commits locais ao GitHub; conferir essa diferença antes de futuros deploys via Git.
- `.vercelignore` mantém esta anotação fora da publicação e exclui arquivos de ambiente e logs.
- O mapa Graphify fica na pasta pai, em `graphify-out/`. Seguir as instruções do `AGENTS.md` da pasta pai.

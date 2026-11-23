# Identidade e manutenção

## Direção visual

A referência principal é o terminal de Alien: Isolation: uma interface de trabalho que parece existir dentro de uma nave. Matrix contribui com a cor e a linguagem de caracteres; Cyberpunk e BioShock Infinite aparecem como referências pessoais no texto. A interface utiliza elementos próprios em CSS.

- **Preto esverdeado:** fundo e superfícies com pequenas diferenças de luminosidade.
- **Verde fósforo:** títulos, ações e o sinal ASCII.
- **Âmbar:** destaque secundário, cargo e disponibilidade na área de contato.
- **IBM Plex Mono:** texto corrido e controles. **VT323:** nome e títulos com caráter de terminal. Ambas têm fallbacks monoespaçados locais.
- **Molduras e linhas finas:** hierarquia e separação entre informações.
- **CRT discreto:** linhas e ruído estáticos, sem flashes nem tremulação da página inteira.

Os tokens estão no início de `src/styles/theme.css`. Os estilos seguem a ordem da página e terminam com ajustes para tablet e celular. O layout não exige seções com altura de tela nem força o scroll a encaixar em pontos fixos.

## Progressão do conteúdo

1. **Início:** nome, especialidade, apresentação, currículo, projetos e disponibilidade.
2. **Trajetória:** contexto pessoal, formação, experiências e tecnologias.
3. **Projetos:** dois projetos concretos com imagens e detalhes. O GitHub aparece como acesso aos demais trabalhos.
4. **Contato:** disponibilidade, canais diretos e formulário.

As âncoras originais `#sobre`, `#resumo`, `#projetos` e `#contato` foram preservadas. Os links são nativos: funcionam com URL, histórico, teclado e abertura em nova aba. O observador da navegação é criado uma vez e acompanha a passagem das seções.

O deslocamento das âncoras é definido apenas pelo `scroll-padding-top` da página. O cabeçalho atualiza `--header-height` com sua altura real por meio de um `ResizeObserver`, acompanhando mudanças de largura, fontes e zoom. As seções não adicionam outra margem de rolagem, para não deixar o final da seção anterior visível. A área de contato ocupa pelo menos a altura disponível da tela, permitindo seu alinhamento mesmo em janelas altas.

## ASCII e movimento

`AsciiVideo.tsx` utiliza o WebM original, desenha um frame reduzido em um canvas oculto e transforma a luminância em caracteres. A conversão está isolada em `src/lib/ascii.ts` e é testada sem depender de vídeo ou canvas reais.

- A saída utiliza 80 colunas e no máximo oito conversões por segundo.
- O vídeo e o processamento pausam quando saem da área observada ou quando a aba fica oculta.
- Os callbacks, eventos e observadores são limpos ao desmontar o componente.
- O controle **FX** pausa a animação, remove as texturas e interrompe o cursor animado.
- A escolha é salva no navegador em `portfolio:effects`, quando o armazenamento está disponível.
- A preferência do sistema por movimento reduzido prevalece sobre uma escolha anterior de efeitos ligados.
- Um sinal ASCII estático permanece visível antes do carregamento, sem animação ou quando o vídeo não pode ser reproduzido.
- O conteúdo ASCII é decorativo e fica oculto das tecnologias assistivas; a apresentação profissional permanece em texto normal.

As fontes vêm do Google Fonts; se elas não carregarem, o site utiliza as fontes locais.

## Acessibilidade e interações

Há um título principal em HTML, hierarquia de subtítulos, atalho para pular a navegação, contorno de foco, campos com rótulos e erros associados aos respectivos campos. A cor não é o único indicador de erro: há mensagens textuais e `aria-invalid`.

Os detalhes dos projetos utilizam `<dialog>.showModal()`. O navegador administra o foco e torna o fundo inerte. O componente trata Escape e clique no fundo, bloqueia a rolagem da página e devolve o foco ao controle que abriu o projeto. Links para sites externos têm `rel="noopener noreferrer"`.

O formulário mantém os dados quando ocorre uma falha. A mensagem de confirmação depende de uma resposta HTTP bem-sucedida do endpoint.

## Adicionar ou atualizar projetos

1. Adicione a imagem em `public/assets/projects/` com tamanho adequado para a web.
2. Crie uma entrada em `src/data/projects.ts` com `id` único e estável.
3. Descreva problema, solução, tecnologias e funcionalidades reais. Use parágrafos no array `longDescription`.
4. Use `demo` para a aplicação e `repo` apenas para o repositório de código. Omita links que ainda não existem; a interface só mostra as ações disponíveis.
5. Monte os caminhos das imagens com `import.meta.env.BASE_URL`.
6. Execute `npm run check` e confira a imagem e os detalhes no navegador.

## Verificação manual

Antes de publicar uma alteração visual, confira:

- Larguras de 320, 375, 768 e 1440 pixels, sem conteúdo cortado nem rolagem horizontal.
- Zoom de 200%, legibilidade e navegação por teclado.
- Links das seções, acesso direto por âncora e indicação da seção atual.
- Abertura dos projetos, Tab e Shift+Tab dentro do diálogo, Escape e retorno do foco.
- FX ligado/desligado, recarregamento com preferência salva e movimento reduzido ativado no sistema.
- Pausa do vídeo fora da seção e com a aba em segundo plano; fallback caso o WebM falhe.
- Formulário vazio, resposta de erro e mensagem preservada. Use um endpoint de teste para conferir entrega real.
- Downloads do currículo, links externos e caminhos servidos a partir de `/sitepessoal/`.

Testes de DOM e build não substituem essa verificação visual, a reprodução real do vídeo ou a confirmação de entrega do formulário.

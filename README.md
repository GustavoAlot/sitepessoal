# GF / TERMINAL_

Portfólio pessoal de **Gustavo Fernandez**, desenvolvedor full stack e cientista da computação pela UNIFAL. Uma interface inspirada nos terminais de **Alien: Isolation**, com influência de **Matrix** e de universos retrofuturistas.

O vídeo convertido em ASCII faz parte da identidade do projeto. Verde fósforo, detalhes em âmbar, tipografia de terminal e textura CRT dão contexto ao conteúdo sem bloquear a navegação.

A interface está disponível em **português e inglês**, com português como padrão. O seletor PT/EN fica no cabeçalho; a escolha dos currículos em PDF é independente do idioma da página.

## Executar localmente

Use **Node.js 24.15 ou superior na linha 24 LTS** e **npm 11 ou superior**. A versão do Node está em `.nvmrc`, os requisitos estão em `package.json` e o gerenciador usado no projeto é npm. O ambiente foi verificado com Node 24.18 e npm 11.16.

Confira o ambiente antes de instalar:

```sh
node --version
npm --version
```

Se o Node já estiver nessa faixa, não é necessário instalar outro runtime. As dependências de desenvolvimento e testes são instaladas pelo npm; não é necessário instalar Vite, TypeScript ou Vitest globalmente, nem configurar Docker, banco de dados ou um servidor de API.

```sh
npm ci
npm run dev
```

Abra **http://localhost:5173/sitepessoal/**. Se a porta estiver ocupada, use a URL impressa pelo Vite.

No PowerShell com execução de scripts bloqueada, use `npm.cmd` no lugar de `npm`.

## Comandos

| Comando                | Finalidade                                              |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Desenvolvimento com atualização automática              |
| `npm test`             | Executar os testes uma vez                              |
| `npm run test:watch`   | Testes em modo de desenvolvimento                       |
| `npm run build`        | Verificar TypeScript e gerar `dist/`                    |
| `npm run check`        | Conferir formatação, ESLint, testes e build de produção |
| `npm run lint`         | Executar o ESLint existente                             |
| `npm run format`       | Formatar código e documentação com Prettier             |
| `npm run format:check` | Conferir a formatação sem alterar arquivos              |
| `npm run preview`      | Servir o build de produção localmente                   |
| `npm run deploy`       | Validar, gerar o build e publicar na branch `gh-pages`  |

## Onde editar

| Conteúdo                                     | Arquivo                                                     |
| -------------------------------------------- | ----------------------------------------------------------- |
| Textos da interface e apresentação em PT/EN  | `src/i18n/messages.ts`                                      |
| Contatos, currículos, formação e experiência | `src/data/profile.ts`                                       |
| Descrições, tecnologias e links dos projetos | `src/data/projects.ts`                                      |
| Identificadores estáveis das seções          | `src/data/navigation.ts`                                    |
| Cores, componentes visuais e responsividade  | `src/styles/theme.css`                                      |
| Reset, fontes e estilos globais              | `src/index.css`                                             |
| Título, descrição e metadados sociais        | `index.html`                                                |
| Currículo em português                       | `public/assets/resumes/Gustavo_Fernandez_Full_Stack.pdf`    |
| Currículo em inglês                          | `public/assets/resumes/Gustavo_Fernandez_Full_Stack_EN.pdf` |
| Capturas dos projetos                        | `public/assets/projects/`                                   |
| Vídeo original usado no ASCII                | `src/assets/ascii-wave.webm`                                |

Os dados pessoais ficam separados da interface. Ao atualizar emprego ou formação, edite `profile.ts`; apresentação e disponibilidade em cada idioma ficam em `messages.ts`. Revise também os dois PDFs, que são arquivos independentes. O caminho antigo `public/assets/GustavoFernandezPTBR.pdf` foi atualizado para a versão atual em português para preservar downloads por links anteriores.

## Idiomas e currículos

O seletor do cabeçalho troca navegação, conteúdo, projetos, mensagens do formulário e rótulos de acessibilidade. O atributo `lang` do documento, título e metadados descritivos acompanham a escolha. As âncoras permanecem iguais nos dois idiomas para preservar os links existentes.

A primeira visita começa em português, independentemente do idioma do navegador. Uma escolha explícita fica salva em `portfolio:language`; se o armazenamento estiver bloqueado, a troca continua funcionando durante a visita. Não há serviço de tradução nem nova variável de ambiente.

Os controles de currículo no início e no contato oferecem os dois PDFs em qualquer idioma da página. As opções podem ser acessadas por teclado; Escape fecha o seletor e devolve o foco ao botão. Os arquivos fornecidos pelo autor são servidos sem alteração de conteúdo.

## Estrutura e tecnologias

React 19, TypeScript e Vite. Ícones com Lucide e React Icons. CSS sem framework visual e sem dependência de um backend próprio.

```text
src/
  components/   Navegação, ASCII, formulário, projetos e rodapé
  data/         Perfil, trajetória, projetos e navegação
  hooks/        Preferências de efeitos visuais
  i18n/         Dicionários PT/EN e estado do idioma
  lib/          Conversão ASCII e validação do formulário
  sections/     Início, trajetória, projetos e contato
  styles/       Tokens e estilos da interface
tests/          Testes unitários e de interação
docs/           Decisões visuais e guia de manutenção
```

Veja [as decisões do projeto](docs/design.md) para entender a direção visual, o funcionamento do ASCII e as escolhas de acessibilidade.

## Formulário de contato

**Não é necessário criar um `.env` para rodar o site.** A única variável personalizada é `VITE_CONTACT_ENDPOINT`, opcional, para trocar o destino do formulário. Sem ela, o site usa o endpoint Formspree original. Valores vazios também usam o padrão.

Para usar outro endpoint, copie `.env.example` para `.env.local` na raiz do projeto e edite o valor:

```powershell
Copy-Item .env.example .env.local
```

```dotenv
VITE_CONTACT_ENDPOINT=https://formspree.io/f/SEU_FORMULARIO
```

Reinicie o servidor após editar o arquivo. O Vite carrega os arquivos de ambiente automaticamente; não é necessário instalar `dotenv`. O `.env.local` está ignorado pelo Git. No GitHub Pages, a variável precisa estar definida **durante o build**; o site publicado é estático.

Variáveis `VITE_` são públicas no JavaScript entregue ao visitante. Não coloque senhas, tokens ou chaves privadas nelas.

O formulário valida e-mail e mensagem, inclui um campo antispam, impede envios duplicados e encerra a tentativa após 15 segundos. Em falhas, mantém o texto para permitir uma nova tentativa. Os testes simulam a rede e **não enviam mensagens reais**. A entrega de e-mails depende da configuração e da disponibilidade do Formspree; um novo endpoint precisa ser criado e configurado na sua conta do serviço.

O site pode ser desenvolvido localmente sem uma API própria. O envio do formulário e o carregamento das fontes do Google exigem internet; as fontes têm alternativas locais.

## Testes e validação

Vitest, Testing Library e jsdom cobrem conversão de pixels em ASCII, validação, preferências de movimento e armazenamento, abertura e fechamento dos projetos, restauração de foco e estados do formulário. Há também testes de troca e persistência de idioma, metadados, erros traduzidos, seleção independente de currículo e navegação da galeria de projetos.

O jsdom simula o DOM: não reproduz a renderização, o decodificador WebM nem a contenção nativa de foco de um `<dialog>`. Os métodos de abertura e fechamento do diálogo são simulados no setup. Faça também a conferência visual de desktop e celular descrita em [docs/design.md](docs/design.md#verificação-manual).

A integração contínua em `.github/workflows/ci.yml` executa `npm ci` e `npm run check` em pushes para `main`/`master` e em pull requests. Esse fluxo valida formatação, ESLint, testes e build; a publicação continua pelo comando de deploy.

## Versões e atualizações

O `package-lock.json` registra as versões instaladas. Use `npm ci` para reproduzir o ambiente. Ao alterar dependências, use `npm install` e inclua o lockfile na alteração.

React e React DOM devem ser atualizados juntos. O plugin React acompanha a versão principal do Vite. TypeScript permanece na linha 6.0, compatível com a faixa declarada pelo `typescript-eslint` utilizado; a linha 7 ainda está fora dessa faixa. `@types/node` acompanha o Node 24 usado no desenvolvimento.

Para revisar versões e alertas de segurança:

```sh
npm outdated
npm audit
npm run check
```

Requisitos e configuração seguem a [documentação de ambiente do Vite](https://vite.dev/guide/env-and-mode) e os metadados dos pacotes no registro oficial do npm.

## GitHub Pages

O Vite mantém `base: "/sitepessoal/"`, correspondente ao repositório. Arquivos em `public/` usam `import.meta.env.BASE_URL` nos componentes. No HTML, o favicon usa `/favicon.svg`: o Vite acrescenta a base automaticamente no desenvolvimento e no build. Isso evita caminhos duplicados e arquivos quebrados na hospedagem em subdiretório.

Para publicar com sua autenticação Git configurada:

```sh
npm run deploy
```

O `predeploy` executa os testes e o build antes de atualizar a branch `gh-pages`. Nas configurações de Pages do repositório, a origem deve ser a branch `gh-pages`, pasta raiz. Endereço configurado: **https://gustavoalot.github.io/sitepessoal/**.

Se renomear o repositório ou usar domínio próprio, revise `base` em `vite.config.ts` e `homepage` em `package.json`.

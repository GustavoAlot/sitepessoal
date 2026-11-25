import type { Language } from "../i18n/types";

export type ProjectScreenshot = {
  src: string;
  caption: string;
  width: number;
  height: number;
};
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  demo?: string;
  repo?: string;
  tech: string[];
  features: string[];
  longDescription: string[];
  screenshots: ProjectScreenshot[];
  demoNote?: string;
};

export function getProjects(language: Language): Project[] {
  const english = language === "en";
  return [
    {
      id: "alot-of-cash",
      title: "Alot of Cash",
      category: english
        ? "FULL STACK APPLICATION / PERSONAL FINANCE"
        : "APLICAÇÃO FULL STACK / FINANÇAS PESSOAIS",
      description: english
        ? "Monthly planning, card expenses and investments in one place, with Open Finance and Telegram integrations."
        : "Planejamento mensal, despesas de cartão e investimentos em um só lugar, com integrações Open Finance e Telegram.",
      longDescription: english
        ? [
            "A personal finance project that began as a C++ application using text files and evolved into a React and Node.js application. It brings together income, expenses, monthly planning and an investment portfolio with MongoDB persistence.",
            "The API centralizes authentication, authorization, validation, pagination and financial calculations. Pluggy imports bank and card transactions, while a Telegram bot lets the owner record transactions in a conversation. Card expenses are organized by the bill's due month, and invoice payments are excluded from expense totals to avoid double counting.",
            "The investment area includes positions, allocation, portfolio evolution and an operations history. Vitest, Testing Library, Supertest, Playwright and GitHub Actions support validation across the frontend and API.",
          ]
        : [
            "Projeto pessoal de finanças que começou em C++ com arquivos de texto e evoluiu para uma aplicação React e Node.js. Reúne receitas, despesas, planejamento mensal e carteira de investimentos, com persistência em MongoDB.",
            "A API concentra autenticação, autorização, validações, paginação e cálculos financeiros. A Pluggy importa transações bancárias e de cartão, enquanto um bot no Telegram permite ao proprietário registrar movimentações por conversa. As despesas de cartão são organizadas pelo vencimento da fatura, sem contar novamente seus pagamentos como despesa.",
            "A área de investimentos apresenta posições, distribuição, evolução do patrimônio e histórico de operações. Vitest, Testing Library, Supertest, Playwright e GitHub Actions apoiam a validação do frontend e da API.",
          ],
      demoNote: english
        ? "The public portfolio demo uses fictional bank and investment data. Real bank connections and the Telegram bot are reserved for the author's personal environment. Screenshots show test data."
        : "A demonstração pública de portfólio utiliza dados bancários e de investimentos fictícios. Conexões reais e o bot Telegram ficam no ambiente pessoal do autor. Os prints mostram dados de teste.",
      image: `${import.meta.env.BASE_URL}assets/projects/aoc-overview-desktop.jpg`,
      screenshots: [
        {
          src: `${import.meta.env.BASE_URL}assets/projects/aoc-overview-desktop.jpg`,
          caption: english
            ? "Monthly overview with fictional test data."
            : "Visão geral mensal com dados fictícios de teste.",
          width: 1440,
          height: 1000,
        },
        {
          src: `${import.meta.env.BASE_URL}assets/projects/aoc-investments-desktop.jpg`,
          caption: english
            ? "Investment portfolio in sandbox mode."
            : "Carteira de investimentos em modo sandbox.",
          width: 1440,
          height: 1000,
        },
        {
          src: `${import.meta.env.BASE_URL}assets/projects/aoc-overview-mobile.jpg`,
          caption: english
            ? "Monthly overview on mobile, with fictional data."
            : "Visão geral no celular, com dados fictícios.",
          width: 390,
          height: 844,
        },
      ],
      features: english
        ? [
            "Monthly dashboard, categories, filters and server-side pagination",
            "Card expenses organized by the invoice due month",
            "Open Finance through Pluggy, with a public sandbox demo",
            "Investment portfolio, assets and operations history",
            "Personal Telegram bot for recording transactions",
            "Firebase/JWT authentication and automated frontend, API and browser tests",
          ]
        : [
            "Painel mensal, categorias, filtros e paginação no servidor",
            "Despesas de cartão organizadas pelo vencimento da fatura",
            "Open Finance via Pluggy, com sandbox na demonstração pública",
            "Carteira de investimentos, ativos e histórico de operações",
            "Bot Telegram pessoal para registrar movimentações",
            "Autenticação Firebase/JWT e testes de frontend, API e navegador",
          ],
      demo: "https://frontaoc.vercel.app/login",
      repo: "https://github.com/GustavoAlot/AOC_monitoramento_financeiro",
      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Tailwind CSS",
        "Firebase / JWT",
        "Pluggy",
        "grammY",
        "Vitest",
        "Supertest",
        "Playwright",
      ],
    },
    {
      id: "energia-solar",
      title: english ? "Solar Energy Simulator" : "Simulador de Energia Solar",
      category: english
        ? "SPES / SOLAR ENERGY & 3D"
        : "SPES / ENERGIA SOLAR & 3D",
      description: english
        ? "Find out how many panels a home needs or estimate an existing system's output using NASA climate data and an interactive 3D scene."
        : "Descubra quantos painéis uma casa precisa ou estime a produção de um sistema existente, com dados climáticos da NASA e um cenário 3D.",
      longDescription: english
        ? [
            "SPES offers two simulation modes: sizing a system from monthly electricity consumption, or estimating the output of an existing set of panels. Locations can be selected by city search, browser geolocation or manual coordinates.",
            "NASA POWER provides historical solar radiation averages and Open-Meteo handles city geocoding. Results include panel count, installed capacity, average monthly generation, module area and a month-by-month chart. Users can adjust the system performance factor and module area, then download a text summary with sources and assumptions.",
            "The original Three.js scene includes solar panels, grass, the sun and a day/night cycle. Geometry batching and controlled rendering reduce its workload, and the calculator remains available if WebGL fails. Automated tests cover calculations, missing data, caching and API failures.",
          ]
        : [
            "O SPES oferece dois modos de simulação: dimensionar um sistema pelo consumo mensal de energia ou estimar a produção de um conjunto de painéis existente. A localização pode ser informada por busca de cidade, geolocalização do navegador ou coordenadas manuais.",
            "A NASA POWER fornece as médias históricas de irradiação e o Open-Meteo faz a busca de cidades. O resultado inclui quantidade de painéis, potência instalada, geração mensal média, área dos módulos e gráfico mês a mês. É possível ajustar rendimento e área por módulo e baixar um resumo em texto com fontes e hipóteses.",
            "O cenário original em Three.js reúne painéis, grama, sol e um ciclo de dia e noite. O agrupamento de geometrias e o controle da renderização reduzem o trabalho gráfico, e a calculadora continua disponível caso o WebGL falhe. Testes automatizados cobrem cálculos, dados ausentes, cache e falhas das APIs.",
          ],
      image: `${import.meta.env.BASE_URL}assets/projects/spes-home-desktop.jpg`,
      screenshots: [
        {
          src: `${import.meta.env.BASE_URL}assets/projects/spes-home-desktop.jpg`,
          caption: english
            ? "SPES homepage with the original 3D solar scene."
            : "Página inicial do SPES com o cenário solar 3D original.",
          width: 1440,
          height: 1000,
        },
        {
          src: `${import.meta.env.BASE_URL}assets/projects/spes-calculator-desktop.jpg`,
          caption: english
            ? "Solar calculator with system sizing and generation estimates."
            : "Calculadora solar com dimensionamento e estimativa de geração.",
          width: 1440,
          height: 1000,
        },
        {
          src: `${import.meta.env.BASE_URL}assets/projects/spes-home-mobile.jpg`,
          caption: english
            ? "SPES homepage on mobile."
            : "Página inicial do SPES no celular.",
          width: 390,
          height: 844,
        },
      ],
      features: english
        ? [
            "System sizing by consumption or output estimation by panel count",
            "City search, GPS and manual coordinates",
            "NASA POWER climatology and Open-Meteo geocoding",
            "Monthly generation chart and downloadable simulation summary",
            "Optimized 3D scene with pause and reduced motion support",
            "Calculator fallback without WebGL, plus calculation and API tests",
          ]
        : [
            "Dimensionamento por consumo ou estimativa de produção por painéis",
            "Busca de cidade, GPS e coordenadas manuais",
            "Climatologia NASA POWER e geocodificação Open-Meteo",
            "Gráfico mensal e download do resumo da simulação",
            "Cenário 3D otimizado, com pausa e movimento reduzido",
            "Calculadora disponível sem WebGL e testes de cálculos e APIs",
          ],
      demo: "https://spes-git-main-gustavo-fernandezs-projects-8e993dbf.vercel.app",
      repo: "https://github.com/GustavoAlot/calculadora_energia_solar",
      tech: [
        "React",
        "Three.js",
        "NASA POWER",
        "Open-Meteo",
        "React Three Fiber",
        "Vite",
        "Node.js Test Runner",
      ],
    },
  ];
}

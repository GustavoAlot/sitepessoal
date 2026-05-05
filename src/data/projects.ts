export type Project = {
  title: string;
  description: string;
  image: string;
  demo?: string;
  repo?: string;
  tech?: string[];
  features?: string[];
  longDescription?: string;
};

export const projects: Project[] = [
  {
    title: "Alot Of Cash",
    description: "Site para monitoramento financeiro",
    longDescription: `
      O Alot of Cash é um aplicativo de monitoramento financeiro que centraliza suas movimentações como despesas, receitas e investimentos. Você cadastra transações, categoriza, filtra por período e acompanha a evolução do seu orçamento 
      em tempo real, com visualizações em tabelas e gráficos.

      Os dados são persistidos em um banco NoSQL (MongoDB) com modelagem via Mongoose, garantindo flexibilidade, performance e recuperação 
      segura das informações. No front, a experiência é responsiva e focada em clareza, com componentes React e atualizações fluidas.
        `,

    image: `${import.meta.env.BASE_URL}assets/projects/Projeto1.png`,
    features: [
      "Filtros por período (dia/semana/mês/custom) e por categoria/conta",
      "Dashboards com gráficos e tabelas dinâmicas",
      "CRUD completo de transações: criar, editar, duplicar, excluir",
      "Persistência em MongoDB com Mongoose (NoSQL)",
      "API REST em Node.js com camadas (controllers/services/models)",
      "Autenticação por Firebase",
    ],
    demo: "https://frontaoc.vercel.app/home",
    tech: [
      "React",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "NoSQL",
      "CSS",
      "Firebase",
    ],
  },
  {
    title: "Simulador de Produção de Energia Solar",
    description:
      "Site para calcular a média de produção de energia solar baseado na sua localização.",
    longDescription: `
      Este projeto combina tecnologia 3D e análise energética para criar uma experiência única no navegador. 
      O background do site utiliza Three.js para renderizar luzes e objetos 3D em tempo real, proporcionando 
      um visual imersivo e dinâmico.

      Como conteúdo principal, o usuário tem acesso a uma calculadora interativa: ao informar o número e a potência 
      dos painéis solares, além de sua localização, o sistema estima a geração média de energia solar. Para isso, 
      integra dados de radiação solar fornecidos pela API da NASA, garantindo cálculos baseados em informações reais 
      da sua região.

      O resultado é uma ferramenta que une estética moderna, visualização em tempo real e utilidade prática, 
      oferecendo uma simulação confiável para quem deseja entender o potencial da energia solar em diferentes cenários.
      `,

    image: `${import.meta.env.BASE_URL}assets/projects/Projeto2.png`,
    features: [
      "Background 3D em tempo real com Three.js",
      "Uso da localização do usuário (Geolocation API)",
      "Integração com a NASA POWER API (radiação solar média)",
      "Estimativas diária e mensal de geração (kWh)",
    ],
    demo: "https://exemplo.com/demo2",
    repo: "https://www.simularproducaoenergiasolar.tech",
    tech: ["React", "JS", "CSS", "HTML", "Three.js", "API Externa"],
  },
  {
    title: "Meu GitHub",
    description:
      "Sinta-se à vontade para explorar outros projetos e códigos no meu GitHub! Lá você vai encontrar desde trabalhos acadêmicos e estudos experimentais até projetos em desenvolvimento e algumas informações extras sobre mim.",
    image: `${import.meta.env.BASE_URL}assets/projects/github-logo.png`,
    demo: "https://github.com/GustavoAlot",
    tech: [
      "React",
      "JS",
      "CSS",
      "HTML",
      "Three.js",
      "API Externa",
      "GEE",
      "Python",
      "C",
      "C++",
      "MySql",
      "TS",
      "MongoDB",
    ],
  },
];

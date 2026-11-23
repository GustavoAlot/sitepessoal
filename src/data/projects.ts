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
};

export const projects: Project[] = [
  {
    id: "alot-of-cash",
    title: "Alot of Cash",
    category: "APLICAÇÃO FULL STACK / FINANÇAS",
    description:
      "Um lugar para organizar receitas, despesas e investimentos — e entender para onde seu dinheiro vai.",
    longDescription: [
      "Aplicação de monitoramento financeiro que centraliza receitas, despesas e investimentos. As transações podem ser organizadas por categoria e período, com tabelas e gráficos para acompanhar o orçamento.",
      "A interface utiliza React e a API REST foi desenvolvida em Node.js. Os dados são armazenados em MongoDB com Mongoose, e a autenticação utiliza Firebase.",
    ],
    image: `${import.meta.env.BASE_URL}assets/projects/Projeto1.png`,
    features: [
      "Cadastro, edição, duplicação e exclusão de transações",
      "Filtros por período, categoria e conta",
      "Visualização de dados em gráficos e tabelas",
      "Autenticação com Firebase",
    ],
    demo: "https://frontaoc.vercel.app/home",
    tech: ["React", "JavaScript", "Node.js", "MongoDB", "Mongoose", "Firebase"],
  },
  {
    id: "energia-solar",
    title: "Simulador de Energia Solar",
    category: "EXPERIMENTO WEB / ENERGIA",
    description:
      "Dados de radiação solar e uma experiência em 3D para explorar o potencial energético de cada localização.",
    longDescription: [
      "Calculadora que estima a geração de energia solar a partir da localização, da quantidade de painéis e da potência informada. A integração com a NASA POWER API fornece os dados de radiação solar utilizados na estimativa.",
      "O projeto combina a calculadora com um cenário renderizado em tempo real no navegador com Three.js.",
    ],
    image: `${import.meta.env.BASE_URL}assets/projects/Projeto2.png`,
    features: [
      "Cenário 3D em tempo real com Three.js",
      "Localização pela Geolocation API",
      "Integração com a NASA POWER API",
      "Estimativas de geração diária e mensal em kWh",
    ],
    demo: "https://www.simularproducaoenergiasolar.tech",
    tech: ["React", "JavaScript", "Three.js", "CSS", "NASA POWER API"],
  },
];

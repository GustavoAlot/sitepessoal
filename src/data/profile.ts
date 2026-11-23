export const profile = {
  name: "Gustavo Fernandez",
  role: "Desenvolvedor full stack",
  availability: "Aberto a novas oportunidades",
  email: "gusalot22@gmail.com",
  github: "https://github.com/GustavoAlot",
  whatsapp: "https://wa.me/5567998158212",
  resume: `${import.meta.env.BASE_URL}assets/GustavoFernandezPTBR.pdf`,
  formEndpoint:
    import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
    "https://formspree.io/f/xjkoqjlb",
  introduction:
    "Cientista da Computação pela UNIFAL. Desenvolvo interfaces, APIs e soluções que conectam boas ideias a problemas reais.",
  about:
    "Gosto de entender como as coisas funcionam e de transformar essa curiosidade em código. Entre front-end, back-end e experimentos pessoais, procuro construir experiências que sejam úteis e tenham personalidade.",
  interests:
    "Fora do código, encontro inspiração em universos como Matrix, Cyberpunk, BioShock Infinite e Alien: Isolation. Este terminal é um pouco disso tudo: tecnologia, nostalgia e vontade de criar algo meu.",
};

export const experience = [
  {
    company: "Fator3 Ventures",
    role: "Desenvolvedor Full Stack Jr.",
    period: "Set 2025 — nov 2026",
  },
  {
    company: "Polygon Soluções",
    role: "Estagiário de Desenvolvimento Front-end",
    period: "Abr 2025 — out 2025",
  },
];

export const education = {
  institution: "Universidade Federal de Alfenas",
  course: "Ciência da Computação",
  period: "2021 — 2026",
};

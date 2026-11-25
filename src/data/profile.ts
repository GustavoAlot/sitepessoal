import type { Language } from "../i18n/types";

export const profile = {
  name: "Gustavo Fernandez",
  email: "gusalot22@gmail.com",
  github: "https://github.com/GustavoAlot",
  linkedin: "https://www.linkedin.com/in/gustavo-fernandez-375860235/",
  whatsapp: "https://wa.me/5567998158212",
  resumes: {
    pt: `${import.meta.env.BASE_URL}assets/resumes/Gustavo_Fernandez_Full_Stack.pdf`,
    en: `${import.meta.env.BASE_URL}assets/resumes/Gustavo_Fernandez_Full_Stack_EN.pdf`,
  } satisfies Record<Language, string>,
  formEndpoint:
    import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
    "https://formspree.io/f/xjkoqjlb",
};

export const experience = [
  {
    company: "Fator3 Ventures",
    role: {
      pt: "Desenvolvedor Full Stack Júnior",
      en: "Junior Full Stack Developer",
    },
    period: { pt: "Ago 2025 — nov 2026", en: "Aug 2025 — Nov 2026" },
    summary: {
      pt: "Aplicações de saúde com React/TypeScript, Node.js e Java/Spring Boot. Integrações com IA, processamento assíncrono, AWS e testes.",
      en: "Healthcare applications with React/TypeScript, Node.js and Java/Spring Boot. AI integrations, background processing, AWS and testing.",
    },
  },
  {
    company: "Polygon Solutions",
    role: {
      pt: "Estagiário de Desenvolvimento Frontend",
      en: "Frontend Development Intern",
    },
    period: { pt: "Abr 2025 — ago 2025", en: "Apr 2025 — Aug 2025" },
    summary: {
      pt: "Interfaces e formulários em React para um sistema de gestão de clínica odontológica.",
      en: "React interfaces and forms for a dental clinic management system.",
    },
  },
];

export const education = {
  institution: {
    pt: "Universidade Federal de Alfenas",
    en: "Federal University of Alfenas",
  },
  course: {
    pt: "Bacharelado em Ciência da Computação",
    en: "Bachelor's Degree in Computer Science",
  },
  period: {
    pt: "2021 — dez 2025 · Concluído",
    en: "2021 — Dec 2025 · Completed",
  },
};

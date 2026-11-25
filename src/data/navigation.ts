export const navigation = [
  { id: "sobre" },
  { id: "resumo" },
  { id: "projetos" },
  { id: "contato" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

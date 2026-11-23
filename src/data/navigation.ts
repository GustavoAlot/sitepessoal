export const navigation = [
  { id: "sobre", label: "Início" },
  { id: "resumo", label: "Trajetória" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

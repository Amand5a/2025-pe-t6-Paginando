// Mock de grupos/comunidades de leitura
// Estrutura e identidade alinhadas com os demais mocks em `data/`

export class Grupo {
  constructor({ id, titulo, imagem, descricao, membros, tags = [] }) {
    this.id = id;
    this.titulo = titulo;
    this.imagem = imagem; // pode ser caminho em /public ou import local
    this.descricao = descricao;
    this.membros = membros; // número de membros
    this.tags = tags;
  }
}














// Ícone padrão (em `public/`), caso não exista uma imagem dedicada
const defaultIcon = "/book-open.svg";

export const grupos = [
  new Grupo({
    id: "ficcao-fantasia",
    titulo: "Ficção & Fantasia",
    imagem: defaultIcon,
    descricao:
      "Discussões semanais sobre clássicos e lançamentos de fantasia e ficção científica.",
    membros: 128,
    tags: ["fantasia", "sci‑fi", "clássicos"],
  }),
  new Grupo({
    id: "clube-misterio",
    titulo: "Clube do Mistério",
    imagem: defaultIcon,
    descricao: "Para quem ama thrillers, true crime e reviravoltas imprevisíveis.",
    membros: 86,
    tags: ["thriller", "suspense"],
  }),
  new Grupo({
    id: "nao-ficcao",
    titulo: "Não ficção em foco",
    imagem: defaultIcon,
    descricao: "Debates sobre biografias, negócios, psicologia e história.",
    membros: 74,
    tags: ["biografia", "negócios", "psicologia"],
  }),
  new Grupo({
    id: "poesia",
    titulo: "Versos & Vozes",
    imagem: defaultIcon,
    descricao: "Leituras comentadas de poesia moderna e contemporânea.",
    membros: 41,
    tags: ["poesia", "contemporâneo"],
  }),
  new Grupo({
    id: "clube-classicos",
    titulo: "Clássicos Eternos",
    imagem: defaultIcon,
    descricao: "Clube dedicado a clássicos da literatura mundial, de Austen a Dostoiévski.",
    membros: 52,
    tags: ["clássicos", "século XIX", "romance"],
  }),
  new Grupo({
    id: "negocios-tech",
    titulo: "Negócios & Tech",
    imagem: defaultIcon,
    descricao: "Inovação, gestão e tecnologia: leituras e trocas sobre o futuro do trabalho.",
    membros: 63,
    tags: ["negócios", "tecnologia", "produtividade"],
  }),
];


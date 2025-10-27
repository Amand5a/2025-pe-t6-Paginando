const images = require.context('../assets/images', false, /\.png$/);

function getImage(id) {
  return images(`./${id}.png`);
}

export const books = [
  {
    id: 1,
    title: "A Guerra dos Tronos",
    author: "George R. R. Martin",
    authorId: 1,
    synopsis:
      "Em Westeros, sete reinos disputam o Trono de Ferro em meio a intrigas políticas e ameaças sobrenaturais que emergem do Norte.",
    rating: 4.9,
    genre: "Fantasia",
    image: getImage(1),
    lista: "Ler Mais Tarde",
    favorito: true,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    authorId: 2,
    synopsis:
      "Em um futuro distópico, o Grande Irmão vigia todos os cidadãos e manipula a verdade em um regime totalitário.",
    rating: 4.8,
    genre: "Ficção Científica",
    image: getImage(2),
    lista: "Estudos",
    favorito: true,
  },
  {
    id: 3,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    authorId: 3,
    synopsis:
      "Um piloto encontra um pequeno príncipe que viaja entre planetas, refletindo sobre amor, perda e inocência.",
    rating: 4.7,
    genre: "Clássico",
    image: getImage(3),
    lista: "Me Indicaram",
    favorito: false,
  },
  {
    id: 4,
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    authorId: 4,
    synopsis:
      "A saga da família Buendía na cidade de Macondo mistura realismo mágico, política e destino trágico.",
    rating: 4.9,
    genre: "Realismo Mágico",
    image: getImage(4),
    lista: "Ler Mais Tarde",
    favorito: false,
  },
  {
    id: 5,
    title: "O Homem Invisível",
    author: "H. G. Wells",
    authorId: 5,
    synopsis:
      "Um cientista se torna invisível e enlouquece com o poder e o isolamento causados por sua invenção.",
    rating: 4.6,
    genre: "Ficção Científica",
    image: getImage(5),
    lista: "Me Indicaram",
    favorito: true,
  },
  {
    id: 6,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    authorId: 6,
    synopsis:
      "Elizabeth Bennet enfrenta os preconceitos da sociedade inglesa do século XIX enquanto vive uma história de amor e autodescoberta.",
    rating: 4.8,
    genre: "Romance Clássico",
    image: getImage(6),
    lista: "Estudos", 
    favorito: true
  },
  {
    id: 7,
    title: "O Hobbit",
    author: "J. R. R. Tolkien",
    authorId: 7,
    synopsis:
      "Bilbo Bolseiro embarca em uma aventura épica com anões e um mago para recuperar um tesouro guardado por um dragão.",
    rating: 4.9,
    genre: "Fantasia",
    image: getImage(7),
    lista: "Ler Mais Tarde",
    favorito: false,
  },
  {
    id: 8,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    authorId: 8,
    synopsis:
      "Bentinho narra sua vida e o ciúme por Capitu, levantando dúvidas eternas sobre amor e traição.",
    rating: 4.7,
    genre: "Literatura Brasileira",
    image: getImage(8),
    lista: "Estudos",
    favorito: true,
  },
  {
    id: 9,
    title: "Frankenstein",
    author: "Mary Shelley",
    authorId: 9,
    synopsis:
      "Um cientista cria vida artificial e precisa lidar com as consequências éticas e humanas de sua criação.",
    rating: 4.6,
    genre: "Terror / Ficção Científica",
    image: getImage(9),
    lista: "Me Indicaram",
    favorito: false,
  },
  {
    id: 10,
    title: "O Nome do Vento",
    author: "Patrick Rothfuss",
    authorId: 10,
    synopsis:
      "Kvothe, um lendário mago e músico, conta sua vida marcada por tragédias, aprendizado e magia em um mundo fantástico.",
    rating: 4.8,
    genre: "Fantasia Épica",
    image: getImage(10),
    lista: "Estudos",
    favorito: true,
  },
];

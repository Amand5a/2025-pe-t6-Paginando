# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas
Perfis de usuário
| Perfil Administrador (Admin-Simulado) |
| Descrição | Usuário que realiza ações de gerenciamento do catálogo de forma simulada no frontend, utilizando dados pré-carregados ou apiS PÚBLICAS |
| Necessidades | Testar funcionalidades de adição, remoção ou edição de livros (mock), verificar a organização do acervo e acompanhar como o catálogo é apresentado ao leitor |

| Perfil leitor (User) |
| Descrição | Usuário inal que acessa a biblioteca online para consultar livros e informações disponíveis |
| Necessidade | Buscar livros por título, autor ou categoria, verificar disponibilidade, acessar informações detalhadas das obras e navegar de forma simples e intuitiva |

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR` |
| Leitor | Buscar livros por título, autor ou categoria |Encontrar rapidamente os livros que me interessam |
| Leitor | Verificar a disponibilidade de um livro |Saber se posso lê-lo sem precisar ir à biblioteca |
| Leitor | Visualizar informações detalhadas sobre o livro |Entender melhor o conteúdo antes de decidir lê-lo |
| Leitor | Navegar de forma simples e intuitiva |Ter uma experiência agradável e eficiente na biblioteca |
| Administrador | Adicionar, editar ou remover livros no catálogo | Testa como o acervo será apresentado aos leitores |
| Administrador | Organizar o catálogo por categorias | facilitar a navegação e a
busca pelos livros |
Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

| Busca por livros | O sistema deve permitir que o leitor busque livros por título, autor ou categoria |
| Consulta de disponibilidade e acesso ao livro | O sistema deve permitir que o leitor verifique se um livro está disponível e, quando disponível, abra o arquivo em PDF para leitura online |
| Visualização de informações detalhadas | O sistema deve permitir que o leitor veja detalhes sobre cada livro, como resumo, autor e categoria |
| Navegação intuitiva | O sistema deve oferecer uma navegação simples e clara, garantindo uma experiência agradável para o leitor |
| Gestão de livros simulada (Admin) | O sistema deve permitir que o administrador simulado adicione, edite ou remova livros no catálogo usando dados pré-carregados ou mock |
| Organização do catálogo (Admin) | O sistema deve permitir que o administrador simulado organize os livros por categorias para facilitar a busca do leitor |

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| O sistema deve permitir que o leitor busque livros por título, autor ou categoria--| ALTA |  
|RF-002| O sistema deve permitir que o leitor verifique se um livro está disponível e, quando disponível | MÉDIA | 
|RF-003| O sistema deve permitir que o leitor visualize informações detalhadas sobre cada livro (resumo, autor e categoria) | Alta |
|RF-004| O sistema deve oferecer uma interface de navegação simples e clara| Alta |
|RF-005| O sistema deve permitir que o usuário leia livros disponíveis| Média |
|RF-006| O sistema deve permitir que o usuário favorite livros e crie listas personalizáveis | Média |
|RF-006| O sistema deve lembrar do histórico de acesso, configurações e leituras recentes do usuário | Média |
|RF-006| O sistema deve recomendar livros baseando-se no histórico de leitura do usuário | Média |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-01| O sistema deve ser desenvolvido utilizando tecnologias web frontend (HTML, CSS, JavaScript/React) | Alta | 
|RNF-02| O sistema deve ser responsivo, permitindo acesso em dispositivos móveis e desktops | Alta |
|RNF-03| O tempo de resposta para carregar a página inicial e o catálogo não deve exceder 5 segundos | Alta |
|RNF-04| A interface deve seguir boas práticas de usabilidade, garantindo clareza e facilidade de uso | Alta |
|RNF-05| O sistema deve permitir fácil manutenção e atualização dos dados do catálogo | Média |
|RNF-06| O sistema deve estar em conformidade com padrões de acessibilidade web (como contraste e legibilidade) | Média |
|RNF-07| O projeto deverá utilizar TailwindCSS como framework de estilos para garantir consistência visual e produtividade no frontend | Média |
|RNF-08| O código-fonte deverá ser versionado usando Git e hospedado no GitHub; todo trabalho deve seguir fluxo de versionamento (commits claros, branches para features) | Alta |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

# Testes

Neste projeto serão realizados dois tipos de testes:

- O **Teste de Software**, que utiliza uma abordagem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema da Biblioteca Online.
- O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por usuários do público-alvo (leitores e administrador simulado).

A documentação dos testes é dividida nas seguintes seções:

- [Plano de Testes de Software](#plano-de-testes-de-software)
- [Registro dos Testes de Software](#registro-dos-testes-de-software)
- [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
- [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
- [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
- [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

---

# Teste de Software

Nesta seção são documentados os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais da aplicação de **Biblioteca Online**.

## Requisitos Funcionais considerados

Para fins de plano de teste, serão utilizados os seguintes requisitos funcionais (consolidados a partir das especificações do projeto):

- **RF-001** – O sistema deve permitir que o leitor visualize o histórico de leitura, indicações de leitura, livros mais lidos e acervo.
- **RF-002** – O sistema deve permitir que o leitor pesquise por um livro, autor ou gênero, ou filtra através de parâmetros determinados.
- **RF-003** – O sistema deve permitir que o leitor visualize informações detalhadas sobre cada livro (resumo, autor e categoria).
- **RF-004** – O sistema deve oferecer uma interface de navegação simples e clara.
- **RF-005** – O sistema deve permitir que o usuário leia livros disponíveis (visualização do PDF / leitor embutido).
- **RF-006** – O sistema deve permitir que o usuário favorite livros e crie listas personalizáveis.
- **RF-007** – O sistema deve lembrar do histórico de acesso, configurações e leituras recentes do usuário.
- **RF-008** – O sistema deve recomendar livros baseando-se no histórico de leitura do usuário.

Os requisitos não funcionais **RNF-01 a RNF-08** seguem a numeração definida na documentação de especificações (responsividade, desempenho, acessibilidade, uso de React/Tailwind, etc.).

---

## Plano de Testes de Software

A seguir são descritos os principais Casos de Teste (CT) que verificam os Requisitos Funcionais e Não Funcionais da aplicação.

## Casos de Teste (em ordem dos Requisitos)

---

### CT01 – Visualizar histórico, indicações, mais lidos e acervo

**Caso de Teste** | **CT01 - Visualizar histórico, indicações, mais lidos e acervo**
:--------------: | ------------
**Requisito associado** | RF-001
**Procedimento** | 1) Acessar a página inicial da Biblioteca Online. <br> 2) Autenticar-se ou carregar o estado de um usuário com leituras anteriores. <br> 3) Observar a seção de **Histórico de leitura**. <br> 4) Observar a seção de **Indicações de leitura**. <br> 5) Observar a seção de **Livros mais lidos**. <br> 6) Acessar a visão geral de **acervo** (lista completa / visão de catálogo).
**Resultado esperado** | A tela inicial (ou painel principal) deve exibir: (a) lista com os últimos livros lidos pelo usuário (histórico); (b) bloco com indicações de leitura; (c) bloco com livros mais lidos no sistema; (d) acesso visível ao acervo completo (lista ou link para o catálogo).
**Dados de entrada** | Usuário com histórico de leitura pré-cadastrado; base de livros com informações de popularidade.
**Resultado obtido** | A pagina exibe histórico e livros mais vistos. O botão redireciona ao acervo corretamente. As recomendações da pagina principal não seguem histórico do leitor.

---

### CT02 – Pesquisar por livro, autor ou gênero e filtrar por parâmetros

**Caso de Teste** | **CT02 - Pesquisa e filtros no catálogo**
:--------------: | ------------
**Requisito associado** | RF-002
**Procedimento** | 1) Acessar a página do catálogo de livros. <br> 2) No campo de busca, digitar o nome de um livro existente. <br> 3) Confirmar a pesquisa (Enter ou botão de buscar). <br> 4) Limpar a busca. <br> 5) Digitar o nome de um autor existente e buscar. <br> 6) Limpar a busca. <br> 7) Selecionar um gênero específico em um filtro (ex.: “Fantasia”). <br> 8) Ajustar filtros adicionais (ex.: ano, idioma, disponibilidade) se existirem. <br> 9) Aplicar os filtros.
**Resultado esperado** | A listagem de livros: (a) retorna apenas o livro correspondente ao título pesquisado; (b) retorna apenas livros do autor informado; (c) ao selecionar um gênero e parâmetros, mostra somente livros que atendem aos critérios. Não devem aparecer livros fora dos filtros definidos.
**Dados de entrada** | Termos de busca (título, autor, gênero) e parâmetros de filtro válidos.
**Resultado obtido** | A busca por título, autor e gênero funciona corretamente. Os filtros podem ser aplicados individualmente ou em conjunto.

---

### CT03 – Visualizar informações detalhadas do livro

**Caso de Teste** | **CT03 - Detalhes do livro**
:--------------: | ------------
**Requisito associado** | RF-003
**Procedimento** | 1) Acessar o catálogo de livros. <br> 2) Selecionar um livro da lista (clicando no card ou em “Detalhes”). <br> 3) Acessar a página de detalhes do livro e autor.
**Resultado esperado** | A tela de detalhes deve exibir, no mínimo: **título**, **autor**, **resumo/sinopse**, **categoria/gênero** e demais informações definidas na especificação (ex.: disponibilidade, número de páginas).
**Dados de entrada** | Livro existente no acervo.
**Resultado obtido** | Visualização da sinopse do livro ao clicar em livro, retorno funcional. Informações do autor incluem livros, biografia e premiações.

---

### CT04 – Navegação simples e clara entre as principais seções

**Caso de Teste** | **CT04 - Navegação da interface**
:--------------: | ------------
**Requisito associado** | RF-004
**Procedimento** | 1) Acessar a página inicial da aplicação. <br> 2) Utilizar o menu de navegação para ir: **Início → Acervo → Listas/Favoritos → Voltar para Início**. <br> 3) Em cada transição, verificar se há forma clara de voltar (logo, botão “voltar”, breadcrumb, etc.).
**Resultado esperado** | A navegação entre páginas ocorre sem erros, com rotas funcionando, títulos de página coerentes e elementos de navegação bem identificados. O usuário consegue retornar à página inicial facilmente.
**Dados de entrada** | Ações de clique do usuário em itens de menu e links.
**Resultado obtido** | Ações com resposta rápida e funcional. Leve dificuldade ao retornar para a pagina Home.

---

### CT05 – Ler livros disponíveis (PDF / leitor embutido)

**Caso de Teste** | **CT05 - Leitura de livro em PDF**
:--------------: | ------------
**Requisito associado** | RF-005
**Procedimento** | 1) Acessar o catálogo de livros. <br> 2) Clicar em **“Ler online”**, **“Abrir PDF”** ou botão equivalente. <br> 3) Navegar por algumas páginas do leitor (próximo/anterior, scroll). 4) Alterar Configurações de leitura 5) Atualizar a página. 6) Verificar informações salvas.
**Resultado esperado** | O sistema abre o livro em epub em uma nova aba ou visor embutido. O conteúdo é legível e os controles de navegação dentro do leitor funcionam (próxima página, voltar, zoom, etc.)
**Dados de entrada** | Livro disponível com epub configurado corretamente.
**Resultado obtido** | Livro disponíveis são exibidos corretamente para leitura. Alteração de tema possui problemas ao retornar para tema inicial. Zoom de leitura também apresenta problemas, não sendo possível ajustar tamanho da fonte.

---

### CT06 – Favoritar livro e criar lista personalizada

**Caso de Teste** | **CT06 - Favoritos e listas personalizadas**
:--------------: | ------------
**Requisito associado** | RF-006
**Procedimento** | 1) Acessar o sistema como usuário leitor. <br> 2) Localizar um livro no catálogo. <br> 3) Clicar em **“Favoritar”** (ícone de estrela). <br> 4) Criar uma nova lista personalizada. <br> 5) Adicionar um livro a essa lista. <br> 6) Acessar a seção **“Favoritos / Minhas Listas”**. <br> 7) Verificar se o livro aparece corretamente na lista criada. 8) Editar e excluir lista criada.
**Resultado esperado** | O livro é marcado como favorito e incluído na lista personalizada criada. A lista fica visível na área de listas/favoritos do usuário, com o livro correto associado. Livros Favoritados aparecem em Favoritos. É possível editar e excluir listas, assim como remover itens.
**Dados de entrada** | Livro existente e nome de lista personalizada.
**Resultado obtido** | É possível adicionar livros a listas e favoritos de forma rápida. Livros são visualizados corretamente em favoritos e em listas. É fácil editar e remover listas. Ao criar listas através dos cards o delay torna a experiência inviável.

---

### CT07 – Lembrar histórico de acesso, configurações e leituras recentes

**Caso de Teste** | **CT07 - Persistência de histórico e configurações**
:--------------: | ------------
**Requisito associado** | RF-007
**Procedimento** | 1) Acessar o sistema. <br> 2) Abrir um livro e avançar algumas páginas na leitura. <br> 3) Alterar alguma configuração disponível. <br> 4) Fechar o navegador ou deslogar. <br> 5) Reabrir o sistema e autenticar novamente como o mesmo usuário. <br> 6) Acessar a área de **leituras recentes** e/ou abrir novamente o livro lido. <br> 7) Verificar se as configurações escolhidas permanecem aplicadas.
**Resultado esperado** | (a) O livro aparece na seção de **leituras recentes**; (b) ao retomar o livro, o sistema posiciona o usuário próximo ao ponto onde parou ou indica o progresso; (c) as configurações personalizadas (tema, fonte, etc.) continuam vigentes.
**Dados de entrada** | Usuário com sessão anterior, livro lido parcialmente, configurações ajustadas.
**Resultado obtido** | Histórico preservado com sucesso caso acesso feito através do mesmo navegador. 

---

### CT08 – Recomendações baseadas no histórico de leitura

**Caso de Teste** | **CT08 - Recomendações de leitura**
:--------------: | ------------
**Requisito associado** | RF-008
**Procedimento** | 1) Acessar o sistema como usuário leitor. <br> 2) Ler ou acessar vários livros de um mesmo gênero/categoria (ex.: “Ficção Científica”). <br> 3) Marcar alguns desses livros como favoritos. <br> 4) Voltar à página inicial ou seção de **Expert Reader**. 
**Resultado esperado** | A lista de livros recomendados exibe títulos relacionados ao histórico do usuário (mesmo gênero, autores semelhantes, etc.). As recomendações não devem ser genéricas/aleatórias, mas coerentes com o histórico recente.
**Dados de entrada** | Histórico de leitura e favoritos do usuário, base de livros com metadados de categoria/autor.
**Resultado obtido** | Recomendações baseadas em favoritos e estilos. Sistema recomenda livros já lidos.

---

## Registro dos Testes de Software

Esta seção apresenta o relatório com as evidências dos testes de software realizados no sistema, baseado no plano de testes pré-definido. Para cada caso de teste, o grupo deve registrar um vídeo ou animação que comprove o funcionamento (ou falha) da funcionalidade.

> Abaixo um modelo para ser repetido para todos os CTs.

| *Caso de Teste* | *CT01 - Buscar livros por título* |
|-----------------|-----------------------------------|
| Requisito Associado | RF-001, RF-004 |
| Link do vídeo do teste realizado | _Inserir link (OneDrive, YouTube não listado, etc.)_ |

| *Caso de Teste* | *CT03 - Verificar disponibilidade e leitura online* |
|-----------------|------------------------------------------------------|
| Requisito Associado | RF-002, RF-005 |
| Link do vídeo do teste realizado | _Inserir link_ |

(O grupo deve criar uma tabela semelhante para CT02, CT04, ..., CT13.)

---

## Avaliação dos Testes de Software

Nesta seção o grupo deve discorrer sobre os resultados obtidos após a execução dos casos de teste, abordando:

- **Pontos fortes**: funcionalidades que passaram em todos os testes, boa resposta de performance, boa usabilidade observada etc.
- **Pontos fracos / falhas encontradas**: casos de teste que falharam, comportamentos inesperados, problemas de layout ou acessibilidade.
- **Ações de melhoria**: correções planejadas, refino de interface, ajustes na organização do catálogo, melhorias no mecanismo de recomendação, etc.
- **Impacto nos requisitos**: quais requisitos (RF/RNF) sofreram alterações ou precisam ser revisados a partir dos resultados dos testes.

> Esta seção deve ser preenchida após a execução dos testes e análise das evidências.

---

## Testes de unidade automatizados (Opcional)

Caso o grupo deseje se aprofundar, poderão ser desenvolvidos testes automatizados (por exemplo, com Jest/React Testing Library) para verificar:

- Componentes de busca e filtragem de livros;
- Componentes de listagem e paginação;
- Componentes de favoritos e listas personalizadas;
- Lógica de recomendações e persistência de dados (quando aplicável).

---

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à funcionalidade da aplicação, facilidade de uso, clareza das informações e eficiência na realização de tarefas típicas de uma **Biblioteca Online**.

Serão convidados usuários que se encaixem nos perfis definidos nas personas:

- Leitores frequentes, leitores ocasionais, estudantes e público geral.
- Administrador simulado (membro da equipe) para testar a organização do catálogo.

Serão avaliados os seguintes indicadores:

- **Taxa de sucesso**: se o usuário conseguiu ou não executar a tarefa proposta.
- **Satisfação subjetiva**: avaliação de 1 a 5, sendo 1 = Péssimo e 5 = Ótimo.
- **Tempo para conclusão da tarefa**: em segundos, comparado ao tempo de um especialista (desenvolvedor) executando a mesma tarefa.

---

## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1 | Você é um leitor que deseja encontrar um livro específico pelo título. Use a Biblioteca Online para localizar o livro e visualizar suas informações detalhadas. |
| 2 | Você é um estudante que quer ler um livro disponível. Encontre um livro na categoria "Estudos"/"Acadêmico", verifique se está disponível e inicie a leitura online (PDF). |
| 3 | Você é um usuário que deseja organizar suas leituras. Acesse um livro, marque-o como favorito e adicione-o a uma lista personalizada. Depois, verifique a lista criada. |
| 4 | Você é um leitor que retorna ao sistema e quer continuar de onde parou. Acesse a aplicação, encontre a seção de leituras recentes e retome a leitura de um livro já iniciado. |

---

## Registro dos Testes de Usabilidade

A seguir um modelo de registro para cada cenário de usabilidade. Os dados devem ser preenchidos após a execução dos testes com os usuários.

### Cenário 1: Encontrar livro por título e ver detalhes

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1 | SIM/NÃO | 1–5 | _X_ segundos |
| 2 | SIM/NÃO | 1–5 | _X_ segundos |
| **Média** | % de sucesso | Média da nota | Média do tempo |
| **Tempo para conclusão pelo especialista** | SIM | 1–5 | _X_ segundos |

---

### Cenário 2: Verificar disponibilidade e iniciar leitura online

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1 | SIM/NÃO | 1–5 | _X_ segundos |
| 2 | SIM/NÃO | 1–5 | _X_ segundos |
| **Média** | % de sucesso | Média da nota | Média do tempo |
| **Tempo para conclusão pelo especialista** | SIM | 1–5 | _X_ segundos |

---

## Avaliação dos Testes de Usabilidade

Com base nos registros dos cenários de usabilidade, o grupo deve:

- Avaliar se os usuários conseguiram completar as tarefas propostas com facilidade;
- Analisar a satisfação subjetiva e os comentários qualitativos dos participantes;
- Comparar o tempo médio dos usuários com o tempo do especialista;
- Identificar oportunidades de melhoria:
  - Clareza de rótulos e textos;
  - Organização dos elementos na tela;
  - Descobribilidade das funções de busca, favoritos, listas e recomendações;
  - Navegação entre páginas e retorno ao catálogo.

A partir dessa análise, devem ser registradas as melhorias planejadas na interface e na experiência do usuário para as próximas iterações do projeto da Biblioteca Online.

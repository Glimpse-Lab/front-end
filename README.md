
  # GPM Esquadrias — Front-end

Aplicação web para a **GPM Esquadrias**, empresa especializada em esquadrias de alumínio de alta performance. O sistema oferece um portal público para clientes e uma área administrativa para gestão interna.

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| React | 18.3 |
| React Router | 7.13 |
| Vite | 6 |
| Tailwind CSS | 4 |
| Axios | 1.16 |
| Lucide React | 0.487 |

---

## Funcionalidades

### Área pública
- **Landing Page** — apresentação da empresa, projetos em destaque e produtos
- **Projetos** — portfólio de obras realizadas
- **Produtos** — catálogo de produtos disponíveis
- **Orçamento** — formulário para solicitação de orçamento

### Área administrativa (requer autenticação)
- **Dashboard** — visão geral do sistema
- **Projetos** — cadastro e gestão de projetos
- **Produtos** — cadastro e gestão de produtos
- **Orçamentos** — acompanhamento de orçamentos solicitados
- **Funcionários** — gestão de usuários internos

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm 9 ou superior

---

## Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL=http://localhost:8080
```

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API back-end |

---

## Estrutura do projeto

```
src/
├── api.js              # Instância do Axios com interceptadores JWT
├── App.jsx             # Componente raiz
├── main.jsx            # Entry point
├── routes.jsx          # Definição de rotas (React Router)
├── assets/styles/      # CSS global e tema
├── components/         # Componentes reutilizáveis
├── context/            # AppContext — estado global da aplicação
├── data/               # Dados mock para desenvolvimento
├── hooks/              # Hooks customizados (ex: useAuthToken)
├── layouts/            # PublicLayout e AdminLayout
├── pages/              # Páginas públicas e administrativas
└── services/           # Serviços de API (auth, usuário, etc.)
```

---

## Autenticação

O sistema utiliza **JWT**. Após o login, o token é armazenado no `localStorage` e injetado automaticamente em todas as requisições via interceptador do Axios. O acesso à área `/admin` requer autenticação válida.

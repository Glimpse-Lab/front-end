
  # GPM Esquadrias — Front-end

Aplicação web para a **GPM Esquadrias**, empresa especializada em esquadrias de alumínio de alta performance. O sistema oferece um portal público para clientes e uma área administrativa para gestão interna.

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| React | 18.3.1 |
| React Router | 7.13.0 |
| Vite | 6.3.5 |
| Tailwind CSS | 4.1.12 |
| Axios | 1.16.0 |
| Lucide React | 0.487.0 |

---

## Funcionalidades

### Área pública
- **Landing Page** — apresentação da empresa, projetos em destaque e produtos
- **Projetos** — portfólio de obras realizadas
- **Produtos** — catálogo de produtos disponíveis
- **Orçamento** — formulário para solicitação de orçamento

### Autenticação
- **Login** — acesso ao painel administrativo via JWT
- **Esqueci minha senha** — solicitação de recuperação de senha por e-mail
- **Redefinir senha** — criação de nova senha via token enviado por e-mail

### Área administrativa (requer autenticação)
- **Dashboard** — visão geral do sistema
- **Projetos** — cadastro e gestão de projetos do portfólio
- **Produtos** — cadastro e gestão do catálogo de produtos
- **Orçamentos** — acompanhamento e atualização de status de orçamentos
- **Funcionários** — gestão de usuários internos do sistema

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm 9 ou superior
- Back-end da API em execução (ver `back-end/`)

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

## Rotas da aplicação

| Caminho | Componente | Acesso |
|---|---|---|
| `/` | `LandingPage` | Público |
| `/projetos` | `ProjectsPage` | Público |
| `/produtos` | `ProductsPage` | Público |
| `/orcamento` | `QuotePage` | Público |
| `/login` | `LoginPage` | Público |
| `/esqueci-senha` | `ForgotPasswordPage` | Público |
| `/redefinir-senha` | `ResetPasswordPage` | Público (via token) |
| `/admin` | `AdminDashboard` | Autenticado |
| `/admin/projetos` | `AdminProjectsPage` | Autenticado |
| `/admin/produtos` | `AdminProductsPage` | Autenticado |
| `/admin/orcamentos` | `AdminQuotesPage` | Autenticado |
| `/admin/funcionarios` | `AdminEmployeesPage` | Autenticado |

---

## Estrutura do projeto

```
src/
├── App.jsx                     # Componente raiz com RouterProvider
├── main.jsx                    # Entry point
├── routes.jsx                  # Definição de rotas (React Router)
├── assets/
│   └── styles/
│       ├── index.css           # CSS global
│       ├── tailwind.css        # Importação do Tailwind
│       └── theme.css           # Variáveis de tema (cores, tipografia)
├── components/                 # Componentes reutilizáveis
│   ├── AdminPageHeader.jsx
│   ├── Button.jsx
│   ├── ConfirmDialog.jsx
│   ├── FormField.jsx
│   ├── Modal.jsx
│   ├── ProductCard.jsx
│   ├── ProjectCard.jsx
│   ├── ScrollToTop.jsx
│   └── StatusBadge.jsx
├── context/
│   └── AppContext.jsx          # Estado global da aplicação
├── data/
│   └── mockData.js             # Dados mock para desenvolvimento local
├── hooks/
│   ├── useApp.js               # Hook para consumir o AppContext
│   └── useAuthToken.js         # Hook para leitura do token JWT
├── layouts/
│   ├── PublicLayout.jsx        # Layout com cabeçalho e rodapé públicos
│   └── AdminLayout.jsx         # Layout com sidebar administrativa
├── pages/
│   ├── ErrorPage.jsx
│   ├── ForgotPasswordPage.jsx
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   ├── ProductsPage.jsx
│   ├── ProjectsPage.jsx
│   ├── QuotePage.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminEmployeesPage.jsx
│       ├── AdminProductsPage.jsx
│       ├── AdminProjectsPage.jsx
│       └── AdminQuotesPage.jsx
├── provider/
│   └── api.js                  # Instância do Axios com interceptadores JWT
└── services/                   # Funções de consumo da API REST
    ├── authService.js
    ├── clienteService.js
    ├── orcamentoService.js
    ├── produtoService.js
    ├── projetoService.js
    └── usuarioService.js
```

---

## Alias de importação

O projeto configura o alias `@` apontando para `./src`, permitindo importações absolutas:

```js
import { Button } from '@/components/Button'
```

---

## Autenticação

O sistema utiliza **JWT**. Após o login, o token é armazenado no `localStorage` e injetado automaticamente no header `Authorization` de todas as requisições via interceptador do Axios. O acesso às rotas `/admin/*` requer token válido — usuários não autenticados são redirecionados para `/login`.

O fluxo de recuperação de senha ocorre por e-mail: o usuário solicita o reset em `/esqueci-senha`, recebe um link com token e redefine a senha em `/redefinir-senha`.

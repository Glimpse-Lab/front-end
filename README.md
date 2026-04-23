# GPM - Esquadrias | Front-end

Sistema de gerenciamento de projetos e orçamentos para a empresa GPM Esquadrias. Uma aplicação web moderna construída com React e Vite, oferecendo uma experiência intuitiva para cadastro de projetos, clientes e gerenciamento de orçamentos.

## 📋 Funcionalidades

- **Autenticação**: Sistema de login e cadastro de usuários
- **Gerenciamento de Projetos**: Criação e visualização de projetos
- **Catálogo de Produtos**: Listagem de esquadrias e produtos
- **Gerenciamento de Orçamentos**: Criação e consulta de orçamentos
- **Painel Administrativo**: Dashboard exclusivo para administradores
- **Formulários Validados**: Formulários com validação de dados

## 🚀 Tecnologias

- **React 19.2.4**: Biblioteca JavaScript para construção de UIs
- **Vite 8.0.4**: Build tool rápido e moderno
- **React Router 7.14.0**: Roteamento de aplicação
- **ESLint**: Linter para manutenção de qualidade de código

## 📂 Estrutura do Projeto

```
src/
├── App.jsx                 # Componente raiz com rotas
├── main.jsx               # Ponto de entrada da aplicação
├── index.css              # Estilos globais
├── assets/                # Recursos estáticos (imagens, CSS)
├── components/            # Componentes reutilizáveis
│   ├── Admin/            # Componentes do painel administrativo
│   └── Formulario/       # Componentes de formulários
├── pages/                # Páginas da aplicação
│   ├── Home/             # Página inicial
│   ├── Projetos/         # Página de projetos
│   ├── Formulario/       # Página de cadastro/login
│   └── Admin/            # Página administrativa
├── hooks/                # Custom hooks reutilizáveis
├── services/             # Serviços de integração com API
└── utils/                # Funções utilitárias e helpers
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 16 ou superior
- npm

### Passos de Instalação

1. Clone ou acesse o repositório:
```bash
cd front-end
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5000`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói a aplicação para produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa verificações de linting

## 🎯 Páginas e Rotas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Página inicial com apresentação | Público |
| `/projetos` | Visualização de projetos | Autenticado |
| `/formulario` | Login e cadastro | Público |
| `/admin` | Painel administrativo | Admin |

## 🎨 Estilos

A aplicação utiliza CSS puro e CSS Modules:
- Estilos globais em `src/index.css`
- Estilos específicos em arquivos `.module.css` próximos aos componentes
- Estilos inline para componentes simples

## 🔧 Como Criar Componentes e Páginas

Para manter a qualidade e consistência do código, consulte o arquivo [GUIA_DESENVOLVIMENTO.md](./GUIA_DESENVOLVIMENTO.md) que contém um tutorial detalhado sobre:

- Como criar um novo componente
- Como criar uma nova página
- Boas práticas do React
- Padrões de organização
- Convenções de nomenclatura

## 📝 Contribuindo

Antes de criar novos componentes ou páginas, leia o [GUIA_DESENVOLVIMENTO.md](./GUIA_DESENVOLVIMENTO.md) para garantir que seu código segue os padrões do projeto.

## 🐛 Debugging

A aplicação está configurada para usar `React.StrictMode` em desenvolvimento, que ajuda a identificar problemas potenciais.

## 📄 Licença

Este projeto é propriedade da Glimpse e GPM Esquadrias.

## 👥 Contato

Para dúvidas ou sugestões sobre a estrutura do projeto, consulte o guia de desenvolvimento.

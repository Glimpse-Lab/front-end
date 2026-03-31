# Estrutura Refatorada - Front-end Project

## Visão Geral da Reorganização

Seu projeto foi refatorado seguindo as melhores práticas de React e Vite. A nova estrutura promove:
- ✅ Separação de responsabilidades
- ✅ Reutilização de código
- ✅ Facilita testes e manutenção
- ✅ Escalabilidade

---

## Estrutura de Diretórios

```
src/
├── App.jsx                      # Componente raiz
├── main.jsx                     # Entry point
│
├── assets/
│   └── style.css               # Estilos globais
│
├── components/
│   ├── common/                 # Componentes reutilizáveis globais
│   │   └── (para future use)
│   │
│   └── Formulario/             # Componentes do formulário
│       ├── Formulario.jsx      # Componente principal
│       ├── CadastroForm.jsx    # Formulário de cadastro
│       ├── LoginForm.jsx       # Formulário de login
│       ├── EmailInput.jsx      # Input de email
│       ├── PasswordInput.jsx   # Input de senha
│       ├── CPFInput.jsx        # Input de CPF
│       ├── FormTabs.jsx        # Abas do formulário
│       ├── FormMessage.jsx     # Mensagens de feedback
│       └── PasswordRules.jsx   # Exibição de requisitos
│
├── services/                   # Lógica de negócio e API
│   ├── authService.js          # Cadastro e login
│   ├── produtosService.js      # Dados de produtos
│   └── projetosService.js      # Dados de projetos
│
├── hooks/                      # Hooks customizados
│   ├── useAuth.js              # Hook para autenticação
│   └── usePasswordRules.js     # Hook para validação
│
├── utils/                      # Funções utilitárias
│   ├── validators.js           # Validações (email, CPF, senha)
│   └── helpers.js              # Funções auxiliares
│
└── styles/                     # Estilos específicos (opcional)
    └── (para future use)
```

---

## O Que Mudou

### ❌ Antes
- `src/script/defaultFunctions.js` → Validadores misturados
- `src/script/script.js` → Lógica desorganizada
- `src/script/produtos.js` → Dados soltos
- `src/script/projetos.js` → Dados soltos
- `src/components/Formulario.jsx` → Componente monolítico (200+ linhas)

### ✅ Depois
- **Services**: Separam chamadas API e lógica
- **Utils**: Contêm funções puras e reutilizáveis
- **Hooks**: Encapsulam lógica com estado
- **Components**: Componentes pequenos e focados (10-50 linhas)

---

## Como Usar

### 1. Importar Validadores
```jsx
import { validarEmail, validarSenha, validarCPF } from "@/utils/validators.js";

if (validarEmail(email)) {
  console.log("Email válido!");
}
```

### 2. Importar Services
```jsx
import { getProdutos } from "@/services/produtosService.js";
import { cadastrar, logar } from "@/services/authService.js";

const produtos = getProdutos();
const resultado = await cadastrar(email, senha, cpf);
```

### 3. Usar Hooks Customizados
```jsx
import usePasswordRules from "@/hooks/usePasswordRules.js";
import useAuth from "@/hooks/useAuth.js";

function MeuComponente() {
  const rules = usePasswordRules(senha);
  const { handleCadastro, loading } = useAuth();
  // ...
}
```

---

## Próximos Passos Sugeridos

### 1. **Adicionar Context API** (se houver compartilhamento global de Estado)
```
src/context/
├── AuthContext.jsx
└── ProductContext.jsx
```

### 2. **Adicionar React Router** (se tiver múltiplas páginas)
```
src/pages/
├── Home.jsx
├── Formulario.jsx
├── Projetos.jsx
└── Produtos.jsx
```

### 3. **Adicionar Testes**
```
src/__tests__/
├── components/
├── utils/
└── hooks/
```

### 4. **CSS Modules** (para estilos organizados)
```
src/components/Formulario/
├── Formulario.jsx
└── Formulario.module.css
```

### 5. **Configurar path aliases** (no `vite.config.js`)
```javascript
resolve: {
  alias: {
    '@': new URL('./src', import.meta.url).pathname
  }
}
```

---

## Convenções Adotadas

- 📁 **Pastas com PascalCase**: Componentes (`Formulario/`, `common/`)
- 📄 **Arquivos com camelCase**: Utilitários, services, hooks (`authService.js`, `useAuth.js`)
- 🎯 **Um componente por arquivo** (exceto sub-componentes)
- 📝 **JSDoc para funções importantes**
- 🔄 **Hooks customizados**: Encapsulam lógica com estado reutilizável

---

## Dicas de Manutenção

- ✅ Manter componentes com **máximo 100 linhas**
- ✅ Mover lógica complexa para **hooks** ou **services**
- ✅ Sempre usar **validadores** para entrada de dados
- ✅ Preferir **composição** a herança
- ✅ Manter **CSS globalizado** no `assets/style.css`

---

## Arquivos Movidos (Backup)

Se quiser manter os arquivos antigos como referência, eles estão em:
- `src/script/` (você pode deletar após confirmar que está tudo funcionando)
- `src/components/Formulario.jsx` (substituído pela pasta `Formulario/`)

---

Generated: 2026-03-31 | Version: 1.0

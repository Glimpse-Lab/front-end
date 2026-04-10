# Página de Administração - Design Profissional

## Visão Geral

A página de administração agora conta com um design moderno e profissional, incluindo um **menu lateral (sidebar)** para navegação intuitiva e fácil alternância entre as 3 abas principais.

### Funcionalidades Principais:

1. **📦 Aba Produtos** - Gerenciar produtos do catálogo
2. **🏗️ Aba Projetos** - Gerenciar projetos realizados  
3. **📋 Aba Orçamentos** - Visualizar e gerenciar pedidos de orçamento

## Como Acessar

A navegação funciona de forma integrada:

**Home (Formulário) → Administração → Voltar para Home**

O sistema permite transição suave entre páginas mantendo o estado.

## Estrutura de Componentes

```
src/components/Administracao/
├── Administracao.jsx          # Componente principal com layout
├── AdminSidebar.jsx           # Menu lateral colapsável
├── AdminProdutos.jsx          # Gerenciamento de produtos
├── AdminProjetos.jsx          # Gerenciamento de projetos
└── AdminOrcamentos.jsx        # Visualização de orçamentos
```

## Design da Sidebar

### Características:

- **Colapsável**: Botão para expandir/recolher a barra lateral
- **Navegação por Abas**: Clique nos ícones para alternar entre seções
- **Status Visual**: Aba ativa destacada em azul
- **Botão Home**: No rodapé para retornar à home
- **Ícones Visuais**: Cada aba tem um emoji representativo
- **Transições Suaves**: Animações fluidas ao colapsar/expandir

### Layout da Sidebar:

```
┌─────────────────────┐
│ 🔧 Admin      ← ⟶  │  (Logo + Botão colapso)
├─────────────────────┤
│ 📦 Produtos         │  (Ativa em azul)
│ 🏗️ Projetos         │
│ 📋 Orçamentos       │
├─────────────────────┤
│ 🏠 Voltar Home      │  (Botão verde no rodapé)
└─────────────────────┘
```

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| Sidebar | `#1a3a52` | Fundo principal |
| Aba Ativa | `#2196f3` | Destaque da navegação |
| Header | `#fff` | Topo da página |
| Fundo Geral | `#f5f5f5` | Background |
| Conteúdo | `#fff` | Cards e tabelas |
| Status Pendente | `#ff9800` | Laranja |
| Status Análise | `#2196f3` | Azul |
| Status Respondido | `#4caf50` | Verde |
| Status Rejeitado | `#f44336` | Vermelho |

## Funcionalidades por Aba

### 1. Aba Produtos (📦)

**Operações:**
- ✅ Visualizar produtos em tabela responsiva
- ✅ Adicionar novo produto
- ✅ Editar produto existente
- ✅ Deletar produto com confirmação
- ✅ Campos: Nome, Descrição, Preço, Material, Garantia

**Layout:**
- Header com título e botão "+ Novo Produto"
- Formulário expansível (aparece quando adicionar/editar)
- Tabela com cores alternadas para melhor leitura

### 2. Aba Projetos (🏗️)

**Operações:**
- ✅ Visualizar projetos em tabela
- ✅ Adicionar novo projeto
- ✅ Editar projeto existente
- ✅ Deletar projeto
- ✅ Campos: Nome, Descrição, Localização, Data (Mês/Ano)

**Layout:**
- Estrutura similar à aba de Produtos
- Input de mês/ano para data do projeto
- Tabela organizada com ações

### 3. Aba Orçamentos (📋)

**Operações:**
- ✅ Visualizar todos os pedidos
- ✅ Filtrar por status (5 opções)
- ✅ Expandir/colapsar detalhes
- ✅ Alterar status do orçamento
- ✅ Deletar orçamento

**Filtros Disponíveis:**
- 🟠 Pendente
- 🔵 Em Análise
- 🟢 Respondido
- 🔴 Rejeitado
- Todos

**Informações Exibidas:**
- ID e Nome do cliente
- Email e Telefone
- Data do pedido
- Descrição detalhada
- Produtos interessados (tags)
- Valor estimado
- Status e opção de alteração

## Navegação do Sistema

### Fluxo:

```
Home (Formulário)
    ↓
Clique em Texto/Botão de Acesso à Admin*
    ↓
Painel de Administração (Sidebar Ativa)
    ↓
Navegação entre abas pelo Menu Lateral
    ↓
Botão "Voltar Home" na Sidebar
    ↓
Retorna para Home
```

*Nota: O botão/link para acessar administração pode ser adicionado no Formulário conforme necessário.

## Responsividade

### Desktop (1200px+):
- Sidebar fixa à esquerda
- Conteúdo principal expande
- Tabelas com todas as colunas visíveis

### Melhorias Futuras:
- Versão mobile com sidebar colapsável automática
- Menu hamburger para telas pequenas
- Adaptar tabelas para scroll horizontal

## Dados e Persistência

### Dados Exemplares:
- 6 produtos pré-carregados
- 6 projetos pré-carregados
- 3 orçamentos de exemplo

### Persistência:
- Atual: Em memória (state com useState)
- Futura: Integração com backend/API
- Sugestão: JSON Server ou REST API

## Interações e Feedback Visual

### Hover Effects:
- Cards de orçamentos mudam cor ao passar mouse
- Botões mudam cor com transição suave
- Sidebar responde a hover com interatividade

### Transições:
- Expand/Collapse da sidebar: 0.3s
- Hover dos elementos: 0.3s ease
- Mudanças de cor: transição suave

### Confirmações:
- `confirm()` para operações destrutivas (deletar)
- Botões "Cancelar" para cancelar edição
- Feedback visual de sucesso (status atualizado)

## Estilo e Layout

### Componentes:

**Sidebar:**
- Largura: 250px (ou 80px colapsada)
- Posição: fixed left
- Zindex: 1000
- Background: #1a3a52

**Main Content:**
- Margin-left: 250px
- Padding: 30px
- Background: #f5f5f5

**Cards/Tabelas:**
- Border-radius: 8px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.08)
- Background: white

## Estilos de Tipografia

| Elemento | Tamanho | Peso |
|----------|---------|------|
| Título Principal | 24px | Bold |
| Subtítulo | 13px | Normal |
| Label | 12px | 600 |
| Conteúdo | 14px | Normal |
| Badge | 11px | 600 |

## Próximos Passos Sugeridos

1. **Autenticação de Admin**
   - Middleware para proteger página
   - Login específico para administradores

2. **Persistência em Backend**
   - Conectar a API real
   - Sincronizar dados com servidor

3. **Relatórios e Analytics**
   - Gráficos de orçamentos por status
   - Estatísticas de produtos/projetos

4. **Exportação de Dados**
   - Exportar orçamentos em PDF/Excel
   - Gerar relatórios automaticamente

5. **Sistema de Notificações**
   - Toast notifications para ações
   - Email automático para novo orçamento

6. **Busca Avançada**
   - Filtros múltiplos em orçamentos
   - Busca por texto em produtos/projetos

## Troubleshooting

### Sidebar não aparece:
- Verificar se AdminSidebar está importado
- Confirmar arquivo está em `/Administracao/`

### Navegação não funciona:
- Verificar callbacks `onTabChange` e `onNavigateHome`
- Confirmar estado em `useState`

### Estilos inconsistentes:
- Todos os estilos são inline
- Verificar objeto `*Style` no componente

### Dados não persistem:
- Dados estão apenas em memória
- Implementar serviço de persistência em backend


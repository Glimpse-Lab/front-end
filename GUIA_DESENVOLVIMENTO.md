# 📖 Guia de Desenvolvimento - Criando Componentes e Páginas

Este documento descreve as práticas e padrões que devem ser seguidos ao criar componentes e páginas na aplicação GPM Esquadrias. Leia este guia **antes de criar qualquer novo componente ou página**.

---

## 📚 Índice

1. [Boas Práticas do React](#boas-práticas-do-react)
2. [Criando um Componente](#criando-um-componente)
3. [Criando uma Página](#criando-uma-página)
4. [Estrutura de Arquivos](#estrutura-de-arquivos)
5. [Convenções de Nomenclatura](#convenções-de-nomenclatura)
6. [Exemplos Práticos](#exemplos-práticos)

---

## ✅ Boas Práticas do React

### 1. **Use Functional Components**

Sempre use componentes funcionais, nunca componentes de classe. São mais simples, mais legíveis e permitem usar Hooks.

```jsx
// ✅ BOM
function MeuComponente() {
  const [estado, setEstado] = useState(null);
  
  return <div>Conteúdo</div>;
}

// ❌ EVITAR
class MeuComponente extends React.Component {
  // ...
}
```

### 2. **Nomeie Componentes em PascalCase**

Componentes React devem sempre começar com letra maiúscula para distinguir de tags HTML.

```jsx
// ✅ BOM
function MinhaCard() { }
export default MinhaCard;

// ❌ EVITAR
function minhaCard() { }
export default minhaCard;
```

### 3. **Use Hooks Corretamente**

#### Regras dos Hooks:
- Chame Hooks apenas no topo do componente, nunca dentro de condições ou loops
- Use custom hooks para lógica reutilizável

```jsx
// ✅ BOM
function MeuComponente() {
  const [dados, setDados] = useState(null);
  const { auth } = useAuth(); // Custom hook no topo
  
  useEffect(() => {
    // Efeito colateral
  }, []);
  
  return <div>{dados}</div>;
}

// ❌ EVITAR
function MeuComponente() {
  if (condicao) {
    const [dados, setDados] = useState(null); // Hook dentro de condicional!
  }
  
  return <div></div>;
}
```

### 4. **Props com Destructuring**

Use destructuring para fazer props mais legíveis.

```jsx
// ✅ BOM
function Produto({ id, title, price, onComprar }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>R$ {price}</p>
      <button onClick={() => onComprar(id)}>Comprar</button>
    </div>
  );
}

// ❌ EVITAR
function Produto(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>R$ {props.price}</p>
    </div>
  );
}
```

### 5. **Combine Lógica em Custom Hooks**

Se você tem lógica que aparece em múltiplos componentes, extraia para um custom hook.

```jsx
// ✅ BOM - Custom Hook
function useFormData() {
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return { formData, handleChange };
}

// Usando o hook
function CadastroForm() {
  const { formData, handleChange } = useFormData();
  
  return (
    <form>
      <input name="nome" value={formData.nome} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
    </form>
  );
}
```

### 6. **Documente Componentes com Comentários**

Adicione comentários para documentar o propósito do componente.

```jsx
/**
 * Componente de Card para produto
 * Exibe informações do produto e permite adicionar ao carrinho
 * 
 * @param {Object} props - Props do componente
 * @param {number} props.id - ID único do produto
 * @param {string} props.title - Título do produto
 * @param {string} props.price - Preço formatado
 * @param {Function} props.onAddCart - Callback ao adicionar ao carrinho
 */
function ProdutoCard({ id, title, price, onAddCart }) {
  // ...
}
```

### 7. **Lide com Efeitos Colaterais com useEffect**

Use `useEffect` para chamadas de API, subscriptions e manipulação do DOM.

```jsx
// ✅ BOM
function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const dados = await produtosService.obter();
        setProdutos(dados);
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarProdutos();
  }, []); // Dependency array vazio = executa uma vez
  
  if (carregando) return <p>Carregando...</p>;
  
  return (
    <ul>
      {produtos.map(produto => (
        <li key={produto.id}>{produto.title}</li>
      ))}
    </ul>
  );
}
```

### 8. **Trate Valores Dinâmicos com Cuidado**

Sempre use `key` em listas e considere o escopo de variáveis.

```jsx
// ✅ BOM - Key com ID único
function ListaProdutos({ produtos }) {
  return (
    <ul>
      {produtos.map(produto => (
        <li key={produto.id}>{produto.title}</li>
      ))}
    </ul>
  );
}

// ❌ EVITAR - Key com index (causa problemas)
function ListaProdutos({ produtos }) {
  return (
    <ul>
      {produtos.map((produto, index) => (
        <li key={index}>{produto.title}</li>
      ))}
    </ul>
  );
}
```

---

## 🔨 Criando um Componente

### Estrutura de um Componente

Os componentes devem ser criados em `src/components/` organizados por funcionalidade.

### Exemplo 1: Componente Simples

Vamos criar um componente `Botao` reutilizável.

**Arquivo: `src/components/Botao.jsx`**

```jsx
/**
 * Componente de Botão reutilizável
 * Encapsula os estilos e comportamentos padrão de botões
 */
function Botao({ 
  children, 
  onClick, 
  tipo = 'primario', 
  desabilitado = false,
  tamanho = 'medio'
}) {
  const estilos = {
    primario: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secundario: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    perigo: {
      backgroundColor: '#dc3545',
      color: 'white'
    }
  };
  
  const tamanhos = {
    pequeno: { padding: '6px 12px', fontSize: '12px' },
    medio: { padding: '10px 20px', fontSize: '14px' },
    grande: { padding: '15px 30px', fontSize: '16px' }
  };
  
  const estilo = {
    ...estilos[tipo],
    ...tamanhos[tamanho],
    border: 'none',
    borderRadius: '4px',
    cursor: desabilitado ? 'not-allowed' : 'pointer',
    opacity: desabilitado ? 0.6 : 1,
    transition: 'all 0.3s ease'
  };
  
  return (
    <button 
      style={estilo}
      onClick={onClick}
      disabled={desabilitado}
    >
      {children}
    </button>
  );
}

export default Botao;
```

### Exemplo 2: Componente com Estado

Vamos criar um componente de Accordion.

**Arquivo: `src/components/Accordion.jsx`**

```jsx
import { useState } from 'react';

/**
 * Componente de Accordion
 * Permite expandir/colapsar seções de conteúdo
 * 
 * @param {Array} items - Lista de itens com título e conteúdo
 * @param {Object} items[0] - { id: string, titulo: string, conteudo: string }
 */
function Accordion({ items }) {
  const [aberto, setAberto] = useState(null);
  
  const alternarItem = (id) => {
    setAberto(aberto === id ? null : id);
  };
  
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => alternarItem(item.id)}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              border: 'none',
              borderBottom: '1px solid #ddd',
              textAlign: 'left',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {item.titulo}
            <span style={{ float: 'right' }}>
              {aberto === item.id ? '▼' : '▶'}
            </span>
          </button>
          
          {aberto === item.id && (
            <div style={{ padding: '15px' }}>
              {item.conteudo}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
```

---

## 📄 Criando uma Página

Páginas são componentes maiores que representam rotas da aplicação e ficam em `src/pages/`.

### Estrutura de uma Página

Uma página geralmente contém:
1. Importação de componentes
2. Lógica de dados (hooks, APIs)
3. Renderização da interface

### Exemplo: Criando a Página de Detalhes do Projeto

**Arquivo: `src/pages/Projetos/DetalheProjeto.jsx`**

```jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projetosService from '../../services/projetosService';
import Botao from '../../components/Botao';
import styles from './DetalheProjeto.module.css';

/**
 * Página de Detalhes do Projeto
 * Exibe informações completas de um projeto específico
 */
function DetalheProjeto() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const carregarProjeto = async () => {
      try {
        setCarregando(true);
        const dados = await projetosService.obterPorId(id);
        setProjeto(dados);
        setErro(null);
      } catch (err) {
        setErro('Erro ao carregar o projeto. Tente novamente.');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };
    
    carregarProjeto();
  }, [id]);
  
  if (carregando) {
    return <div className={styles.container}>Carregando...</div>;
  }
  
  if (erro) {
    return <div className={styles.erro}>{erro}</div>;
  }
  
  if (!projeto) {
    return <div className={styles.container}>Projeto não encontrado</div>;
  }
  
  return (
    <div className={styles.container}>
      <h1>{projeto.nome}</h1>
      
      <section className={styles.detalhes}>
        <div>
          <h3>Cliente</h3>
          <p>{projeto.cliente}</p>
        </div>
        
        <div>
          <h3>Data de Início</h3>
          <p>{new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div>
          <h3>Status</h3>
          <p className={styles[`status-${projeto.status}`]}>
            {projeto.status}
          </p>
        </div>
      </section>
      
      <section className={styles.acoes}>
        <Botao tipo="primario">Editar</Botao>
        <Botao tipo="secundario">Voltar</Botao>
        <Botao tipo="perigo">Deletar</Botao>
      </section>
    </div>
  );
}

export default DetalheProjeto;
```

**Arquivo: `src/pages/Projetos/DetalheProjeto.module.css`**

```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.detalhes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detalhes div {
  padding: 10px 0;
}

.detalhes h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.detalhes p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.acoes {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.status-ativo {
  color: #28a745;
  font-weight: bold;
}

.status-concluido {
  color: #17a2b8;
  font-weight: bold;
}

.status-cancelado {
  color: #dc3545;
  font-weight: bold;
}

.erro {
  padding: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px;
}
```

---

## 📂 Estrutura de Arquivos

### Organizando Componentes por Funcionalidade

```
src/components/
├── Admin/
│   ├── AdminSidebar.jsx
│   ├── AdminTabs.jsx
│   └── AdminSidebar.module.css
├── Formulario/
│   ├── Formulario.jsx
│   ├── LoginForm.jsx
│   ├── CadastroForm.jsx
│   ├── CPFInput.jsx
│   ├── EmailInput.jsx
│   ├── NomeInput.jsx
│   ├── PasswordInput.jsx
│   ├── PasswordRules.jsx
│   └── FormMessage.jsx
├── Compartilhados/          # Novos componentes reutilizáveis
│   ├── Botao.jsx
│   ├── Accordion.jsx
│   ├── Modal.jsx
│   └── Spinners.jsx
└── common/                   # Componentes muito pequenos
    ├── Badge.jsx
    └── Alert.jsx
```

### Organizando Páginas

```
src/pages/
├── Home/
│   ├── index.jsx
│   └── Home.module.css
├── Projetos/
│   ├── index.jsx
│   ├── DetalheProjeto.jsx
│   └── Projetos.module.css
├── Formulario/
│   ├── index.jsx
│   └── Formulario.module.css
└── Admin/
    ├── index.jsx
    └── Admin.module.css
```

---

## 📝 Convenções de Nomenclatura

### Arquivos e Pastas

```
✅ BOM:
src/components/ProdutoCard.jsx
src/components/FormularioLogin.jsx
src/pages/DetalheProjeto/index.jsx
src/hooks/useFormData.js
src/services/produtosService.js
src/utils/validadores.js

❌ EVITAR:
src/components/produtocard.jsx
src/components/formulario-login.jsx
src/pages/detalhe_projeto.jsx
src/hooks/form_data.js
src/services/produtos_service.js
```

### Variáveis e Funções

```jsx
// ✅ BOM - Nomes descritivos
const isCarregando = true;
const usuarioAutenticado = null;
const obterProdutos = async () => {};
const verificarEmailValido = (email) => {};

// ❌ EVITAR - Nomes muito curtos ou genéricos
const loading = true;
const user = null;
const get = async () => {};
const check = (email) => {};
```

### Props e State

```jsx
// ✅ BOM - Nomes claros do que representam
function Produto({ 
  idProduto,
  nomeProduto,
  preco,
  descricao,
  aoCliquarComprar
}) {}

// ❌ EVITAR
function Produto({ 
  id,
  name,
  p,
  desc,
  onClick
}) {}
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Criando um Custom Hook para Validação de Formulário

**Arquivo: `src/hooks/useFormValidation.js`**

```javascript
import { useState, useCallback } from 'react';

/**
 * Hook para validação de formulário
 * Mantém estado de valores e erros do formulário
 * 
 * @param {Object} valoresIniciais - Valores iniciais do formulário
 * @param {Function} onValidar - Função de validação customizada
 * @returns {Object} - { valores, erros, alterarCampo, validar, limpar }
 */
function useFormValidation(valoresIniciais, onValidar) {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  
  const alterarCampo = useCallback((e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando usuário começa a digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [erros]);
  
  const validar = useCallback(() => {
    const novosErros = onValidar(valores);
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }, [valores, onValidar]);
  
  const limpar = useCallback(() => {
    setValores(valoresIniciais);
    setErros({});
  }, [valoresIniciais]);
  
  return { valores, erros, alterarCampo, validar, limpar };
}

export default useFormValidation;
```

### Exemplo 2: Usando o Custom Hook

**Arquivo: `src/pages/Formulario/CadastroPage.jsx`**

```jsx
import { useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import Botao from '../../components/Botao';
import styles from './CadastroPage.module.css';

function CadastroPage() {
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  
  const validadores = (valores) => {
    const erros = {};
    
    if (!valores.nome || valores.nome.trim().length < 3) {
      erros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }
    
    if (!valores.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) {
      erros.email = 'Email inválido';
    }
    
    if (!valores.senha || valores.senha.length < 6) {
      erros.senha = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    return erros;
  };
  
  const { valores, erros, alterarCampo, validar, limpar } = useFormValidation(
    { nome: '', email: '', senha: '' },
    validadores
  );
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validar()) {
      return;
    }
    
    setEnviando(true);
    try {
      // Chamar API aqui
      // await cadastroService.criar(valores);
      setSucesso(true);
      limpar();
    } catch (erro) {
      console.error('Erro no cadastro:', erro);
    } finally {
      setEnviando(false);
    }
  };
  
  return (
    <div className={styles.container}>
      <h1>Cadastro de Usuário</h1>
      
      {sucesso && (
        <div className={styles.sucesso}>
          Cadastro realizado com sucesso!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.grupoFormulario}>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={valores.nome}
            onChange={alterarCampo}
            className={erros.nome ? styles.inputErro : ''}
          />
          {erros.nome && <span className={styles.erro}>{erros.nome}</span>}
        </div>
        
        <div className={styles.grupoFormulario}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={valores.email}
            onChange={alterarCampo}
            className={erros.email ? styles.inputErro : ''}
          />
          {erros.email && <span className={styles.erro}>{erros.email}</span>}
        </div>
        
        <div className={styles.grupoFormulario}>
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            name="senha"
            value={valores.senha}
            onChange={alterarCampo}
            className={erros.senha ? styles.inputErro : ''}
          />
          {erros.senha && <span className={styles.erro}>{erros.senha}</span>}
        </div>
        
        <div className={styles.botoes}>
          <Botao tipo="primario" desabilitado={enviando}>
            {enviando ? 'Cadastrando...' : 'Cadastrar'}
          </Botao>
          <Botao 
            tipo="secundario" 
            onClick={() => {
              e.preventDefault();
              limpar();
            }}
          >
            Limpar
          </Botao>
        </div>
      </form>
    </div>
  );
}

export default CadastroPage;
```

---

## 🔍 Checklist para Antes de Criar um Componente/Página

Antes de enviar sua contribuição, verifique:

- [ ] O componente tem um nome em **PascalCase**
- [ ] O arquivo está na pasta correta (`components/` ou `pages/`)
- [ ] O componente tem um **comentário de documentação** (JSDoc)
- [ ] Usa **functional components** com Hooks
- [ ] **Props são desestruturadas**
- [ ] Possui **tratamento de erros** (se aplicável)
- [ ] Tem **estilos organizados** (CSS Modules ou inline)
- [ ] O código segue as **práticas React** listadas neste guia
- [ ] Sem **console.log** em produção
- [ ] **Testado** no navegador
- [ ] Código está **limpo** e **bem formatado**

---

## 📞 Dúvidas?

Se tiver dúvidas sobre como implementar algo, consulte:

1. Este guia
2. Os componentes existentes no projeto
3. A documentação oficial do [React](https://react.dev)
4. A documentação do [Vite](https://vitejs.dev)

**Lembre-se**: Qualidade > Quantidade. Código bem estruturado é mais fácil de manter e evoluir!

# Front-End com JSON Server

## Configuração do Projeto

Este projeto utiliza JSON Server para simular uma API REST.

### Instalação

1. Instale as dependências:
```bash
npm install
```

### Iniciar o Servidor

Para iniciar o JSON Server:
```bash
npm run server
```
ou
```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

### Endpoints Disponíveis

- **GET** `http://localhost:3000/usuarios` - Lista todos os usuários
- **GET** `http://localhost:3000/usuarios?email=exemplo@email.com` - Busca usuário por email
- **POST** `http://localhost:3000/usuarios` - Cadastra novo usuário
- **PUT** `http://localhost:3000/usuarios/:id` - Atualiza usuário
- **DELETE** `http://localhost:3000/usuarios/:id` - Remove usuário

### Estrutura de Dados

O arquivo `db.json` contém os dados simulados:

```json
{
  "usuarios": [
    {
      "id": 1,
      "email": "exemplo@email.com",
      "senha": "Senha@123",
      "cpf": "123.456.789-00"
    }
  ]
}
```

### Funções Implementadas

#### Cadastrar
```javascript
import { cadastrar } from './site/script/script.js';

const resultado = await cadastrar('novo@email.com', 'Senha@123', '123.456.789-00');
console.log(resultado);
```

#### Logar
```javascript
import { logar } from './site/script/script.js';

const resultado = await logar('exemplo@email.com', 'Senha@123');
console.log(resultado);
```

### Validações

- **Email**: formato válido (exemplo@dominio.com)
- **Senha**: mínimo 8 caracteres, contendo pelo menos:
  - 1 letra minúscula
  - 1 letra maiúscula
  - 1 número
  - 1 caractere especial (@$!%*?&)
- **CPF**: formato 123.456.789-00
- **Telefone**: formato (11) 12345-6789 ou (11) 1234-5678

### Observações

- O JSON Server persiste os dados no arquivo `db.json`
- As senhas são armazenadas em texto simples (apenas para desenvolvimento/testes)
- Em produção, use um backend real com hash de senhas e autenticação segura

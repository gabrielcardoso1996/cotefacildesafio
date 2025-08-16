# Galeria de Imagens - Configuração

## API Unsplash

Para usar esta galeria de imagens, você precisa de uma chave de API do Unsplash:

### 1. Obter Chave da API
1. Acesse [https://unsplash.com/developers](https://unsplash.com/developers)
2. Faça login ou crie uma conta
3. Crie uma nova aplicação
4. Copie sua `Client ID`

### 2. Configurar Variáveis de Ambiente

#### Opção A: Arquivo .env (Recomendado)
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione a seguinte linha:
```bash
VITE_UNSPLASH_API_KEY=sua_chave_aqui
```
3. Reinicie o servidor de desenvolvimento

#### Opção B: Arquivo .env.local
1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione a mesma linha:
```bash
VITE_UNSPLASH_API_KEY=sua_chave_aqui
```
3. Reinicie o servidor de desenvolvimento

### 3. Estrutura de Arquivos
```
cotefacildesafio/
├── .env                          # Suas variáveis de ambiente (não commitado)
├── .env.example                  # Exemplo de configuração
├── src/
│   ├── config/
│   │   └── env.ts               # Configuração das variáveis
│   └── page/searchImage/
│       ├── index.tsx             # Componente principal
│       ├── SearchImage.module.css # Estilos da página
│       ├── components/           # Componentes da galeria
│       └── README.md             # Este arquivo
```

### 4. Validação Automática
O sistema valida automaticamente se a API está configurada:
- ✅ Mostra erro se a chave não estiver configurada
- ✅ Valida se a chave é válida na primeira requisição
- ✅ Trata erros de autenticação e limite de requisições
- ✅ Fornece instruções claras para configuração

### 5. Funcionalidades
- ✅ Busca de imagens por termo
- ✅ Exibição em grid responsivo
- ✅ Informações da imagem (autor, likes)
- ✅ Histórico de busca no localStorage
- ✅ Estados de loading, vazio e erro
- ✅ Navegação para detalhes (preparado para React Router)
- ✅ Tratamento robusto de erros da API

### 6. Rotas
- `/` - Lista de Tarefas
- `/gallery` - Galeria de Imagens

### 7. Segurança
- ✅ Chave da API não exposta no código
- ✅ Arquivo .env não é commitado no Git
- ✅ Validação de configuração antes das requisições
- ✅ Tratamento seguro de erros de autenticação

### 8. Troubleshooting
Se você ver o erro "API não configurada":
1. Verifique se o arquivo `.env` existe na raiz
2. Confirme se a variável `VITE_UNSPLASH_API_KEY` está correta
3. Reinicie o servidor de desenvolvimento
4. Verifique o console para mensagens de erro detalhadas

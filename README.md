# 🚀 Projeto Cote Fácil - Dashboard de Tarefas

Um projeto completo de gerenciamento de tarefas com dashboard visual, galeria de imagens e sistema de listas, construído com React, TypeScript e tecnologias modernas.

## ✨ Funcionalidades Principais

### 📋 **Lista de Tarefas** (`/`)
- ✅ Criar, editar e excluir tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Persistência no localStorage
- ✅ Interface limpa e responsiva

### 🖼️ **Galeria de Imagens** (`/gallery`)
- ✅ Busca de imagens via API Unsplash
- ✅ Grid responsivo de imagens
- ✅ Informações detalhadas (autor, likes, downloads)
- ✅ Histórico de buscas
- ✅ Página de detalhes da imagem

### 📊 **Dashboard de Tarefas** (`/dashboard`)
- ✅ Sistema Kanban com 3 colunas (Pendente, Em Progresso, Concluída)
- ✅ Drag and Drop entre colunas
- ✅ Sistema de prioridades (Alta, Média, Baixa)
- ✅ Gráficos ECharts para visualização
- ✅ Modais para criar/editar tarefas
- ✅ Context API para gerenciamento de estado

## 🛠️ **Tecnologias e Bibliotecas**

### **Core**
- **React 18** - Biblioteca principal para UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### **Roteamento**
- **react-router-dom v7.8.1** - Roteamento client-side

### **Estilização**
- **CSS Modules** - Estilos modulares
- **Styled Components** - Componentes estilizados

### **UI Components**
- **@radix-ui/react-dialog** - Modais acessíveis
- **@radix-ui/react-select** - Seletores customizáveis
- **@radix-ui/react-tooltip** - Tooltips interativos

### **Gráficos e Visualizações**
- **echarts v5.6.0** - Biblioteca de gráficos
- **echarts-for-react** - Wrapper React para ECharts

### **Ícones**
- **@phosphor-icons/react** - Ícones vetoriais

## 🚀 **Como Configurar o Projeto**

### 1. **Instalação das Dependências**
```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

### 2. **Configuração da API Unsplash (para Galeria)**

#### Obter Chave da API
1. Acesse [https://unsplash.com/developers](https://unsplash.com/developers)
2. Faça login ou crie uma conta
3. Crie uma nova aplicação
4. Copie sua `Client ID`

#### Configurar Variáveis de Ambiente
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione a seguinte linha:
```bash
VITE_UNSPLASH_API_KEY=sua_chave_aqui
```
3. Reinicie o servidor de desenvolvimento

### 3. **Executar o Projeto**
```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview
```

## 📁 **Estrutura do Projeto**

```
cotefacildesafio/
├── .env                          # Variáveis de ambiente (não commitado)
├── .env.example                  # Exemplo de configuração
├── src/
│   ├── assets/                   # Ícones e imagens
│   │   ├── todo-icon.svg
│   │   ├── gallery-icon.svg
│   │   ├── dashboard-icon.svg
│   │   └── logo.svg
│   ├── components/               # Componentes reutilizáveis
│   │   ├── Form/                 # Componentes de formulário
│   │   ├── Header/               # Header com navegação
│   │   └── SubmitAction/         # Ação de envio
│   ├── contexts/                 # Context API
│   │   └── TaskContext.tsx       # Gerenciamento de tarefas
│   ├── pages/                    # Páginas da aplicação
│   │   ├── toDoList/             # Lista de tarefas
│   │   ├── searchImage/          # Galeria de imagens
│   │   └── taskDashboard/        # Dashboard Kanban
│   ├── routes/                   # Configuração de rotas
│   │   └── index.tsx
│   ├── App.tsx                   # Componente principal
│   ├── main.tsx                  # Ponto de entrada
│   └── global.css                # Estilos globais
├── package.json                  # Dependências e scripts
└── README.md                     # Este arquivo
```

## 🎯 **Rotas da Aplicação**

- **`/`** - Lista de Tarefas (página inicial)
- **`/gallery`** - Galeria de Imagens com busca
- **`/dashboard`** - Dashboard Kanban de Tarefas

## 🔧 **Configurações Específicas**

### **Galeria de Imagens**
- API Unsplash para busca de imagens
- Histórico de buscas no localStorage
- Tratamento robusto de erros
- Estados de loading, vazio e erro

### **Dashboard de Tarefas**
- Context API para gerenciamento de estado
- Sistema de prioridades (Alta, Média, Baixa)
- Drag and Drop entre colunas
- Gráficos ECharts para estatísticas
- Modais Radix UI para formulários

### **Lista de Tarefas**
- CRUD completo de tarefas
- Persistência local
- Interface limpa e responsiva

## 🎨 **Design System**

### **Cores**
- **Gray Scale**: `--gray-100` a `--gray-700`
- **Blue**: `--blue`, `--blue-dark`
- **Green**: `--green-500`, `--green-600`
- **Yellow**: `--yellow-500`
- **Red**: `--red-500`

### **Componentes**
- **Header**: Navegação principal com ícones
- **Modais**: Formulários acessíveis com Radix UI
- **Cards**: Sistema de cards para tarefas
- **Gráficos**: Visualizações interativas com ECharts

## 📱 **Responsividade**

- **Desktop**: Layout em grid com 3 colunas
- **Tablet**: Adaptação para telas médias
- **Mobile**: Layout em coluna única
- **Breakpoints**: 768px, 1200px

## 🚨 **Troubleshooting**

### **Erro "API não configurada"**
1. Verifique se o arquivo `.env` existe na raiz
2. Confirme se `VITE_UNSPLASH_API_KEY` está correta
3. Reinicie o servidor de desenvolvimento
4. Verifique o console para mensagens detalhadas

### **Problemas de Dependências**
```bash
# Limpar cache e reinstalar
pnpm store prune
pnpm install

# Ou forçar reinstalação
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 **Agradecimentos**

- **Unsplash** pela API de imagens
- **Radix UI** pelos componentes acessíveis
- **ECharts** pelos gráficos interativos
- **Phosphor Icons** pelos ícones vetoriais

---

**Desenvolvido com ❤️ usando React, TypeScript e tecnologias modernas**

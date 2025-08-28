# Gerador de Orçamento

Uma aplicação web moderna para criação e geração de orçamentos em PDF, desenvolvida com React, TypeScript e Vite.

## 🌐 Demonstração

**Acesso online:** [https://maximiliano-lopes.github.io/orcamento-maker/](https://maximiliano-lopes.github.io/orcamento-maker/)

## Funcionalidades

- ✅ Formulário completo para dados da empresa
- ✅ Formulário para dados do cliente
- ✅ Gerenciamento de itens com cálculo automático
- ✅ Geração de PDF com nome personalizado (Cliente_Data.pdf)
- ✅ Design responsivo para todos os dispositivos
- ✅ Logo da empresa integrada no PDF
- ✅ Deploy automático no GitHub Pages
- ✅ Interface responsiva e moderna
- ✅ Navegação por etapas
- ✅ Salvamento dos dados em JSON
- ✅ Validação de campos obrigatórios

## Tecnologias Utilizadas

- **React 18** - Biblioteca para criação de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Ferramenta de build rápida
- **jsPDF** - Geração de arquivos PDF
- **CSS3** - Estilização moderna com Grid e Flexbox

## Como usar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Construir para produção:**
   ```bash
   npm run build
   ```

4. **Visualizar build de produção:**
   ```bash
   npm run preview
   ```

## 🚀 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages.

### Deploy Automático (Recomendado)

1. Faça push para a branch `master`:
```bash
git add .
git commit -m "feat: deploy to github pages"
git push origin master
```

2. O GitHub Actions automaticamente fará o build e deploy

### Deploy Manual

```bash
npm run deploy
```

### Configuração do GitHub Pages

1. No seu repositório, vá em **Settings** > **Pages**
2. Em **Source**, selecione "Deploy from a branch"
3. Selecione a branch `gh-pages` e pasta `/ (root)`
4. Clique em **Save**

O projeto estará disponível em: `https://seu-usuario.github.io/orcamento-maker/`

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── CompanyForm.tsx  # Formulário da empresa
│   ├── ClientForm.tsx   # Formulário do cliente
│   └── ItemsForm.tsx    # Gerenciamento de itens
├── hooks/               # Hooks personalizados
│   └── useBudget.ts     # Hook para gerenciar estado do orçamento
├── types/               # Definições de tipos TypeScript
│   └── budget.ts        # Interfaces para dados do orçamento
├── utils/               # Utilitários
│   └── pdfGenerator.ts  # Geração de PDF
├── App.tsx              # Componente principal
├── App.css              # Estilos da aplicação
└── main.jsx             # Ponto de entrada
```

## Como funciona

1. **Etapa 1**: Preencha os dados da sua empresa
2. **Etapa 2**: Insira as informações do cliente
3. **Etapa 3**: Adicione os itens do orçamento com quantidades e valores
4. **Finalização**: Gere o PDF ou salve os dados

O PDF é gerado automaticamente com o nome no formato: `{NomeDoCliente}_{DD_MM_AAAA}.pdf`

## Recursos Principais

- **Interface Intuitiva**: Navegação por etapas com indicadores visuais
- **Cálculos Automáticos**: Total dos itens calculado em tempo real
- **Validação**: Campos obrigatórios são destacados
- **Responsivo**: Funciona em desktop, tablet e mobile
- **PDF Profissional**: Layout limpo e organizado para impressão

## Contribuição

Este projeto foi desenvolvido como uma solução completa para geração de orçamentos. Sinta-se à vontade para contribuir com melhorias e novas funcionalidades.

## Licença

MIT License - veja o arquivo LICENSE para detalhes.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

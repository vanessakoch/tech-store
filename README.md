# Tech Store 🛍️

Uma aplicação de e-commerce desenvolvida com **Next.js, TypeScript e Tailwind CSS**, com foco em praticar construção de interfaces modernas, componentização e gerenciamento de estado. Usando a DummyJSON API.

O projeto simula uma experiência completa de compra, desde a navegação pelos produtos até o checkout e a confirmação do pedido.

## 🔗 Live Demo

[View the live project](https://tech-store-57brhciji-vahnkoch-3682s-projects.vercel.app/)

## ✨ Funcionalidades

* Listagem de produtos
* Busca e filtragem de produtos por nome, marca ou categoria
* Página de detalhes do produto
* Favoritar um produto ou remover de favoritos
* Adição/Remoção de produtos ao carrinho
* Alteração da quantidade de produtos
* Carrinho persistente utilizando Zustand e `localStorage`
* Formulário de checkout utilizando React Hook Form
* Validação dos campos do formulário
* Resumo do pedido
* Página de confirmação da compra
* Layout responsivo

## 🛠️ Tecnologias

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Zustand**
* **shadcn/ui**
* **React Hook Form**
* **Lucide React**
* **DummyJSON API**

### Next.js

* App Router
* Rotas dinâmicas
* Layouts
* Client Components
* `next/image`
* `next/link`
* `useRouter`

### React

* Componentização
* Criação de componentes reutilizáveis
* Props e tipagem com TypeScript
* Gerenciamento de formulários
* Hooks

### Zustand

O carrinho de compras é gerenciado globalmente utilizando Zustand.

O store é responsável por:

* Adicionar produtos
* Remover produtos
* Alterar quantidades
* Limpar o carrinho
* Armazenar os dados do último pedido
* Controlar as notificações do carrinho

Foi utilizado o middleware `persist` para manter os produtos do carrinho salvos no `localStorage`, mesmo após atualizar ou fechar a página.

## 🛒 Fluxo da aplicação

A aplicação possui um fluxo completo de compra:

```text
Home
  ↓
Catálogo de produtos
  ↓
Detalhes do produto
  ↓
Adicionar ao carrinho
  ↓
Carrinho
  ↓
Checkout
  ↓
Preenchimento e validação do formulário
  ↓
Confirmação do pedido
```

## 💳 Checkout

O checkout é **demonstrativo** e não realiza pagamentos reais.

O formulário possui validações para:

* E-mail
* Nome
* Sobrenome
* Endereço
* Cidade
* CEP
* Número do cartão
* Data de validade
* CVV
* Nome no cartão

Após o envio do formulário, o pedido é criado de forma simulada, o carrinho é limpo e o usuário é direcionado para a página de confirmação.

## 🚀 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/vanessakoch/tech-store.git
```

Entre na pasta:

```bash
cd tech-store
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```


## 👩‍💻 Sobre o projeto

Este projeto faz parte do meu portfólio e foi desenvolvido para praticar **React, Next.js, TypeScript, gerenciamento de estado e construção de interfaces de e-commerce**.

---

⭐ Desenvolvido por **Vanessa Koch**

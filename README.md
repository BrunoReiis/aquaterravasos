# AquaTerra Vasos

Landing page de loja de vasos desenvolvida com Next.js e HeroUI.

O projeto foi customizado para vitrine de produtos por categoria, com foco em navegação simples, visual moderno e contato direto via WhatsApp.

## Visao geral

- Logo personalizada no topo e no rodape
- Banner hero com imagem de fundo
- Menu de categorias
	- desktop: menu lateral fixo
	- mobile: barra horizontal rolavel
- Grid de produtos com cards
- Modal de detalhes por produto
	- descricao
	- preco
	- especificacoes (tamanho, origem, material e uso)
- Botao de compra com redirecionamento para WhatsApp
- Footer com dados da empresa

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- HeroUI v3
- Tailwind CSS v4

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Rode o projeto em desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```text
http://localhost:3000
```

## Scripts disponiveis

- desenvolvimento: `npm run dev`
- build de producao: `npm run build`
- iniciar em producao: `npm run start`
- lint: `npm run lint`

## Estrutura principal

- [app/layout.tsx](app/layout.tsx): metadata, estrutura global da pagina e icone da guia
- [app/page.tsx](app/page.tsx): hero, filtros e listagem de produtos
- [components/store-header.tsx](components/store-header.tsx): topo do site
- [components/store-footer.tsx](components/store-footer.tsx): rodape com contatos
- [components/product-card.tsx](components/product-card.tsx): card de produto e modal de detalhes
- [components/store-sidebar.tsx](components/store-sidebar.tsx): menu lateral por categorias
- [config/products.ts](config/products.ts): dados de categorias e produtos
- [styles/globals.css](styles/globals.css): tokens de cores e estilos globais
- [public/Assets/Logo.png](public/Assets/Logo.png): logo da marca
- [public/Assets/Vasos.png](public/Assets/Vasos.png): imagem do banner hero

## Personalizacao rapida

### Alterar produtos

Edite [config/products.ts](config/products.ts).

Campos principais por produto:
- nome
- descricao
- preco
- categoria
- tag

### Alterar cores

Edite as variaveis em [styles/globals.css](styles/globals.css):
- `--color-store-green`
- `--color-store-green-dark`
- `--color-store-green-medium`
- `--color-store-green-light`
- tons de bege da loja

### Alterar telefone e WhatsApp

Atualmente, o numero de compra/contato esta configurado como:
- WhatsApp: (11) 98137-3932

Arquivos para ajuste:
- [components/store-header.tsx](components/store-header.tsx)
- [components/store-footer.tsx](components/store-footer.tsx)
- [components/product-card.tsx](components/product-card.tsx)

## Observacoes

- O projeto usa regras Tailwind v4 como `@theme` e `@custom-variant` em [styles/globals.css](styles/globals.css).
- Caso o VS Code mostre aviso de regra CSS desconhecida, o workspace ja esta preparado em [.vscode/settings.json](.vscode/settings.json).

## Licenca

Este projeto usa a licenca MIT. Consulte [LICENSE](LICENSE).

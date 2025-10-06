# Teste técnico

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green)

Este repositório contém o frontend da aplicação em Next.js, preparado para desenvolvimento local, execução containerizada via Docker e deploy em produção. O projeto utiliza SSR e SSG conforme a necessidade das rotas e integra com um backend via REST.

---

## Arquitetura e stack

- **Framework:** Next.js com React 18
- **Linguagem:** JavaScript ou TypeScript
- **Renderização:** SSR em páginas dinâmicas, SSG para conteúdo estático
- **Estilos:** TailwindCSS V4
- **Infra:** Docker e docker-compose
- **Integração:** REST com backend configurável via variáveis de ambiente

---

## Configuração de ambiente

Crie o arquivo `.env.local` a partir de `.env.example`.

| Variável                  | Tipo    | Obrigatória | Descrição                                                | Exemplo                         |
|---------------------------|---------|-------------|----------------------------------------------------------|---------------------------------|
| NEXT_PUBLIC_API_URL       | string  | sim         | URL base da API acessível pelo browser                   | http://localhost:8080/api       |
| NEXT_PUBLIC_APP_NAME      | string  | não         | Nome exibido na interface e metadados                    | Blog                         |
| NODE_ENV                  | string  | não         | Ambiente de execução                                     | development                     |
| PORT                      | number  | não         | Porta do servidor Next.js                                | 3000                            |

> Observação: variáveis com prefixo NEXT_PUBLIC são expostas ao browser. Segredos não devem usar esse prefixo.

---

## 🐳 Instalação com Docker

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-projeto-frontend.git
cd seu-projeto-frontend
```

2. Copie o arquivo de ambiente e configure:

```bash
cp .env.example .env.local
```

Edite .env.local conforme necessário (API base URL, chaves, etc).

Suba os containers com Docker:

```bash
docker-compose up -d
```

Isso iniciará:

frontend: Container Node.js + Next.js

outros serviços: conforme seu docker-compose.yml (opcional)

Acesse a aplicação:

Frontend: http://localhost:3000

## ⚡ Instalação com Node.js (sem Docker)

Clone o projeto:

git clone https://github.com/seu-usuario/seu-projeto-frontend.git
cd seu-projeto-frontend

Instale as dependências:

```bash
npm install
yarn install
cp .env.example .env.local
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em http://localhost:3000.

## ⚡ Comandos úteis do Next.js

Rodar em desenvolvimento:

```bash
npm run dev
```

Build para produção:

```bash
npm run build
npm start
```

## 📁 Estrutura do projeto

pages/ # Rotas da aplicação
components/ # Componentes React reutilizáveis
public/ # Arquivos estáticos
styles/ # Arquivos CSS / SCSS
hooks/ # Custom React hooks
context/ # Context API
utils/ # Funções utilitárias
.env.local # Variáveis de ambiente

## 📝 Licença

Este projeto está licenciado sob a MIT License.

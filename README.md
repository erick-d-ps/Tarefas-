# Tarefas Plus

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)

**Tarefas Plus** é uma aplicação web para gerenciamento de tarefas, desenvolvida como parte dos meus estudos com **Next.js**, **TypeScript** e **Firebase**.

💡 Totalmente responsiva e com rotas protegidas.  
👉 Acesse: [https://tarefas-plus-silk.vercel.app/](https://tarefas-plus-silk.vercel.app/)

---

## ✨ Funcionalidades

- 🏠 Página inicial com apresentação da plataforma e contagem de tarefas e comentários.
- 🔐 Autenticação com conta Google via NextAuth.
- 🧑‍💼 Dashboard para gerenciamento, edição e exclusão de suas tarefas.
- ➕ Compartilhamento de tarefas públicas, com comentários de outros usuários.
- ❌ Remoção de tarefas concluídas.
- 💬 Página de detalhes com visualização e gerenciamento de comentários.
- 🔒 Rotas protegidas (como o Dashboard), acessíveis apenas por usuários autenticados.

---

## 🛠️ Tecnologias Utilizadas

- [**Next.js**](https://nextjs.org/), com:
  - `getServerSideProps`: proteção de rotas e verificação de autenticação no lado do servidor.
  - `getStaticProps`: geração de páginas HTML estáticas para melhorar performance.
- [**ReactJS**](https://reactjs.org/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS**](https://tailwindcss.com/): estilização responsiva.
- [**CSS Modules**](https://nextjs.org/docs/13/app/building-your-application/styling/css-modules): escopo local de estilos.
- [**React Icons**](https://react-icons.github.io/react-icons/): biblioteca de ícones.
- [**React Hot Toast**](https://react-hot-toast.com/): notificações visuais.
- [**Firebase**](https://firebase.google.com/):
  - Firestore (banco de dados em tempo real)
- [**NextAuth.js**](https://next-auth.js.org/): autenticação com provedores como Google.

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/erick-d-ps/Tarefas-.git

# Entre no diretório do projeto
cd tarefas-plus

# Instale as dependências
yarn

# Execute o projeto
yarn dev
⚙️ Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as seguintes chaves:

env
Copiar
Editar
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
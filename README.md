# Projeto Demo Reddit

## Descrição do Projeto

Este projeto é um clone moderno do Reddit que oferece uma experiência de usuário envolvente e altamente funcional. Utilizei as tecnologias mais recentes, incluindo Next.js App Router, TypeScript e Tailwind CSS, para criar uma plataforma robusta e esteticamente agradável.

## Principais Funcionalidades

- **Rolagem Infinita para Carregamento Dinâmico de Posts:** Os usuários podem rolar indefinidamente para carregar novos posts dinamicamente, proporcionando uma experiência de navegação ininterrupta.

- **Autenticação usando NextAuth & Google:** Implementei a autenticação usando NextAuth, permitindo aos usuários fazer login com suas contas do Google de forma segura.

- **Feed Personalizado para Usuários Autenticados:** Usuários autenticados têm acesso a um feed personalizado, exibindo posts relevantes com base em suas preferências e atividades passadas.

- **Cache Avançado usando Upstash Redis:** Utilizei Upstash Redis para caching avançado, garantindo uma experiência de usuário mais rápida e eficiente.

- **Atualizações Otimistas para uma Ótima Experiência do Usuário:** Implementei atualizações otimistas para proporcionar aos usuários uma experiência de usuário suave e responsiva, mesmo em situações de rede lentas.

- **Editor de Postagens Bonito e Altamente Funcional:** Desenvolvi um editor de postagens que permite aos usuários criar postagens com formatação avançada, fazer upload de imagens e visualizar prévias de links.

- **Funcionalidade Completa de Comentários com Respostas Aninhadas:** Os usuários podem comentar em postagens e responder a outros comentários de forma aninhada, proporcionando discussões organizadas e interativas.

... e muito mais!

## Dependências

O projeto utiliza várias dependências para garantir seu funcionamento suave. Algumas das principais dependências incluem:

- `@editorjs/code`: ^2.8.0
- `@editorjs/editorjs`: ^2.27.0
- `@editorjs/embed`: ^2.5.3
- `@editorjs/header`: ^2.7.0
- `@editorjs/image`: ^2.8.1
- `@editorjs/inline-code`: ^1.4.0
- `@editorjs/link`: ^2.5.0
- `@editorjs/list`: ^1.8.0
- `@editorjs/paragraph`: ^2.9.0
- `@editorjs/table`: ^2.2.1
- `@hookform/resolvers`: ^3.1.0
- `@mantine/hooks`: ^6.0.13
- `@next-auth/prisma-adapter`: ^1.0.6
- `@prisma/client`: ^4.14.1
- `@radix-ui/react-avatar`: ^1.0.4
- `@radix-ui/react-dialog`: ^1.0.5
- `@radix-ui/react-dropdown-menu`: ^2.0.6
- `@radix-ui/react-label`: ^2.0.2
- `@radix-ui/react-slot`: ^1.0.2
- `@radix-ui/react-toast`: ^1.1.5
- `@tailwindcss/forms`: ^0.5.3
- `@tailwindcss/typography`: ^0.5.9
- `@tanstack/react-query`: ^4.29.11
- `@types/node`: ^20.2.5
- `@types/react`: ^18.2.7
- `@types/react-dom`: ^18.2.4
- `@uploadthing/react`: ^4.0.0
- `@upstash/redis`: ^1.21.0
- `autoprefixer`: ^10.4.14
- `axios`: ^1.4.0
- `class-variance-authority`: ^0.6.0
- `cmdk`: ^0.2.0
- `date-fns`: ^2.30.0
- `editorjs-react-renderer`: ^3.5.1
- `eslint`: ^8.41.0
- `eslint-config-next`: ^13.4.4
- `lodash.debounce`: ^4.0.8
- `lucide-react`: ^0.221.0
- `nanoid`: ^4.0.2
- `next`: ^13.4.4
- `next-auth`: ^4.22.1
- `postcss`: ^8.4.23
- `prisma`: ^4.14.1
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-dropzone`: ^14.2.3
- `react-hook-form`: ^7.44.2
- `react-textarea-autosize`: ^8.4.1
- `server-only`: ^0.0.1
- `sharp`: ^0.32.1
- `tailwind-merge`: ^1.12.0
- `tailwindcss`: ^3.3.2
- `tailwindcss-animate`: ^1.0.5
- `typescript`: ^5.0.4
- `uploadthing`: ^4.0.0
- `zod`: ^3.21.4

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis e seus respectivos valores:

   ```env
   DATABASE_URL=sua_url_do_banco_de_dados
   NEXTAUTH_SECRET=sua_chave_secreta_para_nextauth

   GOOGLE_CLIENT_ID=seu_id_do_cliente_google
   GOOGLE_CLIENT_SECRET=sua_chave_secreta_do_cliente_google

   UPLOADTHING_SECRET=sua_chave_secreta_do_uploadthing
   UPLOADTHING_APP_ID=seu_id_do_aplicativo_uploadthing

   REDIS_URL=sua_url_do_servidor_redis
   REDIS_SECRET=sua_chave_secreta_do_redis
   ```

   Certifique-se de substituir `sua_url_do_banco_de_dados`, `sua_chave_secreta_para_nextauth`, `seu_id_do_cliente_google`, `sua_chave_secreta_do_cliente_google`, `sua_chave_secreta_do_uploadthing`, `seu_id_do_aplicativo_uploadthing` e `sua_url_do_servidor_redis` pelos valores corretos.

3. Execute o seguinte comando para instalar as dependências do projeto:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse a plataforma em `http://localhost:3000` e comece a explorar e interagir com as postagens e discussões na comunidade Breadit.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## App Description

This is simple demo app demonstrating use of NextJS v14 with TailwindCSS, Apollo Client and GraphQL (including graphql-codegen). App is using public Star Wars API: https://studio.apollographql.com/public/star-wars-swapi/variant/current/explorer

### Tech stack

[https://nextjs.org/docs](NextJS) was chosen as it is is one of the leading ReactJS frameworks which allows for Server Side rendering and Client Side Rendering, it is widly supported and has big community.
[https://tailwindcss.com/docs/installation](TailWindCSS) was chosen as it is one of the best utility first CSS libraries, it allows for rapid development.
[https://ui.shadcn.com/](shadcn/ui) is React/TailWindCSS component library which offers many lightweight components to kick start any react project.
[https://www.apollographql.com/docs/](ApolloGraphQL) is one of the most popular GraphQL clients, with large community support (other options to consider [https://www.prisma.io/orm](Prisma) and [https://houdinigraphql.com/](HoudiniGraphql))

Project uses [https://www.typescriptlang.org/docs/](TypeScript) to ensure type safety, in addition graphql code-gen ensures GraphQL graphs/queries/mutations are type safe when used across the app.

### Trade offs

Depending on the project/app and requirements there are number of ways SSR/CSR balance can be set up, especially in NextJS when consuming the APIs.
There is potential for some case scenarios where API resources could be fetched only in Client and Suspended until resolved while others could be done only on SSR.
While this demo domstrates use case of both to strike the balance of avoiding loaders and layout shifts/blinks and performance by avoiding fetching all data from endpoint all at once

## Local Dev Setup

copy `.env.example` file, rename to `.env` or `.env.local`

run cmd: `npm i` to install npm dependencies

run cmd: `npm run generate-gql` to generate graphql typescript types

run cmd: `npm run dev` to start nextjs in dev mode

## Test

Playwright test are setup and can be run by VSCode extension or terminal by executing:
`npm run test`

## Build

run cmd: `npm run build`

## Running App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

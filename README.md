# Major feature 主要特色

Use `sv` to create demo sveltekit project with server side lucia auth.

使用`sv` 来创建示范的 sveltekit 项目，该项目服务器端使用最新的 lucia auth 例子。

Change lucia auth favorit database structure to entgo.io favorit database. That means all id is auto increasing integer made by database system.

改变 Lucia auth 风格的数据库结构，让他更像 entgo.io 风格的数据库结构。也就是说，所有 id 字段由数据库自动增加的整数生成。

Use drizzle, postgresql as demo.

这里使用 Drizzle 来与 postgresql 交互。

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create lucia-auth-app-with-entgo-favorit-database-structure
```



## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

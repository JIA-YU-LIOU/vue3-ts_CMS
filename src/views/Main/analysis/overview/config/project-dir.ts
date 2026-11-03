export const projectDir = `
├── public
│   └── favicon.ico
├── scripts
│   └── generate-project-info.mjs
├── src
│   ├── assets
│   │   ├── css
│   │   │   ├── _common.scss
│   │   │   ├── _reset.scss
│   │   │   └── index.scss
│   │   └── img
│   │       ├── login-bg.jpg
│   │       ├── login-bg.svg
│   │       └── logo.webp
│   ├── components
│   │   ├── login
│   │   │   ├── LoginAccount.vue
│   │   │   ├── LoginPanel.vue
│   │   │   └── LoginPhone.vue
│   │   └── main
│   │       ├── analysis
│   │       │   ├── dashboard
│   │       │   │   ├── ChartCard.vue
│   │       │   │   └── CountCard.vue
│   │       │   └── overview
│   │       │       ├── Card.vue
│   │       │       ├── Code.vue
│   │       │       ├── Description.vue
│   │       │       └── TextLink.vue
│   │       ├── aside
│   │       │   └── MainMenu.vue
│   │       ├── echarts
│   │       │   ├── data
│   │       │   │   ├── coordinateData.ts
│   │       │   │   └── taiwan.json
│   │       │   ├── BarEchart.vue
│   │       │   ├── BaseEchart.vue
│   │       │   ├── LineEchart.vue
│   │       │   ├── MapEchart.vue
│   │       │   ├── PieEchart.vue
│   │       │   └── RoseEchart.vue
│   │       ├── header
│   │       │   ├── BreadCrumb.vue
│   │       │   ├── Header.vue
│   │       │   └── UserInfo.vue
│   │       └── page
│   │           ├── pageContent.vue
│   │           ├── pageModal.vue
│   │           └── PageSearch.vue
│   ├── global
│   │   ├── constants.ts
│   │   └── register-icon.ts
│   ├── hooks
│   │   ├── useEchart.ts
│   │   ├── usePageContent.ts
│   │   ├── usePageModal.ts
│   │   └── usePermissions.ts
│   ├── router
│   │   ├── main
│   │   │   ├── analysis
│   │   │   │   ├── dashboard
│   │   │   │   │   └── dashboard.ts
│   │   │   │   └── overview
│   │   │   │       └── overview.ts
│   │   │   ├── product
│   │   │   │   ├── category
│   │   │   │   │   └── category.ts
│   │   │   │   └── list
│   │   │   │       └── list.ts
│   │   │   ├── story
│   │   │   │   ├── chat
│   │   │   │   │   └── chat.ts
│   │   │   │   └── list
│   │   │   │       └── list.ts
│   │   │   └── system
│   │   │       ├── department
│   │   │       │   └── department.ts
│   │   │       ├── menu
│   │   │       │   └── menu.ts
│   │   │       ├── role
│   │   │       │   └── role.ts
│   │   │       └── user
│   │   │           └── user.ts
│   │   └── index.ts
│   ├── service
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── main
│   │   │   ├── system
│   │   │   │   ├── analysis.ts
│   │   │   │   └── system.ts
│   │   │   ├── main.ts
│   │   │   └── types.ts
│   │   ├── request
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── stores
│   │   ├── login
│   │   │   └── login.ts
│   │   └── main
│   │       ├── system
│   │       │   ├── analysis.ts
│   │       │   └── system.ts
│   │       ├── index.ts
│   │       └── main.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   ├── cache.ts
│   │   ├── convertData.ts
│   │   ├── format.ts
│   │   ├── mapMenus.ts
│   │   ├── message.ts
│   │   └── type.ts
│   ├── views
│   │   ├── Login
│   │   │   └── Login.vue
│   │   ├── Main
│   │   │   ├── analysis
│   │   │   │   ├── dashboard
│   │   │   │   │   └── dashboard.vue
│   │   │   │   └── overview
│   │   │   │       ├── config
│   │   │   │       │   ├── dependencies.ts
│   │   │   │       │   ├── dev-dependencies.ts
│   │   │   │       │   ├── project-dir.ts
│   │   │   │       │   └── technology-stacks.ts
│   │   │   │       └── overview.vue
│   │   │   ├── product
│   │   │   │   ├── category
│   │   │   │   │   └── category.vue
│   │   │   │   └── list
│   │   │   │       └── list.vue
│   │   │   ├── story
│   │   │   │   ├── chat
│   │   │   │   │   └── chat.vue
│   │   │   │   └── list
│   │   │   │       └── list.vue
│   │   │   ├── system
│   │   │   │   ├── department
│   │   │   │   │   ├── config
│   │   │   │   │   │   ├── content.config.ts
│   │   │   │   │   │   ├── modal.config.ts
│   │   │   │   │   │   └── search.config.ts
│   │   │   │   │   └── department.vue
│   │   │   │   ├── menu
│   │   │   │   │   ├── config
│   │   │   │   │   │   └── content.config.ts
│   │   │   │   │   └── menu.vue
│   │   │   │   ├── role
│   │   │   │   │   ├── config
│   │   │   │   │   │   ├── content.config.ts
│   │   │   │   │   │   ├── modal.config.ts
│   │   │   │   │   │   └── search.config.ts
│   │   │   │   │   └── role.vue
│   │   │   │   └── user
│   │   │   │       ├── config
│   │   │   │       │   ├── content.config.ts
│   │   │   │       │   ├── modal.config.ts
│   │   │   │       │   └── search.config.ts
│   │   │   │       └── user.vue
│   │   │   └── Main.vue
│   │   └── NotFound
│   │       └── NotFound.vue
│   ├── App.vue
│   └── main.ts
├── .editorconfig
├── .env.development
├── .env.production
├── .eslintcache
├── .gitattributes
├── .gitignore
├── .oxlintrc.json
├── .prettierrc.json
├── auto-imports.d.ts
├── components.d.ts
├── env.d.ts
├── eslint.config.ts
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
`

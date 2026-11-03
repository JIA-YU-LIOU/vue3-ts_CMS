import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.resolve(__dirname, '..')

// ========================================
// 設定
// ========================================

const configDir = path.join(rootDir, 'src/views/Main/analysis/overview/config')

const excludeDirs = new Set(['node_modules', '.git', '.vscode', 'dist', 'coverage'])

// ========================================
// 工具函式
// ========================================

const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf-8')
}

const formatDependencies = (dependencies = {}) => {
  return Object.entries(dependencies)
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
    .map(
      ([name, version]) => `  {
    name: '${name}',
    description: '${version}',
  },`,
    )
    .join('\n')
}

// ========================================
// 1. 讀取 package.json
// ========================================

const packageJsonPath = path.join(rootDir, 'package.json')

const packageJson = readJson(packageJsonPath)

const dependencies = packageJson.dependencies ?? {}
const devDependencies = packageJson.devDependencies ?? {}

// ========================================
// 2. 產生 dependencies.ts
// ========================================

const dependenciesContent = `import type { DescriptionProp } from '@/types'

export const dependencies: DescriptionProp[] = [
${formatDependencies(dependencies)}
]
`

writeFile(path.join(configDir, 'dependencies.ts'), dependenciesContent)

// ========================================
// 3. 產生 dev-dependencies.ts
// ========================================

const devDependenciesContent = `import type { DescriptionProp } from '@/types'

export const devDependencies: DescriptionProp[] = [
${formatDependencies(devDependencies)}
]
`

writeFile(path.join(configDir, 'dev-dependencies.ts'), devDependenciesContent)

// ========================================
// 4. 產生 project-dir.ts
// ========================================

function generateTree(dir, prefix = '') {
  const items = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => !excludeDirs.has(item.name))
    .sort((a, b) => {
      // 資料夾排在前面
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1
      }

      return a.name.localeCompare(b.name)
    })

  let result = ''

  items.forEach((item, index) => {
    const isLast = index === items.length - 1

    const symbol = isLast ? '└── ' : '├── '

    const nextPrefix = prefix + (isLast ? '    ' : '│   ')

    result += `${prefix}${symbol}${item.name}\n`

    if (item.isDirectory()) {
      result += generateTree(path.join(dir, item.name), nextPrefix)
    }
  })

  return result
}

const projectTree = generateTree(rootDir)

const projectDirContent = `export const projectDir = \`
${projectTree}\`
`

writeFile(path.join(configDir, 'project-dir.ts'), projectDirContent)

// ========================================
// 5. 自動判斷技術棧
// ========================================

const technologyMap = [
  {
    name: 'Vue 3',
    packages: ['vue'],
  },
  {
    name: 'TypeScript',
    packages: ['typescript'],
  },
  {
    name: 'Vite',
    packages: ['vite'],
  },
  {
    name: 'Pinia',
    packages: ['pinia'],
  },
  {
    name: 'Vue Router',
    packages: ['vue-router'],
  },
  {
    name: 'Axios',
    packages: ['axios'],
  },
  {
    name: 'Element Plus',
    packages: ['element-plus'],
  },
  {
    name: 'ECharts',
    packages: ['echarts'],
  },
  {
    name: 'Highlight.js',
    packages: ['highlight.js'],
  },
  {
    name: 'ESLint',
    packages: ['eslint'],
  },
  {
    name: 'Prettier',
    packages: ['prettier'],
  },
  {
    name: 'Stylelint',
    packages: ['stylelint'],
  },
  {
    name: 'Husky',
    packages: ['husky'],
  },
  {
    name: 'Commitlint',
    packages: ['@commitlint/cli'],
  },
  {
    name: 'Commitizen',
    packages: ['commitizen'],
  },
]

const allPackages = {
  ...dependencies,
  ...devDependencies,
}

const technologyStacks = technologyMap
  .filter((technology) => {
    return technology.packages.some((packageName) => packageName in allPackages)
  })
  .map((technology) => {
    return {
      name: technology.name,
      description:
        allPackages[technology.packages.find((packageName) => packageName in allPackages)],
    }
  })

const technologyStacksContent = `
export const technologyStacks = [
${technologyStacks
  .map(
    ({ name, description }) => `  {
    title: '${name}',
    desp: '${description}',
  },`,
  )
  .join('\n')}
]
`

writeFile(path.join(configDir, 'technology-stacks.ts'), technologyStacksContent)

// ========================================
// 完成
// ========================================

console.log('✅ Project info generated successfully!')
console.log('')
console.log('Generated:')
console.log('  ✓ dependencies.ts')
console.log('  ✓ dev-dependencies.ts')
console.log('  ✓ project-dir.ts')
console.log('  ✓ technology-stacks.ts')

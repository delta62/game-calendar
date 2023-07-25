import * as fs from 'fs/promises'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'
import clean from '@akrc/esbuild-plugin-clean'
import { copy } from 'esbuild-plugin-copy'
import * as typeCheck from '@jgoz/esbuild-plugin-typecheck'
import chalk from 'chalk'

let pkgFile = await fs.readFile('./package.json', { encoding: 'utf-8' })
let pkg = JSON.parse(pkgFile)

export let appName = () => pkg.name

export let logger = {
  info(msg) {
    console.log(msg.trim())
  },
  error(msg) {
    console.error(`${chalk.red('✖')} ${msg.trim()}`)
  },
  warn(msg) {
    console.warn(chalk.yellow(msg.trim()))
  },
  success(msg) {
    console.log(`✅ ${msg.trim()}`)
  },
}

export let buildOptions = ({
  isProduction,
  plugins = [],
  metafile = false,
}) => {
  let watch = !isProduction
  let host = isProduction ? 'https://when.hockey' : 'http://localhost:8080'

  return {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: isProduction,
    metafile,
    sourcemap: !isProduction,
    outdir: 'dist',
    loader: {
      '.svg': 'text',
    },
    define: {
      API_ROOT: '"https://nhlcal-api.fly.dev"',
      FRONTEND_HOST: JSON.stringify(host),
      PRODUCTION: JSON.stringify(isProduction),
      VERSION: `"${pkg.version}"`,
    },
    plugins: [
      clean({
        patterns: ['./dist/*'],
      }),
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: 'static/**/*',
            to: 'dist',
            watch,
          },
        ],
        watch,
      }),
      sassPlugin({
        loadPaths: ['src/styles'],
        transform: postcssModules({
          localsConvention: 'camelCaseOnly',
        }),
      }),
      typeCheck.typecheckPlugin({ watch, logger }),
      ...plugins,
    ],
  }
}

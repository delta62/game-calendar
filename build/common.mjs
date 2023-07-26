import * as fs from 'fs/promises'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'
import clean from '@akrc/esbuild-plugin-clean'
import { copy } from 'esbuild-plugin-copy'
import * as typeCheck from '@jgoz/esbuild-plugin-typecheck'
import chalk from 'chalk'

let pkgFile = await fs.readFile('./package.json', { encoding: 'utf-8' })
let pkg = JSON.parse(pkgFile)
let cfgFile = await fs.readFile('./firebase-config.json', { encoding: 'utf-8' })
let cfg = JSON.parse(cfgFile)

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
      __PROJECT_ID__: `"${cfg.__PROJECT_ID__}"`,
      __API_KEY__: `"${cfg.__API_KEY__}"`,
      DEVELOPMENT: JSON.stringify(!isProduction),
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

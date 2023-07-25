#!/usr/bin/env node

let startTime = Date.now()

import { appName, buildOptions } from './common.mjs'
import { build } from 'esbuild'
import { writeFile } from 'fs/promises'
import chalk from 'chalk'

let { metafile } = await build(
  buildOptions({ isProduction: true, metafile: true })
)

await writeFile('dist/meta.json', JSON.stringify(metafile))

let elapsedMs = Date.now() - startTime

console.log(
  chalk.green(`✅ Built ${appName()} in ${chalk.blue(`${elapsedMs}ms`)}`)
)

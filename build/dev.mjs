#!/usr/bin/env node

import { appName, buildOptions, logger } from './common.mjs'
import serve from './serve.mjs'
import { context } from 'esbuild'
import chalk from 'chalk'

let incrementalBuildReports = {
  name: 'incrementalBuildReports',
  setup(build) {
    build.onStart(() => {
      console.log('🔄 Building...')
    })
    build.onEnd(({ errors, warnings }) => {
      for (let error in errors) {
        console.error(chalk.red(error))
      }

      for (let warning in warnings) {
        console.error(chalk.yellow(warning))
      }

      if (errors.length === 0) {
        logger.success('Bundle completed')
      } else if (errors.length === 1) {
        logger.error('Bundle failed with an error')
      } else {
        logger.error(`Bundle failed with ${errors.length} errors`)
      }
    })
  },
}

let ctx = await context(
  buildOptions({ isProduction: false, plugins: [incrementalBuildReports] })
)

await ctx.watch()
serve(ctx, 'dist', 8080)

console.log(chalk.green(`💻 Serving ${appName()} on 0.0.0.0:8080`))
console.log('🔍 Watching for changes...')

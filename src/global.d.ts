// These are provided to the project via firebase-config.json
declare const __PROJECT_ID__: string
declare const __API_KEY__: string

// Declared in the build script
declare const DEVELOPMENT: boolean

// Required for CSS modules to type check
declare module '*.scss' {
  const content: any
  export default content
}

declare module 'redux-localstorage' {
  import { StoreEnhancer } from 'redux'

  export interface Config {
    key?: string
  }

  declare function persistState(
    paths?: string | string[],
    config?: Config
  ): StoreEnhancer<unknown, {}>

  export default persistState
}

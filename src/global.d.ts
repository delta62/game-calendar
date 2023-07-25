// These are provided to the project via firebase-config.json
declare const __PROJECT_ID__: string
declare const __API_KEY__: string

// Required for CSS modules to type check
declare module '*.scss' {
  const content: any
  export default content
}

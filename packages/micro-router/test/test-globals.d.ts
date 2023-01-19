// As this file isn't in the "include": [] section of tsconfig.json, editors
// have trouble resolving definitions in node_modules. We can keep editors happy
// while also skipping test compilation during incremental builds by pulling
// the defs in here.

/// <reference path="../node_modules/@types/jest/index.d.ts" />

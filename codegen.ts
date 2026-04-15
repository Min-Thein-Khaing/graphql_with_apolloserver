import { CodegenConfig } from './node_modules/@graphql-codegen/cli/typings/config.d';
const config :CodegenConfig  = {
    schema: "src/graphql/schema.graphql",
    generates: {
        "./src/types.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        }
    }
}
export default config;
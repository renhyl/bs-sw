import { CodegenConfig } from '@graphql-codegen/cli'

/**
 * codegen config supports multiple API schemas
 */
const config: CodegenConfig = {
    overwrite: true,
    config: {
        avoidOptionals: true,
        scalars: {
            DateTime: 'string'
        }
    },
    generates: {
        'src/app/gql/__generated__/types.ts': {
            schema: [process.env.NEXT_PUBLIC_SW_API_URL as string],
            plugins: ['typescript']
        },
        /**
         * Star Wars GraphQL API
         */
        starWars: {
            schema: process.env.NEXT_PUBLIC_SW_API_URL as string,
            documents: 'src/app/gql/**/*.starWars.{gql,graphql}',
            plugins: ['typescript-operations', 'typed-document-node'],
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.generated.ts',
                baseTypesPath: '~@/app/gql/__generated__/types'
            }
        }
    }
}

export default config

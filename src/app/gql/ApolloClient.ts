import { HttpLink } from '@apollo/client'
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache
} from '@apollo/experimental-nextjs-app-support'

export const { query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_SW_API_URL
        })
    })
})

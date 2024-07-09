'use client'

import { ApolloLink, HttpLink, Operation } from '@apollo/client'
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache
} from '@apollo/experimental-nextjs-app-support'

const starWarsAPILink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SW_API_URL
})
type LinkConditionPair = {
    condition: (operation: Operation) => boolean
    link: HttpLink
}

function getApolloLink(pairs: LinkConditionPair[]): ApolloLink {
    if (pairs.length === 1) {
        return pairs[0].link
    } else {
        const [firstPair, ...restPairs] = pairs
        return ApolloLink.split(firstPair.condition, firstPair.link, getApolloLink(restPairs))
    }
}

const client = () =>
    new ApolloClient({
        cache: new InMemoryCache(),
        link: getApolloLink([
            {
                condition: (operation: Operation) => {
                    return operation.operationName.toLocaleLowerCase().includes('star-wars')
                },
                link: starWarsAPILink
            }
        ])
    })

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloNextAppProvider makeClient={client}>{children}</ApolloNextAppProvider>
}

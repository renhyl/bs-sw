import { query, PreloadQuery } from '@/app/gql/ApolloClient'
import { AllPeopleDocument } from '@/app/gql/queries/allPeople/allPeople.starWars.generated'
import StarWarsCharactersRSC from '@/lib/components/StarWarsCharacters/StarWarsCharactersRSC'
import StarWarsCharacters from '@/lib/components/StarWarsCharacters/StarWarsCharacters'
import { Suspense } from 'react'

export default async function Page() {
    /**
     * using initial SSR api call to obtain first page of data (pagination)
     */
    const { data } = await query({
        query: AllPeopleDocument,
        variables: { first: 5 }
    })

    /**
     * using server side rendered component to prevent layout shift
     */

    return (
        <div className="container">
            <div className="flex flex-col text-center">
                <PreloadQuery query={AllPeopleDocument}>
                    <Suspense
                        fallback={<StarWarsCharactersRSC currentPage={1} perPage={5} data={data} />}
                    >
                        {/* <Suspense fallback={<>loading..</>}> */}
                        <StarWarsCharacters data={data} />
                    </Suspense>
                </PreloadQuery>
            </div>
        </div>
    )
}

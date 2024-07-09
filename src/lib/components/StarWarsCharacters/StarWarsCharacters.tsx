'use client'

import React, { useState } from 'react'

import { AllPeopleDocument } from '@/app/gql/queries/allPeople/allPeople.starWars.generated'
import { useSuspenseQuery } from '@apollo/client'
import CharacterList from '@/lib/components/CharacterList/CharacterList'

interface IStarWarsCharacters {
    [rest: string]: any
}

/**
 * Client Side Star Warch Chracters component
 * @param props
 * @returns
 */
const StarWarsCharacters: React.FC<IStarWarsCharacters> = (props) => {
    /**
     * using suspense query to obtain records from API, this will cache and re-render DOM
     */
    const { data } = useSuspenseQuery(AllPeopleDocument)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const perPage = 5

    return (
        <CharacterList
            {...props}
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
        />
    )
}

export default StarWarsCharacters

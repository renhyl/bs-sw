import React, { useMemo } from 'react'

import { AllPeopleQuery } from '@/app/gql/queries/allPeople/allPeople.starWars.generated'
import Paginator from '@/lib/components/Paginator/Paginator'

interface IStarWarsCharacters {
    data: AllPeopleQuery
    currentPage: number
    perPage: number
    setCurrentPage?: (page: number) => void
    [rest: string]: any
}

const CharacterList: React.FC<IStarWarsCharacters> = ({
    data,
    currentPage = 1,
    perPage = 5,
    setCurrentPage,
    ...rest
}) => {
    const totalCount = data?.allPeople?.totalCount || 1

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * perPage
        const lastPageIndex = firstPageIndex + perPage
        return data?.allPeople?.edges?.slice(firstPageIndex, lastPageIndex) || []
    }, [data, currentPage, perPage])

    return (
        <div className="flex flex-col gap-1">
            <ul className="characters-list" {...rest}>
                {currentData.map((character, index: number) => (
                    <li key={`person-${index}`}>{character?.node?.name}</li>
                ))}
            </ul>

            <Paginator
                perPage={perPage}
                currentPage={currentPage}
                totalCount={totalCount}
                setCurrentPage={setCurrentPage && setCurrentPage}
            />
        </div>
    )
}

export default CharacterList

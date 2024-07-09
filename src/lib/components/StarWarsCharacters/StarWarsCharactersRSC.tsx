import { AllPeopleQuery } from '@/app/gql/queries/allPeople/allPeople.starWars.generated'
import CharacterList from '@/lib/components/CharacterList/CharacterList'

interface IStarWarsCharacters {
    data: AllPeopleQuery
    currentPage: number
    setCurrentPage?: (pageNumber: number) => void
    perPage: number
    [rest: string]: any
}

/**
 * Server Side Star Wars Characters component
 * @param param0
 * @returns
 */
const StarWarsCharactersRSC: React.FC<IStarWarsCharacters> = ({
    data,
    currentPage = 1,
    perPage = 5,
    setCurrentPage = () => {},
    ...rest
}) => {
    return <CharacterList data={data} currentPage={currentPage} perPage={perPage} {...rest} />
}

export default StarWarsCharactersRSC

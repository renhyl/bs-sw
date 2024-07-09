import Link from 'next/link'

export default async function Home() {
    return (
        <div className="container">
            <h1>BS Star Wars</h1>
            <div className="flex flex-col text-center">
                <Link
                    href="/characters"
                    className="underline hover:no-underline"
                    aria-label="click to view start wars characters"
                    title="click to view star wars characters"
                >
                    click to view star wars characters
                </Link>
            </div>
        </div>
    )
}

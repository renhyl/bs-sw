import Link from 'next/link'

export default async function Home() {
    return (
        <div className="container">
            <div className="flex flex-col text-center">
                <Link href="/characters" className="underline hover:no-underline">
                    click to view star wars characters
                </Link>
            </div>
        </div>
    )
}

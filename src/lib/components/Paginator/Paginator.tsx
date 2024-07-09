'use client'

import React, { useMemo } from 'react'

import { cn } from '@/lib/utils'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationLink,
    PaginationPrevious,
    PaginationEllipsis
} from '@/components/ui/pagination'

interface IPaginator {
    perPage: number
    currentPage: number
    setCurrentPage?: (page: number) => void
    totalCount: number
}

const Paginator: React.FC<IPaginator> = ({
    perPage = 5,
    currentPage,
    setCurrentPage = () => {},
    totalCount = 1
}) => {
    const pageCount = Math.ceil(totalCount ? totalCount / perPage : 1)
    const useBeforeElipsis = currentPage > 2
    const useAfterElipsis = currentPage + 2 < pageCount
    const getPageNumbers = useMemo(() => {
        const pageNumbers = []
        for (let i = Math.max(0, currentPage - 3); i <= Math.min(pageCount, currentPage + 1); i++) {
            if (i < pageCount) pageNumbers.push(i)
        }

        return pageNumbers
    }, [currentPage, pageCount])

    const paginationPages = (currentPage: number, onPageChange: (page: number) => void) => {
        return (
            <>
                {useBeforeElipsis && <PaginationEllipsis />}
                {getPageNumbers.map((index) => (
                    <PaginationLink
                        key={index}
                        href="#"
                        className={cn(index + 1 === currentPage ? 'bg-green-200' : '')}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </PaginationLink>
                ))}
                {useAfterElipsis && <PaginationEllipsis />}
            </>
        )
    }

    const handlPrevPage = () => {
        if (currentPage <= 1) return

        setCurrentPage && setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage >= pageCount) return

        setCurrentPage && setCurrentPage(currentPage + 1)
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlPrevPage}
                        className={
                            currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''
                        }
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>
                {paginationPages(currentPage, (page: number) => setCurrentPage(page))}
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={currentPage === pageCount}
                        onClick={handleNextPage}
                        className={
                            currentPage === pageCount
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : ''
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default Paginator

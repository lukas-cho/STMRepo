"use client";

import useSWR from "swr";
import axios from "axios";
import {useState} from "react";
import {DogBreedsById} from "@/types/DogBreed";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const getPageNumbers = (current:number, total:number): number[] => {
    const ranged = 2;
    const range = [];

    const start = Math.max(1, current - ranged); // 13
    const end = Math.min(total, current + ranged); // 17

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    return range;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function BreedsPagination() {
    const [page, setPage] = useState(1);

    const { data, error, isLoading } = useSWR(
        `https://dogapi.dog/api/v2/breeds?page[number]=${page}`,
        fetcher
    )

    const totalPages = data?.meta.pagination.last || data?.meta.pagination.current;

    const handlePageChange = (newPage: number)=> {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">🐶 Dog Breeds</h1>
            <p> Current page: {page}</p>
            {
                isLoading ? (
                    <p> Loading... </p>
                ) : (
                    error ? (
                        <p> Error fetching data.</p>
                    ) : (
                        <ul className="space-y-2 mb-4">
                            {data.data.map((breed: DogBreedsById) => (
                                <li key={breed.id} className="border p-2 rounded">
                                    {breed.attributes.name}
                                </li>
                            ))}
                        </ul>
                    )
                )
            }
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(page - 1)} className="cursor-pointer" />
                    </PaginationItem>

                    { getPageNumbers(page, totalPages).map(n => (
                        <PaginationItem key={n} className="cursor-pointer">
                            <PaginationLink onClick={() => handlePageChange(n)}>
                                {n}
                            </PaginationLink>
                        </PaginationItem>
                    )) }

                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(page + 1)} className="cursor-pointer" />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    )
}
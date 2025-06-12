"use client";

import useSWR from "swr";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {DogBreedsById} from "@/types/DogBreed";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function BreedsInfinite() {

    const [page, setPage] = useState(1);
    const [breeds, setBreeds] = useState<DogBreedsById[]>([]);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    const { data, error, isLoading } = useSWR(
        `https://dogapi.dog/api/v2/breeds?page[number]=${page}`,
        fetcher
    )

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (data?.data?.length) {
            setBreeds(prev => {
                const seen = new Set(prev.map(breed => breed.id));
                const newItems = data.data.filter((b: DogBreedsById) => !seen.has(b.id));
                return [...prev, ...newItems];
            })
            if (!data.meta.pagination.last) setIsLastPage(true);
        }

    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoading && !isLastPage) {
                setPage(prev => prev + 1);
            }
        })

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.disconnect();
            }
        }
    }, [isLoading, isLastPage])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">🐶 Dog Breeds Infinite scroll</h1>
            {breeds.map(breed => (
                <div key={breed.id} className="min-h-[100px] p-2 m-2 border border-black">
                    <h3>{breed.attributes.name}</h3>
                </div>
            ))}
            { isLoading && <p> Loading... </p>}
            { isLastPage && <p> No more breeds to load. </p>}
            <div ref={observerRef} style={{height: 1}} />
        </div>
    )
}
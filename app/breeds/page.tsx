'use client';

import DogList from '@/components/DogList';
import SearchBar from '@/components/SearchBar';
import { DogBreed } from '@/types/DogBreed';
import React, { useState } from 'react'
import { useBreeds } from './BreedsContext';

const Breeds = () => {
  const { breeds } = useBreeds();
    const [filteredBreeds, setFilteredBreeds] = useState<DogBreed[]>(breeds);

    function handleSearch(query: string) {
        const filtered = breeds.filter((breed) =>
            breed.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBreeds(filtered);
    }

    return (
        <main className="w-full">
            <section className="max-w-4xl mx-auto px-4 py-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-700 mb-2">🐶 Dog Breed List</h1>
                    <p className="text-gray-600 text-base">
                        Search for your favorite dog breeds and click for more details!
                    </p>
                </div>
                <div className="mb-6">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <DogList breeds={filteredBreeds} />
            </section>
        </main>
    );
}

export default Breeds
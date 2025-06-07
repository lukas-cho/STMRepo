import * as DogService from './dogBreedService';
import {DogBreed} from "@/types/DogBreed";
import {prisma} from "@/lib/prismaClient";

export interface FavoriteBreed {
    id: string;
    breeds_id: string;
    memo?: string;
    created_at: string;
}

export async function getAllFavoriteBreeds(): Promise<DogBreed[]> {
    const favoriteBreeds =  await prisma.favorite_breeds.findMany({
        orderBy: { created_at: 'asc' },
    });

    // @ts-ignore
    const favoriteBreedIds = new Set(favoriteBreeds.map((f:FavoriteBreed) => f.breeds_id));

    const allBreeds = await DogService.fetchAllDogBreeds();

    return allBreeds.filter((breed) =>
        favoriteBreedIds.has(breed.id)
    );
}

export const getFavoriteByBreedId = async (breedId: string) => {
    return prisma.favorite_breeds.findUnique({
        where: {breeds_id: breedId},
    });
};

// Favorite Breed 추가
export function addFavoriteBreed(breeds_id: string, memo?: string): Promise<FavoriteBreed> {
    console.log("id: ", breeds_id, "memo: ", memo)
    return prisma.favorite_breeds.create({
        data: { breeds_id, memo },
    }) as unknown as Promise<FavoriteBreed>;
}

// Favorite Breed 메모 수정
export function updateFavoriteBreedMemo(breeds_id: string, memo: string): Promise<FavoriteBreed> {
    // prisma
    return prisma.favorite_breeds.update({
        where: { breeds_id },
        data: { memo },
    }) as unknown as Promise<FavoriteBreed>;
}

// Favorite Breed 삭제
export function deleteFavoriteBreed(id: string) {
    return prisma.favorite_breeds.delete({
        where: { breeds_id:id },
    });
}

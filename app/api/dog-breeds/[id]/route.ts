import { NextResponse } from 'next/server';
import * as DogBreedService from '@/services/dogBreedService';
import {DogBreedsById} from "@/types/DogBreed";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const { id } =  params;

    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    try {
        const breed: DogBreedsById = await DogBreedService.fetchDogBreedById(id);
        if (!breed) {
            return NextResponse.json({ message: 'Breed not found' }, { status: 404 });
        }
        return NextResponse.json(breed);
    } catch (err) {
        console.error('❌ Failed to fetch dog breed by ID:', err);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

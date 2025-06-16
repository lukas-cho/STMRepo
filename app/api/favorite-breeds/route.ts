import { NextRequest, NextResponse } from 'next/server';
import * as FavoriteBreedService from '@/services/favoriteBreedService';

export async function GET() {
    try {
        const favorites = await FavoriteBreedService.getAllFavoriteBreeds();
        return NextResponse.json(favorites);
    } catch (err) {
        console.error('❌ Failed to fetch favorites:', err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {

    try {
        const { breeds_id, memo } = await req.json();
        if (!breeds_id) {
            return NextResponse.json({ message: 'breeds_id is required' }, { status: 400 });
        }

        const newFavorite = await FavoriteBreedService.addFavoriteBreed(breeds_id, memo);
        return NextResponse.json(newFavorite, { status: 201 });
    } catch (err) {
        console.error('❌ Failed to add favorite:', err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

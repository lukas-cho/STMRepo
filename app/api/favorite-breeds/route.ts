import { NextRequest, NextResponse } from 'next/server';
import * as FavoriteBreedService from '@/services/favoriteBreedService';

export async function PATCH(req: NextRequest, { params }: any) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const { memo } = await req.json();
    const updated = await FavoriteBreedService.updateFavoriteBreedMemo(id, memo);

    if (!updated) {
      return NextResponse.json({ message: 'Favorite not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('❌ Failed to update memo:', err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: any) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const deleted = await FavoriteBreedService.deleteFavoriteBreed(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Favorite not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete favorite breed:', err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

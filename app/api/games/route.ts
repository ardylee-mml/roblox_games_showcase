import { NextResponse } from 'next/server';
import { createGame, getAllGames } from '@/lib/db';

// GET /api/games
export async function GET() {
  try {
    const games = await getAllGames();
    return NextResponse.json(games);
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

// POST /api/games
export async function POST(request: Request) {
  try {
    const game = await request.json();
    const newGame = await createGame(game);
    return NextResponse.json(newGame);
  } catch (error) {
    console.error('Failed to create game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
} 
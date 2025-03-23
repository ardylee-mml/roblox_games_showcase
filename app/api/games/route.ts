import { NextRequest, NextResponse } from "next/server"
import { getAllGames, createGame } from "@/lib/db"

// GET /api/games
export async function GET() {
  try {
    const games = await getAllGames()
    return NextResponse.json(games)
  } catch (error) {
    console.error("Error fetching games:", error)
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    )
  }
}

// POST /api/games
export async function POST(request: NextRequest) {
  try {
    const game = await request.json()
    const newGame = await createGame(game)
    return NextResponse.json(newGame, { status: 201 })
  } catch (error) {
    console.error("Error creating game:", error)
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    )
  }
} 
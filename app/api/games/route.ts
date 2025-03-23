import { NextRequest, NextResponse } from "next/server"
import { getAllGames, createGame } from "@/lib/db"

// GET /api/games
export async function GET() {
  try {
    const games = await getAllGames()
    return NextResponse.json(games)
  } catch (error) {
    console.error("Failed to get games:", error)
    return NextResponse.json(
      { error: "Failed to get games" },
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
    console.error("Failed to create game:", error)
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    )
  }
} 
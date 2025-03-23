import { NextRequest, NextResponse } from "next/server"
import { getGame, updateGame, deleteGame } from "@/lib/db"

// GET /api/games/[id]
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const game = await getGame(context.params.id)
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }
    return NextResponse.json(game)
  } catch (error) {
    console.error("Failed to get game:", error)
    return NextResponse.json(
      { error: "Failed to get game" },
      { status: 500 }
    )
  }
}

// PUT /api/games/[id]
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const game = await request.json()
    const updatedGame = await updateGame(context.params.id, game)
    return NextResponse.json(updatedGame)
  } catch (error) {
    console.error("Failed to update game:", error)
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    )
  }
}

// DELETE /api/games/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await deleteGame(context.params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete game:", error)
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    )
  }
} 
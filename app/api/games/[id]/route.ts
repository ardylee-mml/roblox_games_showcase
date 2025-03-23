import { NextRequest, NextResponse } from "next/server"
import { getGame, updateGame, deleteGame } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const game = await getGame(params.id)
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }
    return NextResponse.json(game)
  } catch (error) {
    console.error("Error fetching game:", error)
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const game = await request.json()
    const updatedGame = await updateGame(params.id, game)
    return NextResponse.json(updatedGame)
  } catch (error) {
    console.error("Error updating game:", error)
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteGame(params.id)
    return NextResponse.json({ message: "Game deleted successfully" })
  } catch (error) {
    console.error("Error deleting game:", error)
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    )
  }
} 
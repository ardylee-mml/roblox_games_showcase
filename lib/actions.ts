"use server"

import { revalidatePath } from "next/cache"
import type { Game } from "./data"

// In a real application, this would update a database
// For now, we'll just log the update and revalidate the path
export async function updateGame(game: Game) {
  console.log("Updating game:", game)

  // In a real app, you would update your database here
  // For example: await db.games.update({ where: { id: game.id }, data: game })

  // Revalidate the paths to refresh the data
  revalidatePath("/")
  revalidatePath("/admin")

  return { success: true }
}


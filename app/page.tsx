"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { GameDetailDialog } from "@/components/game-detail-dialog"
import { getAllGames, type Game } from "@/lib/db"

export default function RobloxGamesShowcase() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [open, setOpen] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/games')
      if (!response.ok) {
        throw new Error('Failed to fetch games')
      }
      const gamesData = await response.json()
      setGames(gamesData)
    } catch (error) {
      console.error('Failed to load games:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDetails = (game: Game) => {
    setSelectedGame(game)
    setOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center">
        <div className="animate-pulse text-2xl text-indigo-600 font-semibold">Loading amazing games...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f7ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] shadow-lg rounded-3xl mx-4 my-8">
        <div className="container mx-auto px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            MML Game and Development Competition - Final 5 games
          </h1>
          <p className="text-xl text-white/90">
            Discover these amazing Roblox game ideas, and vote for the winner!
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className="aspect-square relative">
                <Image
                  src={game.images?.[0]?.url || "/placeholder.jpg"}
                  alt={`${game.title} thumbnail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2 text-indigo-900">
                  {game.title}
                </h2>
                <p className="text-indigo-700/90 mb-4 line-clamp-3 flex-grow">
                  {game.description}
                </p>
                <button
                  onClick={() => handleOpenDetails(game)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGame && <GameDetailDialog game={selectedGame} open={open} onOpenChange={setOpen} />}
    </main>
  )
}


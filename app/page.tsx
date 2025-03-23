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
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-indigo-600 font-semibold">Loading amazing games...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] shadow-xl rounded-3xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Top Roblox Games
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Discover amazing Roblox game ideas and vote for the winner!
            </p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="aspect-video relative">
                {game.images?.[0]?.url ? (
                  <Image
                    src={game.images[0].url}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {game.description}
                </p>
                <button
                  onClick={() => handleOpenDetails(game)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGame && (
        <GameDetailDialog
          game={selectedGame}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </div>
  )
}


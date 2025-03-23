"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-2xl text-indigo-600">Loading amazing games...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">
            MML Game and Development Competition
          </h1>
          <p className="text-xl text-white/90">
            Discover the Final 5 Amazing Roblox Games!
          </p>
        </div>
      </div>

      {/* Games List */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {games.map((game) => (
            <Card key={game.id} className="overflow-hidden bg-white/95 backdrop-blur-sm border shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="lg:w-2/5 xl:w-1/3 relative">
                    <div className="aspect-video relative">
                      <Image
                        src={game.images?.[0]?.url || "/placeholder.jpg"}
                        alt={`${game.title} thumbnail`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority
                      />
                    </div>
                    {game.images && game.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full">
                        +{game.images.length - 1} more
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 lg:p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                      {game.title}
                    </h2>
                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-700 whitespace-pre-line">{game.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {game.videos && game.videos.length > 0 && (
                        <p className="text-sm font-medium text-gray-500">
                          {game.videos.length} video{game.videos.length > 1 ? 's' : ''} available
                        </p>
                      )}
                      <Button
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                        onClick={() => handleOpenDetails(game)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedGame && <GameDetailDialog game={selectedGame} open={open} onOpenChange={setOpen} />}
    </main>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-800">Loading amazing games...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            MML Game and Development Competition
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover the Final 5 Amazing Roblox Games!
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden border border-gray-200 bg-white"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/3 relative">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={game.images?.[0]?.url || "/placeholder.jpg"}
                      alt={`${game.title} thumbnail`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </div>
                  {game.images && game.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                      +{game.images.length - 1} more
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {game.title}
                  </h2>
                  <div className="prose prose-sm text-gray-600 mb-4">
                    <p className="whitespace-pre-line">{game.description}</p>
                  </div>
                  <div className="space-y-2">
                    {game.videos && game.videos.length > 0 && (
                      <p className="text-sm text-gray-500">
                        {game.videos.length} video{game.videos.length > 1 ? 's' : ''} available
                      </p>
                    )}
                    <Button
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleOpenDetails(game)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedGame && <GameDetailDialog game={selectedGame} open={open} onOpenChange={setOpen} />}
    </main>
  )
}


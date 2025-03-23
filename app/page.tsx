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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-indigo-600">Loading amazing games...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 text-center backdrop-blur-sm bg-white/10">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
              MML Game and Development Competition
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the Final 5 Amazing Roblox Games!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-indigo-100 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10 group-hover:from-purple-500/30 transition-all duration-300"></div>
                <Image
                  src={game.images?.[0]?.url || "/placeholder.jpg"}
                  alt={`${game.title} thumbnail`}
                  width={640}
                  height={360}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-indigo-800 group-hover:text-indigo-600 transition-colors">
                  {game.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
                  <p className="text-indigo-700/80">{game.description}</p>
                </div>
                <div className="mt-4 space-y-1">
                  {game.images && game.images.length > 1 && (
                    <p className="text-sm text-indigo-600">
                      +{game.images.length - 1} more images
                    </p>
                  )}
                  {game.videos && game.videos.length > 0 && (
                    <p className="text-sm text-indigo-600">
                      {game.videos.length} video{game.videos.length > 1 ? 's' : ''} available
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => handleOpenDetails(game)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedGame && <GameDetailDialog game={selectedGame} open={open} onOpenChange={setOpen} />}
      </div>
    </div>
  )
}


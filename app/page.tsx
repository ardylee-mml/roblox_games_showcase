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
        <p className="text-indigo-600">Loading games...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 overflow-y-auto">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg sticky top-0 z-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
            MML Game and Development Competition - Final 5 games
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover these amazing Roblox game ideas!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-indigo-100 bg-white h-full flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10"></div>
                <Image
                  src={game.images?.[0]?.url || "/placeholder.jpg"}
                  alt={`${game.title} thumbnail`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="text-xl text-indigo-800">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <div className="h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent hover:scrollbar-thumb-indigo-300">
                  <p className="text-sm text-indigo-700/80 whitespace-pre-line">{game.description}</p>
                </div>
                {game.images && game.images.length > 1 && (
                  <p className="text-xs text-indigo-600 mt-2">
                    +{game.images.length - 1} more images
                  </p>
                )}
                {game.videos && game.videos.length > 0 && (
                  <p className="text-xs text-indigo-600">
                    {game.videos.length} video{game.videos.length > 1 ? 's' : ''} available
                  </p>
                )}
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 mt-auto">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
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


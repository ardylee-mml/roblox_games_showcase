"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { GameDetailDialog } from "@/components/game-detail-dialog"
import { getGames } from "@/lib/data"

export default function RobloxGamesShowcase() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [open, setOpen] = useState(false)
  const games = getGames()

  const handleOpenDetails = (game) => {
    setSelectedGame(game)
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
            MML Game and Development Competition - Final 5 games
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover these amazing Roblox game ideas, and vote for the winner!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-indigo-100 bg-white"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10"></div>
                <Image
                  src={game.images[0] || "/placeholder.svg?height=200&width=350"}
                  alt={`${game.title} thumbnail`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="text-xl text-indigo-800">{game.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-indigo-700/80 line-clamp-4">{game.description}</p>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  onClick={() => handleOpenDetails(game)}
                >
                  View Detail
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


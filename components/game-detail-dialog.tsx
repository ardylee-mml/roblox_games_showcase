"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { ExternalLink, Play } from "lucide-react"
import Link from "next/link"
import type { Game } from "@/lib/data"

interface GameDetailDialogProps {
  game: Game
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GameDetailDialog({ game, open, onOpenChange }: GameDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gradient-to-b from-white to-indigo-50 border-2 border-indigo-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-800">{game.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <ImageCarousel images={game.images} />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-800">About this game</h3>
          <p className="text-indigo-700/80">{game.description}</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {game.videoPreview && (
            <Link href={game.videoPreview} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full gap-2 border-indigo-300 text-indigo-700 hover:bg-indigo-100">
                <Play className="h-4 w-4" />
                Watch Preview
              </Button>
            </Link>
          )}

          <Link href={game.gameLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              <ExternalLink className="h-4 w-4" />
              Play on Roblox
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}


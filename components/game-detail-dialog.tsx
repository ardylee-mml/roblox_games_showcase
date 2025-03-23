"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { ExternalLink } from "lucide-react"
import type { Game } from "@/lib/db"

interface GameDetailDialogProps {
  game: Game
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GameDetailDialog({ game, open, onOpenChange }: GameDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-indigo-800">{game.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto flex-1 pr-4 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent hover:scrollbar-thumb-indigo-300">
          {(game.images?.length > 0 || game.videos?.length > 0) && (
            <div>
              <h3 className="text-sm font-medium text-indigo-800 mb-2">Media</h3>
              <ImageCarousel images={game.images || []} videos={game.videos} className="w-full" />
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-indigo-800 mb-2">Description</h3>
            <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent hover:scrollbar-thumb-indigo-300">
              <p className="text-indigo-700/80 whitespace-pre-line">{game.description}</p>
            </div>
          </div>

          {game.robloxGameUrl && (
            <div>
              <h3 className="text-sm font-medium text-indigo-800 mb-2">Play the Game</h3>
              <Button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                asChild
              >
                <a href={game.robloxGameUrl} target="_blank" rel="noopener noreferrer">
                  Play on Roblox
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


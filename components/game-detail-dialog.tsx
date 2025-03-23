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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-sm p-0 border shadow-lg">
        <DialogHeader className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <DialogTitle className="text-2xl font-bold text-white">{game.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          {/* Media Section */}
          {(game.images?.length > 0 || game.videos?.length > 0) && (
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media</h3>
              <ImageCarousel images={game.images || []} videos={game.videos} className="w-full rounded-lg overflow-hidden shadow-lg" />
            </div>
          )}

          {/* Description Section */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{game.description}</p>
            </div>
          </div>

          {/* Play Button Section */}
          {game.robloxGameUrl && (
            <div className="p-6">
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <a href={game.robloxGameUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Play on Roblox
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


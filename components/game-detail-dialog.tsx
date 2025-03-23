"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import type { Game } from "@/lib/db"

interface GameDetailDialogProps {
  game: Game
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GameDetailDialog({ game, open, onOpenChange }: GameDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-sm p-0 border border-gray-200 rounded-xl shadow-lg">
        <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-2xl font-bold text-white">{game.title}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Media Section */}
          {(game.images?.length > 0 || game.videos?.length > 0) && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media</h3>
              <ImageCarousel images={game.images || []} videos={game.videos} className="w-full rounded-lg overflow-hidden shadow-lg" />
            </div>
          )}

          {/* Description Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <div>
              <p className="text-gray-700 whitespace-pre-line">{game.description}</p>
            </div>
          </div>

          {/* Play Button Section */}
          {game.robloxGameUrl && (
            <div className="p-6">
              <a
                href={game.robloxGameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
              >
                Play on Roblox
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


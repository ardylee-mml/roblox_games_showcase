"use client"

import {
  Dialog,
  DialogContent,
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-sm p-0 rounded-3xl border-none shadow-xl">
        <div className="p-8 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899]">
          <h2 className="text-3xl font-bold text-white">{game.title}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Media Section */}
          {(game.images?.length > 0 || game.videos?.length > 0) && (
            <div className="p-8 border-b border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-6">Media</h3>
              <ImageCarousel images={game.images || []} videos={game.videos} className="w-full rounded-2xl overflow-hidden shadow-lg" />
            </div>
          )}

          {/* Description Section */}
          <div className="p-8 border-b border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-6">Description</h3>
            <div>
              <p className="text-indigo-700/90 whitespace-pre-line">{game.description}</p>
            </div>
          </div>

          {/* Play Button Section */}
          {game.robloxGameUrl && (
            <div className="p-8">
              <a
                href={game.robloxGameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
              >
                Play on Roblox
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GameImage, GameVideo } from "@/lib/db"

interface ImageCarouselProps {
  images: GameImage[]
  videos?: GameVideo[]
  className?: string
}

function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return null
}

export function ImageCarousel({ images, videos = [], className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalItems = images.length + videos.length
  const isVideo = currentIndex >= images.length

  const handlePrevious = () => {
    setCurrentIndex((index) => (index === 0 ? totalItems - 1 : index - 1))
  }

  const handleNext = () => {
    setCurrentIndex((index) => (index === totalItems - 1 ? 0 : index + 1))
  }

  if (totalItems === 0) return null

  return (
    <div className={`relative group ${className}`}>
      <div className="aspect-video relative overflow-hidden rounded-lg border-2 border-indigo-100">
        {isVideo ? (
          // Video embed
          <div className="w-full h-full">
            {(() => {
              const video = videos[currentIndex - images.length]
              const embedUrl = getVideoEmbedUrl(video.url)
              if (embedUrl) {
                return (
                  <iframe
                    src={embedUrl}
                    title={video.title || "Video"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              } else {
                return (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {video.title || "Watch Video"}
                    </a>
                  </div>
                )
              }
            })()}
          </div>
        ) : (
          // Image display
          <>
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
            {images[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                {images[currentIndex].caption}
              </div>
            )}
          </>
        )}
      </div>

      {totalItems > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {totalItems > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(totalItems)].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}


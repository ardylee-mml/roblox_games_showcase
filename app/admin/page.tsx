"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageCarousel } from "@/components/image-carousel"
import { Pencil, Save, X, Plus, Trash, Upload, Video } from "lucide-react"
import Image from "next/image"
import type { Game, GameImage, GameVideo } from "@/lib/db"
import { toast } from "sonner"

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<Partial<Game>>({
    title: "",
    description: "",
    images: [],
    videos: [],
    robloxGameUrl: "",
  })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  // Load games on component mount
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
      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error('Failed to load games:', error)
      toast.error('Failed to load games')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    try {
      setUploading(true)
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('caption', '')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      const newImage: GameImage = {
        url: data.url,
        publicId: data.publicId,
        caption: '',
      }

      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImage],
      }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleImageCaptionChange = (index: number, caption: string) => {
    setFormData(prev => {
      const newImages = [...(prev.images || [])]
      newImages[index] = { ...newImages[index], caption }
      return { ...prev, images: newImages }
    })
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }))
  }

  const handleAddVideo = () => {
    setFormData(prev => ({
      ...prev,
      videos: [
        ...(prev.videos || []),
        { url: '', title: '', platform: 'youtube' },
      ],
    }))
  }

  const handleVideoChange = (index: number, field: keyof GameVideo, value: string) => {
    setFormData(prev => {
      const newVideos = [...(prev.videos || [])]
      newVideos[index] = { ...newVideos[index], [field]: value }
      return { ...prev, videos: newVideos }
    })
  }

  const handleRemoveVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: (prev.videos || []).filter((_, i) => i !== index),
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      if (formData.id) {
        // Update existing game
        const response = await fetch(`/api/games/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Failed to update game')
        }

        const updatedGame = await response.json()
        await loadGames()
        setSelectedGame(updatedGame)
        setEditMode(false)
        toast.success('Game updated successfully')
      } else {
        // Create new game
        const response = await fetch('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Failed to create game')
        }

        const newGame = await response.json()
        await loadGames()
        setSelectedGame(newGame)
        setFormData(newGame)
        setEditMode(false)
        toast.success('Game created successfully')
      }
    } catch (error) {
      console.error('Failed to save game:', error)
      toast.error('Failed to save game')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      if (formData.id) {
        const response = await fetch(`/api/games/${formData.id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete game')
        }

        await loadGames()
        setSelectedGame(null)
        setFormData({})
        setEditMode(false)
        toast.success('Game deleted successfully')
      }
    } catch (error) {
      console.error('Failed to delete game:', error)
      toast.error('Failed to delete game')
    } finally {
      setLoading(false)
    }
  }

  const handleNewGame = () => {
    setSelectedGame(null)
    setFormData({
      title: '',
      description: '',
      images: [],
      videos: [],
      robloxGameUrl: '',
    })
    setEditMode(true)
  }

  if (loading && games.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
        <p className="text-indigo-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-indigo-800">Game Content Management</h1>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="bg-indigo-100 border-2 border-indigo-200">
          <TabsTrigger value="games" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Games
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="border-2 border-indigo-200 bg-white">
                <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                  <CardTitle className="text-indigo-800">Game List</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                      onClick={handleNewGame}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Game
                    </Button>
                    {games.map((game) => (
                      <Button
                        key={game.id}
                        variant={selectedGame?.id === game.id ? "default" : "outline"}
                        className={`w-full justify-start ${
                          selectedGame?.id === game.id
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                            : "border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                        }`}
                        onClick={() => {
                          setSelectedGame(game)
                          setFormData(game)
                          setEditMode(false)
                        }}
                      >
                        {game.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              {(selectedGame || editMode) && (
                <Card className="border-2 border-indigo-200 bg-white">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-100 to-purple-100">
                    <CardTitle className="text-indigo-800">
                      {editMode ? (selectedGame ? "Edit Game" : "New Game") : selectedGame?.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      {selectedGame && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={handleDelete}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setEditMode(!editMode)}
                        className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                      >
                        {editMode ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {editMode ? (
                      <div className="space-y-6">
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="title" className="text-indigo-800">
                            Title
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleInputChange}
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="description" className="text-indigo-800">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            rows={5}
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="robloxGameUrl" className="text-indigo-800">
                            Roblox Game URL
                          </Label>
                          <Input
                            id="robloxGameUrl"
                            name="robloxGameUrl"
                            value={formData.robloxGameUrl || ""}
                            onChange={handleInputChange}
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label className="text-indigo-800">Images</Label>
                          <div className="grid gap-4">
                            {formData.images?.map((image, index) => (
                              <div key={index} className="flex gap-4 items-start">
                                <div className="w-32 h-32 relative">
                                  <Image
                                    src={image.url}
                                    alt={image.caption || `Image ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <Input
                                    placeholder="Image caption"
                                    value={image.caption || ""}
                                    onChange={(e) => handleImageCaptionChange(index, e.target.value)}
                                    className="border-indigo-200 focus:border-indigo-400"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveImage(index)}
                                  >
                                    Remove Image
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <div>
                              <Label htmlFor="image-upload" className="cursor-pointer">
                                <div className="border-2 border-dashed border-indigo-200 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                                  <Upload className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                                  <p className="text-sm text-indigo-600">Click to upload an image</p>
                                </div>
                                <Input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                  disabled={uploading}
                                />
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-indigo-800">Videos</Label>
                          <div className="space-y-4">
                            {formData.videos?.map((video, index) => (
                              <div key={index} className="flex gap-4 items-start border rounded-lg p-4">
                                <div className="flex-1 space-y-2">
                                  <Input
                                    placeholder="Video URL"
                                    value={video.url}
                                    onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                                    className="border-indigo-200 focus:border-indigo-400"
                                  />
                                  <Input
                                    placeholder="Video title (optional)"
                                    value={video.title || ""}
                                    onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                                    className="border-indigo-200 focus:border-indigo-400"
                                  />
                                </div>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemoveVideo(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={handleAddVideo}
                              className="w-full border-dashed border-2"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Add Video Link
                            </Button>
                          </div>
                        </div>

                        <Button
                          onClick={handleSave}
                          className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                          disabled={loading}
                        >
                          {loading ? (
                            <>Loading...</>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-indigo-800">Description</h3>
                          <p className="text-sm text-indigo-700/80 mt-1">{selectedGame?.description}</p>
                        </div>

                        {selectedGame?.images && selectedGame.images.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-indigo-800 mb-2">Images</h3>
                            <ImageCarousel images={selectedGame.images} className="max-w-2xl" />
                          </div>
                        )}

                        <div>
                          <h3 className="text-sm font-medium text-indigo-800">Roblox Game URL</h3>
                          <a
                            href={selectedGame?.robloxGameUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 mt-1 block"
                          >
                            {selectedGame?.robloxGameUrl}
                          </a>
                        </div>

                        {selectedGame?.videos && selectedGame.videos.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-indigo-800">Videos</h3>
                            <div className="space-y-2 mt-1">
                              {selectedGame.videos.map((video, index) => (
                                <div key={index}>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-indigo-600 hover:text-indigo-800"
                                  >
                                    {video.title || video.url}
                                  </a>
                                  <span className="text-xs text-indigo-500 ml-2">
                                    ({video.platform})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-2 border-indigo-200 bg-white">
            <CardHeader>
              <CardTitle className="text-indigo-800">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-700">Settings page coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


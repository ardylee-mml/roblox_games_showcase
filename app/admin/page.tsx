"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getGames, type Game } from "@/lib/data"
import { updateGame } from "@/lib/actions"
import { Pencil, Save, X, Plus, Trash } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  const games = getGames()
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<Partial<Game>>({})

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game)
    setFormData(game)
    setEditMode(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImagesChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [])]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), "/placeholder.svg?height=400&width=600"],
    })
  }

  const removeImageField = (index: number) => {
    const newImages = [...(formData.images || [])]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  const handleSave = async () => {
    if (formData.id) {
      await updateGame(formData as Game)
      setEditMode(false)
    }
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
                    {games.map((game) => (
                      <Button
                        key={game.id}
                        variant={selectedGame?.id === game.id ? "default" : "outline"}
                        className={`w-full justify-start ${
                          selectedGame?.id === game.id
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                            : "border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                        }`}
                        onClick={() => handleSelectGame(game)}
                      >
                        {game.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              {selectedGame ? (
                <Card className="border-2 border-indigo-200 bg-white">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-100 to-purple-100">
                    <CardTitle className="text-indigo-800">{editMode ? "Edit Game" : selectedGame.title}</CardTitle>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditMode(!editMode)}
                      className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                    >
                      {editMode ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6">
                    {editMode ? (
                      <div className="space-y-4">
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
                          <div className="flex items-center justify-between">
                            <Label className="text-indigo-800">Images</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={addImageField}
                              className="h-8 gap-1 border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add Image
                            </Button>
                          </div>

                          {formData.images?.map((image, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={image}
                                onChange={(e) => handleImagesChange(index, e.target.value)}
                                placeholder="Image URL"
                                className="border-indigo-200 focus:border-indigo-400"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeImageField(index)}
                                className="bg-pink-600 hover:bg-pink-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="videoPreview" className="text-indigo-800">
                            Video Preview URL
                          </Label>
                          <Input
                            id="videoPreview"
                            name="videoPreview"
                            value={formData.videoPreview || ""}
                            onChange={handleInputChange}
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="gameLink" className="text-indigo-800">
                            Game Link
                          </Label>
                          <Input
                            id="gameLink"
                            name="gameLink"
                            value={formData.gameLink || ""}
                            onChange={handleInputChange}
                            className="border-indigo-200 focus:border-indigo-400"
                          />
                        </div>

                        <Button
                          onClick={handleSave}
                          className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-indigo-800">Description</h3>
                          <p className="text-sm text-indigo-700/80 mt-1">{selectedGame.description}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-indigo-800">Images</h3>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            {selectedGame.images.map((image, index) => (
                              <div
                                key={index}
                                className="relative aspect-video bg-indigo-50 rounded-md overflow-hidden border border-indigo-200"
                              >
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Game image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-indigo-800">Video Preview</h3>
                          <p className="text-sm text-indigo-700/80 mt-1">
                            {selectedGame.videoPreview || "No video preview available"}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-indigo-800">Game Link</h3>
                          <p className="text-sm text-indigo-700/80 mt-1">{selectedGame.gameLink}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-indigo-200 bg-white">
                  <CardContent className="flex items-center justify-center h-[400px]">
                    <p className="text-indigo-700/60">Select a game to view or edit details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-2 border-indigo-200 bg-white">
            <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
              <CardTitle className="text-indigo-800">Competition Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-indigo-700/80">
                Configure competition settings, voting options, and display preferences.
              </p>

              {/* Additional settings would go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Heart, Trash2, Edit, Star, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SavedLetter {
  id: string
  title: string
  to: string
  from: string
  message: string
  design: {
    backgroundColor: string
    textColor: string
    accentColor: string
    fontFamily: string
    backgroundPattern: string
  }
  createdAt: Date
  isFavorite: boolean
  thumbnail?: string
}

interface SavedLettersGalleryProps {
  onLoadLetter: (letter: SavedLetter) => void
  currentLetter?: {
    to: string
    from: string
    title: string
    message: string
  }
  currentDesign?: any
}

export default function SavedLettersGallery({ onLoadLetter, currentLetter, currentDesign }: SavedLettersGalleryProps) {
  const [savedLetters, setSavedLetters] = useState<SavedLetter[]>([])
  const [sortBy, setSortBy] = useState<"date" | "title" | "favorites">("date")

  // Cargar cartas guardadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("farllirs-saved-letters")
    if (saved) {
      const letters = JSON.parse(saved).map((letter: any) => ({
        ...letter,
        createdAt: new Date(letter.createdAt),
      }))
      setSavedLetters(letters)
    }
  }, [])

  // Guardar cartas en localStorage
  const saveToStorage = (letters: SavedLetter[]) => {
    localStorage.setItem("farllirs-saved-letters", JSON.stringify(letters))
    setSavedLetters(letters)
  }

  // Guardar carta actual
  const saveCurrentLetter = () => {
    if (!currentLetter) return

    const newLetter: SavedLetter = {
      id: Date.now().toString(),
      title: currentLetter.title || "Carta sin título",
      to: currentLetter.to,
      from: currentLetter.from,
      message: currentLetter.message,
      design: currentDesign || {
        backgroundColor: "#fef7f0",
        textColor: "#8b5a3c",
        accentColor: "#e91e63",
        fontFamily: "serif",
        backgroundPattern: "hearts",
      },
      createdAt: new Date(),
      isFavorite: false,
    }

    const updatedLetters = [newLetter, ...savedLetters]
    saveToStorage(updatedLetters)
  }

  // Eliminar carta
  const deleteLetter = (id: string) => {
    const updatedLetters = savedLetters.filter((letter) => letter.id !== id)
    saveToStorage(updatedLetters)
  }

  // Marcar como favorito
  const toggleFavorite = (id: string) => {
    const updatedLetters = savedLetters.map((letter) =>
      letter.id === id ? { ...letter, isFavorite: !letter.isFavorite } : letter,
    )
    saveToStorage(updatedLetters)
  }

  // Ordenar cartas
  const sortedLetters = [...savedLetters].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "favorites":
        return b.isFavorite ? 1 : -1
      case "date":
      default:
        return b.createdAt.getTime() - a.createdAt.getTime()
    }
  })

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5 text-red-500" />
            Cartas Guardadas
            <Badge variant="outline" className="text-xs">
              {savedLetters.length}
            </Badge>
          </CardTitle>
          <Button
            onClick={saveCurrentLetter}
            size="sm"
            className="bg-gradient-to-r from-pink-500 to-purple-600"
            disabled={!currentLetter}
          >
            Guardar Actual
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controles de ordenamiento */}
        <div className="flex gap-2">
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
            className="text-xs"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Fecha
          </Button>
          <Button
            variant={sortBy === "favorites" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("favorites")}
            className="text-xs"
          >
            <Star className="w-3 h-3 mr-1" />
            Favoritos
          </Button>
          <Button
            variant={sortBy === "title" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("title")}
            className="text-xs"
          >
            Título
          </Button>
        </div>

        {/* Lista de cartas */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {sortedLetters.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No hay cartas guardadas</p>
              <p className="text-xs">Guarda tu primera carta para verla aquí</p>
            </div>
          ) : (
            sortedLetters.map((letter) => (
              <div key={letter.id} className="border rounded-lg p-3 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{letter.title}</h3>
                      {letter.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Para: {letter.to} • De: {letter.from}
                    </p>
                    <p className="text-xs text-gray-500">{letter.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Preview miniatura */}
                <div
                  className="w-full h-16 rounded text-xs p-2 mb-3 overflow-hidden"
                  style={{
                    backgroundColor: letter.design.backgroundColor,
                    color: letter.design.textColor,
                  }}
                >
                  <div className="text-xs leading-tight line-clamp-3">{letter.message.substring(0, 100)}...</div>
                </div>

                {/* Acciones */}
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => onLoadLetter(letter)} className="flex-1 text-xs">
                    <Edit className="w-3 h-3 mr-1" />
                    Cargar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toggleFavorite(letter.id)} className="text-xs">
                    <Star className={`w-3 h-3 ${letter.isFavorite ? "fill-current text-yellow-500" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteLetter(letter.id)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

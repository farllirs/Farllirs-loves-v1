"use client"

import { useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)

  const loadingTexts = [
    "Preparando el amor...",
    "Cargando corazones...",
    "Mezclando sentimientos...",
    "Creando magia romántica...",
    "¡Casi listo para el amor!",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 2
        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, 60)

    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, 600)

    return () => {
      clearInterval(timer)
      clearInterval(textTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-red-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        {/* Logo animado */}
        <div className="relative">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Heart className="w-16 h-16 text-pink-500 animate-pulse" fill="currentColor" />
            <Sparkles className="w-8 h-8 text-purple-500 animate-bounce" />
          </div>

          {/* Corazones flotantes */}
          <div className="absolute -top-4 -left-4">
            <Heart className="w-4 h-4 text-pink-300 animate-float" fill="currentColor" />
          </div>
          <div className="absolute -top-2 -right-6">
            <Heart className="w-3 h-3 text-red-300 animate-float delay-500" fill="currentColor" />
          </div>
          <div className="absolute -bottom-2 -left-6">
            <Heart className="w-5 h-5 text-purple-300 animate-float delay-1000" fill="currentColor" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Farllirs Love
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Generador de Cartas de Amor</p>
        </div>

        {/* Barra de progreso */}
        <div className="w-80 mx-auto space-y-4">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">{loadingTexts[currentText]}</p>
        </div>

        {/* Porcentaje */}
        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{progress}%</div>
      </div>
    </div>
  )
}

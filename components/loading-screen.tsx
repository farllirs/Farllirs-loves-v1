"use client"

import { useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)

  const loadingTexts = ["Preparando el amor...", "Mezclando sentimientos...", "Creando magia...", "¡Casi listo!"]

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 60)

    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, 750)

    return () => {
      clearInterval(progressTimer)
      clearInterval(textTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 dark:from-pink-950 dark:via-red-950 dark:to-purple-950 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        {/* Logo animado */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-16 h-16 text-pink-500 animate-pulse" fill="currentColor" />
            <Sparkles className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Farllirs Love
          </h1>
        </div>

        {/* Barra de progreso */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-white/20 dark:bg-black/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 animate-pulse">
            {loadingTexts[currentText]}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{progress}%</p>
        </div>

        {/* Corazones flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-300 dark:text-pink-700 animate-bounce opacity-60`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
              size={16 + Math.random() * 16}
              fill="currentColor"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

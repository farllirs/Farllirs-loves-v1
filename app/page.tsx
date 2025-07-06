"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import LoveLetterGenerator from "@/components/love-letter-generator"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return <LoveLetterGenerator />
}

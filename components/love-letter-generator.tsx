"use client"

import { useState, useRef } from "react"
import {
  Download,
  Heart,
  Type,
  ImageIcon,
  Globe,
  Moon,
  Sun,
  Sparkles,
  Star,
  Camera,
  Eye,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  QrCode,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import TemplatesGallery from "@/components/templates-gallery"
import AITextGenerator from "@/components/ai-text-generator"
import SavedLettersGallery from "@/components/saved-letters-gallery"
import IntelligentTranslator from "@/components/intelligent-translator"

// Tipos para fuentes personalizadas
interface CustomFont {
  name: string
  url: string
  family: string
}

// Diccionarios de idiomas (mantengo los mismos del código original)
const translations = {
  es: {
    title: "Generador de Cartas de Amor",
    subtitle: "Crea cartas de amor personalizadas y descárgalas como imagen",
    content: "Contenido de la Carta",
    to: "Para:",
    from: "De:",
    letterTitle: "Título:",
    message: "Mensaje:",
    customization: "Personalización",
    colors: "Colores",
    fonts: "Fuentes",
    background: "Fondo",
    backgroundColor: "Color de fondo:",
    textColor: "Color del texto:",
    accentColor: "Color de acento:",
    fontFamily: "Familia de fuente:",
    backgroundPattern: "Patrón de fondo:",
    export: "Exportar",
    downloadPNG: "Descargar PNG",
    downloadJPG: "Descargar JPG",
    preview: "Vista Previa",
    language: "Idioma:",
    autoTranslate: "Traducir automáticamente",
    withLove: "Con amor,",
    defaultTo: "Mi amor",
    defaultFrom: "Tu admirador secreto",
    defaultTitle: "Para ti, con todo mi amor",
    defaultMessage:
      "Querido/a [nombre],\n\nCada día que pasa me doy cuenta de lo afortunado/a que soy de tenerte en mi vida. Tu sonrisa ilumina mis días más oscuros y tu amor me da la fuerza para ser mejor persona.\n\nQuiero que sepas que eres lo más importante para mí, y que mi amor por ti crece cada día más.\n\nCon todo mi corazón,\n[Tu nombre]",
    fontOptions: {
      serif: "Serif (Clásica)",
      sans: "Sans-serif (Moderna)",
      script: "Script (Cursiva)",
      elegant: "Elegant (Elegante)",
    },
    patternOptions: {
      hearts: "Corazones",
      roses: "Rosas",
      stars: "Estrellas",
      flowers: "Flores",
      vintage: "Vintage",
      dots: "Puntos",
      none: "Sin patrón",
    },
  },
  en: {
    title: "Love Letter Generator",
    subtitle: "Create personalized love letters and download them as images",
    content: "Letter Content",
    to: "To:",
    from: "From:",
    letterTitle: "Title:",
    message: "Message:",
    customization: "Customization",
    colors: "Colors",
    fonts: "Fonts",
    background: "Background",
    backgroundColor: "Background color:",
    textColor: "Text color:",
    accentColor: "Accent color:",
    fontFamily: "Font family:",
    backgroundPattern: "Background pattern:",
    export: "Export",
    downloadPNG: "Download PNG",
    downloadJPG: "Download JPG",
    preview: "Preview",
    language: "Language:",
    autoTranslate: "Auto translate",
    withLove: "With love,",
    defaultTo: "My love",
    defaultFrom: "Your secret admirer",
    defaultTitle: "For you, with all my love",
    defaultMessage:
      "Dear [name],\n\nEvery day that passes I realize how lucky I am to have you in my life. Your smile brightens my darkest days and your love gives me the strength to be a better person.\n\nI want you to know that you are the most important thing to me, and that my love for you grows stronger every day.\n\nWith all my heart,\n[Your name]",
    fontOptions: {
      serif: "Serif (Classic)",
      sans: "Sans-serif (Modern)",
      script: "Script (Cursive)",
      elegant: "Elegant",
    },
    patternOptions: {
      hearts: "Hearts",
      roses: "Roses",
      stars: "Stars",
      flowers: "Flowers",
      vintage: "Vintage",
      dots: "Dots",
      none: "No pattern",
    },
  },
}

type Language = "es" | "en"

export default function LoveLetterGenerator() {
  const { theme, setTheme } = useTheme()
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es")
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [selectedIconCategory, setSelectedIconCategory] = useState("todos")

  const [letterData, setLetterData] = useState({
    to: translations.es.defaultTo,
    from: translations.es.defaultFrom,
    title: translations.es.defaultTitle,
    message: translations.es.defaultMessage,
  })

  const [design, setDesign] = useState({
    backgroundColor: "#fef7f0",
    textColor: "#8b5a3c",
    accentColor: "#e91e63",
    fontFamily: "serif",
    fontSize: "base",
    backgroundPattern: "hearts",
    cardSize: "standard", // Nuevo campo para el tamaño
    aspectRatio: "3/4", // Nuevo campo para el aspect ratio
  })

  const cardSizes = {
    compact: {
      name: "Compacta",
      ratio: "4/5",
      description: "Ideal para mensajes cortos",
      scale: 0.8,
      padding: "p-4",
      iconScale: 0.8,
      titleScale: 0.9,
    },
    standard: {
      name: "Estándar",
      ratio: "3/4",
      description: "Tamaño clásico de carta",
      scale: 1.0,
      padding: "p-6",
      iconScale: 1.0,
      titleScale: 1.0,
    },
    letter: {
      name: "Carta",
      ratio: "8.5/11",
      description: "Formato carta tradicional",
      scale: 1.2,
      padding: "p-8",
      iconScale: 1.1,
      titleScale: 1.1,
    },
    square: {
      name: "Cuadrada",
      ratio: "1/1",
      description: "Formato cuadrado moderno",
      scale: 0.9,
      padding: "p-5",
      iconScale: 0.9,
      titleScale: 0.95,
    },
    wide: {
      name: "Panorámica",
      ratio: "16/9",
      description: "Formato horizontal amplio",
      scale: 1.1,
      padding: "p-6",
      iconScale: 1.0,
      titleScale: 1.05,
    },
    postcard: {
      name: "Postal",
      ratio: "3/2",
      description: "Estilo postal vintage",
      scale: 0.85,
      padding: "p-4",
      iconScale: 0.85,
      titleScale: 0.9,
    },
  }

  const fontSizes = {
    xs: { name: "Muy Pequeña", class: "text-xs", preview: "12px" },
    sm: { name: "Pequeña", class: "text-sm", preview: "14px" },
    base: { name: "Normal", class: "text-base", preview: "16px" },
    lg: { name: "Grande", class: "text-lg", preview: "18px" },
    xl: { name: "Muy Grande", class: "text-xl", preview: "20px" },
    "2xl": { name: "Extra Grande", class: "text-2xl", preview: "24px" },
  }

  const [customFonts, setCustomFonts] = useState<any[]>([])
  const [isLoadingFont, setIsLoadingFont] = useState(false)
  const [customIcons, setCustomIcons] = useState<any[]>([])
  const [selectedIcon, setSelectedIcon] = useState("heart")
  const [isLoadingIcon, setIsLoadingIcon] = useState(false)

  const letterRef = useRef<HTMLDivElement>(null)
  const t = translations[currentLanguage]

  const handleExport = async (format: "png" | "jpg" | "pdf") => {
    if (!letterRef.current) return

    try {
      if (format === "pdf") {
        // Implementar exportación a PDF
        const jsPDF = (await import("jspdf")).default
        const html2canvas = (await import("html2canvas")).default

        const canvas = await html2canvas(letterRef.current, {
          backgroundColor: design.backgroundColor,
          scale: 2,
          useCORS: true,
          allowTaint: true,
        })

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF()
        const imgWidth = 210
        const pageHeight = 295
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight

        let position = 0

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        pdf.save(`farllirs-love-letter.pdf`)
      } else {
        const html2canvas = (await import("html2canvas")).default
        const canvas = await html2canvas(letterRef.current, {
          backgroundColor: design.backgroundColor,
          scale: 2,
          useCORS: true,
          allowTaint: true,
        })

        const link = document.createElement("a")
        link.download = `farllirs-love-letter.${format}`
        link.href = canvas.toDataURL(`image/${format === "jpg" ? "jpeg" : "png"}`)
        link.click()
      }
    } catch (error) {
      console.error("Error al exportar:", error)
    }
  }

  const generateQRCode = async () => {
    try {
      const QRCode = (await import("qrcode")).default
      const letterContent = `${letterData.title}\n\nPara: ${letterData.to}\nDe: ${letterData.from}\n\n${letterData.message}`
      const qrCodeDataURL = await QRCode.toDataURL(letterContent)

      const link = document.createElement("a")
      link.download = "farllirs-love-qr.png"
      link.href = qrCodeDataURL
      link.click()
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying)
    // Aquí se implementaría la lógica de reproducción de música
  }

  const backgroundPatterns = {
    hearts:
      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f8bbd9' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm15-15c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    roses:
      "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fce4ec' fillOpacity='0.1'%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='35' cy='5' r='2'/%3E%3Ccircle cx='5' cy='35' r='2'/%3E%3Ccircle cx='35' cy='35' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
    stars:
      "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffd700' fillOpacity='0.08'%3E%3Cpolygon points='25,5 30,20 45,20 33,30 38,45 25,35 12,45 17,30 5,20 20,20'/%3E%3C/g%3E%3C/svg%3E\")",
    flowers:
      "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff69b4' fillOpacity='0.06'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='25' cy='25' r='8'/%3E%3Ccircle cx='55' cy='25' r='8'/%3E%3Ccircle cx='25' cy='55' r='8'/%3E%3Ccircle cx='55' cy='55' r='8'/%3E%3C/g%3E%3C/svg%3E\")",
    vintage:
      "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fillOpacity='0.05'%3E%3Cpath d='M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z'/%3E%3C/g%3E%3C/svg%3E\")",
    dots: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff1744' fillOpacity='0.08'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='25' cy='5' r='1'/%3E%3Ccircle cx='5' cy='25' r='1'/%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
    none: "none",
  }

  const fontFamilies = {
    serif: "Georgia, 'Times New Roman', Times, serif",
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    script: "'Brush Script MT', 'Lucida Handwriting', cursive",
    elegant: "'Book Antiqua', Palatino, 'Palatino Linotype', serif",
    ...Object.fromEntries(customFonts.map((font) => [font.family, font.family])),
  }

  const predefinedIcons = [
    { id: "heart", name: "Corazón", component: Heart, category: "amor" },
    { id: "star", name: "Estrella", component: Star, category: "celebración" },
    { id: "sparkles", name: "Brillos", component: Sparkles, category: "celebración" },
    { id: "flower", name: "Flor", emoji: "🌸", category: "naturaleza" },
    { id: "rose", name: "Rosa", emoji: "🌹", category: "amor" },
    { id: "butterfly", name: "Mariposa", emoji: "🦋", category: "naturaleza" },
    { id: "diamond", name: "Diamante", emoji: "💎", category: "lujo" },
    { id: "kiss", name: "Beso", emoji: "💋", category: "amor" },
    { id: "ring", name: "Anillo", emoji: "💍", category: "amor" },
    { id: "cupid", name: "Cupido", emoji: "💘", category: "amor" },
    { id: "gift", name: "Regalo", emoji: "🎁", category: "celebración" },
    { id: "balloon", name: "Globo", emoji: "🎈", category: "celebración" },
    { id: "cake", name: "Pastel", emoji: "🎂", category: "celebración" },
    { id: "champagne", name: "Champán", emoji: "🥂", category: "celebración" },
    { id: "moon", name: "Luna", emoji: "🌙", category: "romántico" },
    { id: "sun", name: "Sol", emoji: "☀️", category: "naturaleza" },
    { id: "rainbow", name: "Arcoíris", emoji: "🌈", category: "naturaleza" },
    { id: "fire", name: "Fuego", emoji: "🔥", category: "pasión" },
    { id: "crown", name: "Corona", emoji: "👑", category: "lujo" },
    { id: "key", name: "Llave", emoji: "🗝️", category: "romántico" },
  ]

  const loadCustomFont = async (file: File) => {
    if (!file.name.match(/\.(ttf|woff|woff2)$/i)) {
      alert("Por favor selecciona un archivo de fuente válido (.ttf, .woff, .woff2)")
      return
    }

    setIsLoadingFont(true)
    try {
      const url = URL.createObjectURL(file)
      const fontName = file.name.replace(/\.(ttf|woff|woff2)$/i, "")
      const fontFamily = `custom-${Date.now()}`

      // Crear y cargar la fuente
      const fontFace = new FontFace(fontFamily, `url(${url})`)
      await fontFace.load()
      document.fonts.add(fontFace)

      const newFont = {
        name: fontName,
        url: url,
        family: fontFamily,
      }

      setCustomFonts((prev) => [...prev, newFont])
      setDesign((prev) => ({ ...prev, fontFamily: fontFamily }))
    } catch (error) {
      console.error("Error loading font:", error)
      alert("Error al cargar la fuente")
    }
    setIsLoadingFont(false)
  }

  const loadCustomIcon = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido")
      return
    }

    setIsLoadingIcon(true)
    try {
      const url = URL.createObjectURL(file)
      const iconName = file.name.replace(/\.(jpg|jpeg|png|gif|svg|webp)$/i, "")
      const iconId = `custom-${Date.now()}`

      const newIcon = {
        id: iconId,
        name: iconName,
        url: url,
        type: "custom",
      }

      setCustomIcons((prev) => [...prev, newIcon])
      setSelectedIcon(iconId)
    } catch (error) {
      console.error("Error loading icon:", error)
      alert("Error al cargar el icono")
    }
    setIsLoadingIcon(false)
  }

  const getDynamicStyles = () => {
    const currentSize = cardSizes[design.cardSize as keyof typeof cardSizes]
    const baseScale = currentSize.scale
    const fontScale = fontSizes[design.fontSize as keyof typeof fontSizes]

    return {
      titleSize: `${1.5 * baseScale * currentSize.titleScale}rem`,
      subtitleSize: `${1.1 * baseScale}rem`,
      bodySize: `${1 * baseScale}rem`,
      signatureSize: `${1.2 * baseScale}rem`,
      iconSize: `${1.5 * baseScale * currentSize.iconScale}rem`,
      decorativeIconSize: `${1 * baseScale * currentSize.iconScale}rem`,
      bounceIconSize: `${2 * baseScale * currentSize.iconScale}rem`,
      spacing: {
        mb4: `${1 * baseScale}rem`,
        mb6: `${1.5 * baseScale}rem`,
        mb8: `${2 * baseScale}rem`,
        gap: `${0.5 * baseScale}rem`,
      },
      backgroundSize: `${40 * baseScale}px ${40 * baseScale}px`,
    }
  }

  const renderIcon = (iconId: string, className = "", style: any = {}) => {
    // Buscar en iconos personalizados
    const customIcon = customIcons.find((icon) => icon.id === iconId)
    if (customIcon) {
      return (
        <img
          src={customIcon.url || "/placeholder.svg"}
          alt={customIcon.name}
          className={`${className} object-contain`}
          style={{
            width: style.width || "1.5rem",
            height: style.height || "1.5rem",
            ...style,
          }}
        />
      )
    }

    // Buscar en iconos predefinidos
    const predefinedIcon = predefinedIcons.find((icon) => icon.id === iconId)
    if (predefinedIcon) {
      if (predefinedIcon.emoji) {
        return (
          <span
            className={className}
            style={{
              fontSize: style.fontSize || "1.5em",
              width: style.width,
              height: style.height,
              display: "inline-block",
              ...style,
            }}
          >
            {predefinedIcon.emoji}
          </span>
        )
      } else {
        const IconComponent = predefinedIcon.component
        return (
          <IconComponent
            className={className}
            style={{
              width: style.width || "1.5rem",
              height: style.height || "1.5rem",
              ...style,
            }}
            fill="currentColor"
          />
        )
      }
    }

    // Fallback a corazón
    return (
      <Heart
        className={className}
        style={{
          width: style.width || "1.5rem",
          height: style.height || "1.5rem",
          ...style,
        }}
        fill="currentColor"
      />
    )
  }

  const handleTemplateSelect = (template: any) => {
    setLetterData({
      to: letterData.to,
      from: letterData.from,
      title: template.preview.title,
      message: template.preview.message,
    })
    setDesign({
      backgroundColor: template.preview.backgroundColor,
      textColor: template.preview.textColor,
      accentColor: template.preview.accentColor,
      fontFamily: design.fontFamily,
      fontSize: design.fontSize,
      backgroundPattern: template.preview.pattern,
      cardSize: design.cardSize,
      aspectRatio: design.aspectRatio,
    })
  }

  const handleAITextGenerated = (text: string) => {
    setLetterData({ ...letterData, message: text })
  }

  const handleLoadSavedLetter = (letter: any) => {
    setLetterData({
      to: letter.to,
      from: letter.from,
      title: letter.title,
      message: letter.message,
    })
    setDesign(letter.design)
  }

  const handleTranslatedText = (text: string, field: string) => {
    setLetterData({ ...letterData, [field]: text })
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <Button onClick={toggleFullscreen} className="absolute top-4 right-4 z-10 bg-transparent" variant="outline">
            Salir
          </Button>
          <div
            className="w-full max-w-4xl aspect-[3/4] p-12 rounded-lg shadow-2xl transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: design.backgroundColor,
              color: design.textColor,
              fontFamily: fontFamilies[design.fontFamily as keyof typeof fontFamilies],
              backgroundImage: backgroundPatterns[design.backgroundPattern as keyof typeof backgroundPatterns],
              backgroundSize: "80px 80px",
            }}
          >
            {/* Contenido de la carta en pantalla completa */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-4 mb-6">
                {renderIcon(selectedIcon, "w-12 h-12 animate-pulse", { color: design.accentColor })}
                {renderIcon(selectedIcon, "w-8 h-8 animate-pulse delay-100", { color: design.accentColor })}
                {renderIcon(selectedIcon, "w-12 h-12 animate-pulse delay-200", { color: design.accentColor })}
              </div>
              <h2 className="text-5xl font-bold mb-4" style={{ color: design.accentColor }}>
                {letterData.title}
              </h2>
              <p className="text-2xl font-medium">
                {t.to} {letterData.to}
              </p>
            </div>

            <div className="flex-1 mb-8">
              <div className="whitespace-pre-line text-xl leading-relaxed text-center">{letterData.message}</div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-medium">{t.withLove}</p>
              <p className="text-3xl font-bold mt-4" style={{ color: design.accentColor }}>
                {letterData.from}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              {renderIcon(selectedIcon, "w-16 h-16 animate-bounce", { color: design.accentColor })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-pink-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                <Sparkles className="w-3 h-3 text-purple-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Farllirs Love
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={toggleMusic} className="rounded-full">
                {isMusicPlaying ? <Volume2 className="h-4 w-4 text-green-500" /> : <VolumeX className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Select value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
                <SelectTrigger className="w-28">
                  <Globe className="w-3 h-3 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">🇪🇸 ES</SelectItem>
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Panel de Edición */}
          <div className="lg:col-span-1 space-y-4">
            {/* Contenido de la Carta */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Type className="w-4 h-4 text-pink-500" />
                  {t.content}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-sm font-medium">
                      {t.to}
                    </Label>
                    <Input
                      id="to"
                      value={letterData.to}
                      onChange={(e) => setLetterData({ ...letterData, to: e.target.value })}
                      placeholder={t.defaultTo}
                      className="border-pink-200 focus:border-pink-400 dark:border-gray-600 h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-sm font-medium">
                      {t.from}
                    </Label>
                    <Input
                      id="from"
                      value={letterData.from}
                      onChange={(e) => setLetterData({ ...letterData, from: e.target.value })}
                      placeholder={t.defaultFrom}
                      className="border-pink-200 focus:border-pink-400 dark:border-gray-600 h-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    {t.letterTitle}
                  </Label>
                  <Input
                    id="title"
                    value={letterData.title}
                    onChange={(e) => setLetterData({ ...letterData, title: e.target.value })}
                    placeholder={t.defaultTitle}
                    className="border-pink-200 focus:border-pink-400 dark:border-gray-600 h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t.message}
                  </Label>
                  <Textarea
                    id="message"
                    value={letterData.message}
                    onChange={(e) => setLetterData({ ...letterData, message: e.target.value })}
                    placeholder={t.defaultMessage}
                    rows={4}
                    className="border-pink-200 focus:border-pink-400 dark:border-gray-600 resize-none text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Plantillas */}
            <TemplatesGallery onSelectTemplate={handleTemplateSelect} currentLanguage={currentLanguage} />

            {/* Generador IA */}
            <AITextGenerator onTextGenerated={handleAITextGenerated} currentLanguage={currentLanguage} />

            {/* Traductor Inteligente */}
            <IntelligentTranslator onTranslatedText={handleTranslatedText} currentLetter={letterData} />

            {/* Cartas Guardadas */}
            <SavedLettersGallery
              onLoadLetter={handleLoadSavedLetter}
              currentLetter={letterData}
              currentDesign={design}
            />

            {/* Personalización */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-purple-500" />
                  {t.customization}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-4">
                    <TabsTrigger value="size" className="text-xs">
                      Tamaño
                    </TabsTrigger>
                    <TabsTrigger value="colors" className="text-xs">
                      Colores
                    </TabsTrigger>
                    <TabsTrigger value="fonts" className="text-xs">
                      Fuentes
                    </TabsTrigger>
                    <TabsTrigger value="patterns" className="text-xs">
                      Fondos
                    </TabsTrigger>
                    <TabsTrigger value="icons" className="text-xs">
                      Iconos
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="size" className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Tamaño de la carta</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(cardSizes).map(([key, size]) => (
                          <button
                            key={key}
                            className={`p-3 rounded-lg border-2 transition-all text-left ${
                              design.cardSize === key
                                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                : "border-gray-200 hover:border-pink-300 dark:border-gray-600"
                            }`}
                            onClick={() => setDesign({ ...design, cardSize: key, aspectRatio: size.ratio })}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{size.name}</span>
                              <span className="text-xs text-gray-500">{size.ratio}</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{size.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Paleta de colores</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { bg: "#fef7f0", text: "#8b5a3c", accent: "#e91e63", name: "Rosa" },
                          { bg: "#f0f9ff", text: "#1e40af", accent: "#3b82f6", name: "Azul" },
                          { bg: "#f7fee7", text: "#365314", accent: "#65a30d", name: "Verde" },
                          { bg: "#fef3c7", text: "#92400e", accent: "#f59e0b", name: "Dorado" },
                          { bg: "#faf7ff", text: "#581c87", accent: "#a855f7", name: "Púrpura" },
                        ].map((palette, index) => (
                          <button
                            key={index}
                            className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors relative overflow-hidden"
                            style={{ backgroundColor: palette.bg }}
                            onClick={() =>
                              setDesign({
                                ...design,
                                backgroundColor: palette.bg,
                                textColor: palette.text,
                                accentColor: palette.accent,
                              })
                            }
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.accent }} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fonts" className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Familia de fuente</Label>
                      <Select
                        value={design.fontFamily}
                        onValueChange={(value) => setDesign({ ...design, fontFamily: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="serif">Clásica (Serif)</SelectItem>
                          <SelectItem value="sans">Moderna (Sans)</SelectItem>
                          <SelectItem value="script">Cursiva (Script)</SelectItem>
                          <SelectItem value="elegant">Elegante</SelectItem>
                          {customFonts.map((font) => (
                            <SelectItem key={font.family} value={font.family}>
                              {font.name} (Personalizada)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Tamaño de fuente</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(fontSizes).map(([key, size]) => (
                          <button
                            key={key}
                            className={`p-2 rounded-lg border-2 transition-all text-left ${
                              design.fontSize === key
                                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                : "border-gray-200 hover:border-pink-300 dark:border-gray-600"
                            }`}
                            onClick={() => setDesign({ ...design, fontSize: key })}
                          >
                            <div className="text-sm font-medium">{size.name}</div>
                            <div className="text-xs text-gray-500">{size.preview}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Cargar Fuente Personalizada</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".ttf,.woff,.woff2"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) loadCustomFont(file)
                          }}
                          className="hidden"
                          id="font-upload"
                          disabled={isLoadingFont}
                        />
                        <label htmlFor="font-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                          <Type className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {isLoadingFont ? "Cargando fuente..." : "Haz clic para cargar fuente"}
                          </span>
                          <span className="text-xs text-gray-400">TTF, WOFF, WOFF2</span>
                        </label>
                      </div>
                    </div>

                    {customFonts.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Fuentes Personalizadas</Label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {customFonts.map((font, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
                            >
                              <span className="truncate">{font.name}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setCustomFonts((prev) => prev.filter((_, i) => i !== index))
                                  if (design.fontFamily === font.family) {
                                    setDesign((prev) => ({ ...prev, fontFamily: "serif" }))
                                  }
                                }}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="patterns" className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">{t.backgroundPattern}</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(t.patternOptions).map(([key, name]) => (
                          <button
                            key={key}
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${
                              design.backgroundPattern === key
                                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                : "border-gray-200 hover:border-pink-300"
                            }`}
                            onClick={() => setDesign({ ...design, backgroundPattern: key })}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="icons" className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Iconos por categoría</Label>

                      {/* Filtros de categoría */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {["todos", "amor", "celebración", "naturaleza", "lujo", "romántico", "pasión"].map(
                          (category) => (
                            <Button
                              key={category}
                              variant={selectedIconCategory === category ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedIconCategory(category)}
                              className="text-xs h-6 px-2"
                            >
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                          ),
                        )}
                      </div>

                      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                        {predefinedIcons
                          .filter((icon) => selectedIconCategory === "todos" || icon.category === selectedIconCategory)
                          .map((icon) => (
                            <button
                              key={icon.id}
                              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                                selectedIcon === icon.id
                                  ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                  : "border-gray-200 hover:border-pink-300 dark:border-gray-600"
                              }`}
                              onClick={() => setSelectedIcon(icon.id)}
                            >
                              <div className="flex flex-col items-center gap-1">
                                {icon.emoji ? (
                                  <span className="text-2xl">{icon.emoji}</span>
                                ) : (
                                  <icon.component className="w-6 h-6" />
                                )}
                                <span className="text-xs truncate w-full">{icon.name}</span>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Cargar Icono Personalizado</Label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) loadCustomIcon(file)
                          }}
                          className="hidden"
                          id="icon-upload"
                          disabled={isLoadingIcon}
                        />
                        <label htmlFor="icon-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {isLoadingIcon ? "Cargando icono..." : "Haz clic para cargar imagen"}
                          </span>
                          <span className="text-xs text-gray-400">PNG, JPG, SVG, GIF</span>
                        </label>
                      </div>
                    </div>

                    {customIcons.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Iconos Personalizados</Label>
                        <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                          {customIcons.map((icon) => (
                            <div key={icon.id} className="relative">
                              <button
                                className={`w-full p-2 rounded-lg border-2 transition-all hover:scale-105 ${
                                  selectedIcon === icon.id
                                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                    : "border-gray-200 hover:border-pink-300 dark:border-gray-600"
                                }`}
                                onClick={() => setSelectedIcon(icon.id)}
                              >
                                <div className="flex flex-col items-center gap-1">
                                  <img
                                    src={icon.url || "/placeholder.svg"}
                                    alt={icon.name}
                                    className="w-8 h-8 object-contain"
                                  />
                                  <span className="text-xs truncate w-full">{icon.name}</span>
                                </div>
                              </button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                                onClick={() => {
                                  setCustomIcons((prev) => prev.filter((i) => i.id !== icon.id))
                                  if (selectedIcon === icon.id) {
                                    setSelectedIcon("heart")
                                  }
                                }}
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Exportar */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="w-5 h-5 text-green-500" />
                  {t.export}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => handleExport("png")}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {t.downloadPNG}
                </Button>
                <Button
                  onClick={() => handleExport("jpg")}
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {t.downloadJPG}
                </Button>
                <Button
                  onClick={() => handleExport("pdf")}
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button
                  onClick={generateQRCode}
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-gray-700 bg-transparent"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generar QR
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Vista Previa */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Eye className="w-4 h-4 text-blue-500" />
                    {t.preview}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button onClick={toggleFullscreen} variant="outline" size="sm">
                      <Maximize className="w-3 h-3 mr-1" />
                      Pantalla Completa
                    </Button>
                    <Badge
                      variant="secondary"
                      className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 text-xs"
                    >
                      Live Preview
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="bg-white dark:bg-gray-100 rounded-xl p-3 shadow-inner">
                  <div
                    ref={letterRef}
                    className={`w-full p-6 rounded-lg shadow-lg transition-all duration-300 relative overflow-hidden ${fontSizes[design.fontSize as keyof typeof fontSizes]?.class || "text-base"}`}
                    style={{
                      aspectRatio: design.aspectRatio,
                      backgroundColor: design.backgroundColor,
                      color: design.textColor,
                      fontFamily: fontFamilies[design.fontFamily as keyof typeof fontFamilies],
                      backgroundImage: backgroundPatterns[design.backgroundPattern as keyof typeof backgroundPatterns],
                      backgroundSize: "40px 40px",
                    }}
                  >
                    {/* Decoración superior */}
                    <div className="text-center mb-4">
                      <div className="flex justify-center items-center gap-2 mb-3">
                        {renderIcon(selectedIcon, "w-5 h-5 animate-pulse", { color: design.accentColor })}
                        {renderIcon(selectedIcon, "w-3 h-3 animate-pulse delay-100", { color: design.accentColor })}
                        {renderIcon(selectedIcon, "w-5 h-5 animate-pulse delay-200", { color: design.accentColor })}
                      </div>
                      <h2 className="text-xl font-bold mb-2" style={{ color: design.accentColor }}>
                        {letterData.title}
                      </h2>
                      <p className="text-base font-medium">
                        {t.to} {letterData.to}
                      </p>
                    </div>

                    {/* Contenido de la carta */}
                    <div className="flex-1 mb-4">
                      <div className="whitespace-pre-line text-sm leading-relaxed">{letterData.message}</div>
                    </div>

                    {/* Firma */}
                    <div className="text-right">
                      <p className="text-base font-medium">{t.withLove}</p>
                      <p className="text-lg font-bold mt-2" style={{ color: design.accentColor }}>
                        {letterData.from}
                      </p>
                    </div>

                    {/* Decoración inferior */}
                    <div className="flex justify-center mt-4">
                      {renderIcon(selectedIcon, "w-6 h-6 animate-bounce", { color: design.accentColor })}
                    </div>

                    {/* Marca de agua */}
                    <div className="absolute bottom-1 right-2 opacity-30">
                      <p className="text-xs font-medium">Farllirs Love</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center py-4 border-t border-pink-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
            <span className="text-base font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Farllirs Love
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Creado con ❤️ para expresar amor de manera única y especial
          </p>
          <div className="flex justify-center space-x-2 mt-2">
            <Badge variant="outline" className="text-xs">
              Responsive Design
            </Badge>
            <Badge variant="outline" className="text-xs">
              Dark Mode
            </Badge>
            <Badge variant="outline" className="text-xs">
              Multi-language
            </Badge>
            <Badge variant="outline" className="text-xs">
              AI Powered
            </Badge>
            <Badge variant="outline" className="text-xs">
              Smart Translator
            </Badge>
          </div>
        </footer>
      </div>

      {/* Audio para música de fondo */}
      {isMusicPlaying && (
        <audio autoPlay loop className="hidden">
          <source src="/romantic-music.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  )
}

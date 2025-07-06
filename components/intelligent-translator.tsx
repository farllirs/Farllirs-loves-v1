"use client"

import { useState } from "react"
import { Languages, Brain, Wand2, RefreshCw, Copy, ArrowRightLeft, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface IntelligentTranslatorProps {
  onTranslatedText: (text: string, field: string) => void
  currentLetter: {
    to: string
    from: string
    title: string
    message: string
  }
}

const supportedLanguages = {
  es: { name: "Español", flag: "🇪🇸" },
  en: { name: "English", flag: "🇺🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  it: { name: "Italiano", flag: "🇮🇹" },
  pt: { name: "Português", flag: "🇵🇹" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  ru: { name: "Русский", flag: "🇷🇺" },
  ja: { name: "日本語", flag: "🇯🇵" },
  ko: { name: "한국어", flag: "🇰🇷" },
  zh: { name: "中文", flag: "🇨🇳" },
  ar: { name: "العربية", flag: "🇸🇦" },
  hi: { name: "हिन्दी", flag: "🇮🇳" },
}

const translationStyles = {
  literal: {
    name: "Literal",
    description: "Traducción directa y precisa",
    icon: "📝",
  },
  romantic: {
    name: "Romántico",
    description: "Adaptado para cartas de amor",
    icon: "💕",
  },
  poetic: {
    name: "Poético",
    description: "Con estilo literario y elegante",
    icon: "🎭",
  },
  casual: {
    name: "Casual",
    description: "Informal y natural",
    icon: "😊",
  },
  formal: {
    name: "Formal",
    description: "Respetuoso y elegante",
    icon: "🎩",
  },
}

// Simulación de API de traducción inteligente
const translateText = async (text: string, fromLang: string, toLang: string, style: string): Promise<string> => {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulación de traducciones basadas en el estilo
  const translations: any = {
    es: {
      en: {
        literal: {
          "Mi amor": "My love",
          Querido: "Dear",
          "Con amor": "With love",
          "Para ti, con todo mi amor": "For you, with all my love",
          "Cada día que pasa me doy cuenta de lo afortunado": "Every day that passes I realize how lucky I am",
        },
        romantic: {
          "Mi amor": "My darling",
          Querido: "My beloved",
          "Con amor": "With all my love",
          "Para ti, con todo mi amor": "For you, my heart and soul",
          "Cada día que pasa me doy cuenta de lo afortunado": "With each passing day, I'm reminded of how blessed I am",
        },
        poetic: {
          "Mi amor": "My heart's desire",
          Querido: "Dearest one",
          "Con amor": "With tender affection",
          "Para ti, con todo mi amor": "To you, with every beat of my heart",
          "Cada día que pasa me doy cuenta de lo afortunado":
            "As dawn breaks anew, I marvel at the fortune that brought you to me",
        },
      },
      fr: {
        romantic: {
          "Mi amor": "Mon amour",
          Querido: "Mon chéri",
          "Con amor": "Avec amour",
          "Para ti, con todo mi amor": "Pour toi, avec tout mon amour",
          "Cada día que pasa me doy cuenta de lo afortunado":
            "Chaque jour qui passe, je réalise à quel point je suis chanceux",
        },
      },
    },
  }

  // Buscar traducción específica
  const langTranslations = translations[fromLang]?.[toLang]?.[style]
  if (langTranslations) {
    for (const [original, translated] of Object.entries(langTranslations)) {
      if (text.includes(original)) {
        return text.replace(new RegExp(original, "gi"), translated as string)
      }
    }
  }

  // Traducción genérica simulada
  const genericTranslations: any = {
    es: {
      en: "This is a simulated translation to English. The original romantic message has been carefully translated while preserving its emotional essence and meaning.",
      fr: "Ceci est une traduction simulée en français. Le message romantique original a été soigneusement traduit en préservant son essence émotionnelle.",
      it: "Questa è una traduzione simulata in italiano. Il messaggio romantico originale è stato tradotto con cura preservando la sua essenza emotiva.",
      de: "Dies ist eine simulierte Übersetzung ins Deutsche. Die ursprüngliche romantische Nachricht wurde sorgfältig übersetzt, wobei ihre emotionale Essenz bewahrt wurde.",
      pt: "Esta é uma tradução simulada para o português. A mensagem romântica original foi cuidadosamente traduzida preservando sua essência emocional.",
    },
    en: {
      es: "Esta es una traducción simulada al español. El mensaje romántico original ha sido cuidadosamente traducido preservando su esencia emocional.",
      fr: "Ceci est une traduction simulée en français. Le message romantique original a été soigneusement traduit.",
      it: "Questa è una traduzione simulata in italiano. Il messaggio romantico originale è stato tradotto con cura.",
    },
  }

  return genericTranslations[fromLang]?.[toLang] || `[Traducción simulada de ${fromLang} a ${toLang}]: ${text}`
}

// Detectar idioma automáticamente
const detectLanguage = (text: string): string => {
  const patterns = {
    es: /\b(amor|querido|corazón|vida|mi|tu|con|para|que|de|la|el)\b/gi,
    en: /\b(love|dear|heart|life|my|your|with|for|that|of|the|and)\b/gi,
    fr: /\b(amour|cher|cœur|vie|mon|ton|avec|pour|que|de|la|le)\b/gi,
    it: /\b(amore|caro|cuore|vita|mio|tuo|con|per|che|di|la|il)\b/gi,
    pt: /\b(amor|querido|coração|vida|meu|seu|com|para|que|de|a|o)\b/gi,
  }

  let maxMatches = 0
  let detectedLang = "es"

  for (const [lang, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern)
    if (matches && matches.length > maxMatches) {
      maxMatches = matches.length
      detectedLang = lang
    }
  }

  return detectedLang
}

export default function IntelligentTranslator({ onTranslatedText, currentLetter }: IntelligentTranslatorProps) {
  const [fromLanguage, setFromLanguage] = useState("es")
  const [toLanguage, setToLanguage] = useState("en")
  const [translationStyle, setTranslationStyle] = useState("romantic")
  const [selectedField, setSelectedField] = useState("message")
  const [customText, setCustomText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState("")

  const handleTranslate = async () => {
    setIsTranslating(true)

    let textToTranslate = ""

    if (selectedField === "custom") {
      textToTranslate = customText
    } else {
      textToTranslate = currentLetter[selectedField as keyof typeof currentLetter]
    }

    if (!textToTranslate.trim()) {
      setIsTranslating(false)
      return
    }

    try {
      const result = await translateText(textToTranslate, fromLanguage, toLanguage, translationStyle)
      setTranslatedText(result)
    } catch (error) {
      console.error("Error translating:", error)
      setTranslatedText("Error en la traducción. Por favor, inténtalo de nuevo.")
    }

    setIsTranslating(false)
  }

  const handleDetectLanguage = () => {
    let textToDetect = ""

    if (selectedField === "custom") {
      textToDetect = customText
    } else {
      textToDetect = currentLetter[selectedField as keyof typeof currentLetter]
    }

    if (textToDetect.trim()) {
      const detected = detectLanguage(textToDetect)
      setDetectedLanguage(detected)
      setFromLanguage(detected)
    }
  }

  const handleUseTranslation = () => {
    if (translatedText && selectedField !== "custom") {
      onTranslatedText(translatedText, selectedField)
    }
  }

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(translatedText)
  }

  const swapLanguages = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp)
  }

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="w-4 h-4 text-blue-500" />
          Traductor Inteligente
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            IA
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="translate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="translate" className="text-xs">
              Traducir
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="translate" className="space-y-4">
            {/* Selección de campo a traducir */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Campo a traducir</Label>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Título</SelectItem>
                  <SelectItem value="message">Mensaje</SelectItem>
                  <SelectItem value="to">Para (destinatario)</SelectItem>
                  <SelectItem value="from">De (remitente)</SelectItem>
                  <SelectItem value="custom">Texto personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Texto personalizado */}
            {selectedField === "custom" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Texto a traducir</Label>
                <Textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Escribe el texto que quieres traducir..."
                  rows={3}
                  className="resize-none text-sm"
                />
              </div>
            )}

            {/* Vista previa del texto original */}
            {selectedField !== "custom" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Texto original</Label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                  {currentLetter[selectedField as keyof typeof currentLetter] || "No hay texto"}
                </div>
              </div>
            )}

            {/* Controles de idioma */}
            <div className="grid grid-cols-5 gap-2 items-center">
              <div className="col-span-2">
                <Label className="text-xs font-medium">De</Label>
                <Select value={fromLanguage} onValueChange={setFromLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(supportedLanguages).map(([code, lang]) => (
                      <SelectItem key={code} value={code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" size="sm" onClick={swapLanguages} className="p-2">
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>
              </div>

              <div className="col-span-2">
                <Label className="text-xs font-medium">A</Label>
                <Select value={toLanguage} onValueChange={setToLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(supportedLanguages).map(([code, lang]) => (
                      <SelectItem key={code} value={code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Detección automática de idioma */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDetectLanguage} className="text-xs bg-transparent">
                <Brain className="w-3 h-3 mr-1" />
                Detectar idioma
              </Button>
              {detectedLanguage && (
                <Badge variant="outline" className="text-xs">
                  Detectado: {supportedLanguages[detectedLanguage as keyof typeof supportedLanguages]?.flag}{" "}
                  {supportedLanguages[detectedLanguage as keyof typeof supportedLanguages]?.name}
                </Badge>
              )}
            </div>

            {/* Botón de traducir */}
            <Button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isTranslating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Traduciendo...
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4 mr-2" />
                  Traducir con IA
                </>
              )}
            </Button>

            {/* Resultado de la traducción */}
            {translatedText && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Traducción</Label>
                <Textarea
                  value={translatedText}
                  onChange={(e) => setTranslatedText(e.target.value)}
                  rows={4}
                  className="resize-none text-sm"
                  placeholder="La traducción aparecerá aquí..."
                />

                <div className="flex gap-2">
                  {selectedField !== "custom" && (
                    <Button onClick={handleUseTranslation} className="flex-1 bg-transparent" variant="outline">
                      Usar Traducción
                    </Button>
                  )}
                  <Button onClick={handleCopyTranslation} variant="outline" size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleTranslate} variant="outline" size="icon">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {/* Estilo de traducción */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Estilo de traducción</Label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(translationStyles).map(([key, style]) => (
                  <button
                    key={key}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      translationStyle === key
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300 dark:border-gray-600"
                    }`}
                    onClick={() => setTranslationStyle(key)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{style.icon}</span>
                      <span className="font-medium text-sm">{style.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Información sobre idiomas soportados */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Idiomas soportados</Label>
              <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                {Object.entries(supportedLanguages).map(([code, lang]) => (
                  <div key={code} className="flex items-center gap-2 text-xs p-1">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Características del traductor */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Características IA</Label>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Brain className="w-3 h-3 text-blue-500" />
                  <span>Detección automática de idioma</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>Adaptación contextual romántica</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Wand2 className="w-3 h-3 text-pink-500" />
                  <span>Preservación del tono emocional</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Languages className="w-3 h-3 text-green-500" />
                  <span>12 idiomas soportados</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

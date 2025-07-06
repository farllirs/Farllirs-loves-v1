"use client"

import { useState } from "react"
import { Sparkles, Wand2, RefreshCw, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface AITextGeneratorProps {
  onTextGenerated: (text: string) => void
  currentLanguage: string
}

const messageTypes = {
  es: {
    romantic: "Romántico",
    passionate: "Apasionado",
    sweet: "Dulce",
    formal: "Formal",
    playful: "Juguetón",
    deep: "Profundo",
  },
  en: {
    romantic: "Romantic",
    passionate: "Passionate",
    sweet: "Sweet",
    formal: "Formal",
    playful: "Playful",
    deep: "Deep",
  },
}

const occasions = {
  es: {
    valentine: "San Valentín",
    anniversary: "Aniversario",
    birthday: "Cumpleaños",
    apology: "Disculpa",
    gratitude: "Agradecimiento",
    general: "General",
  },
  en: {
    valentine: "Valentine's Day",
    anniversary: "Anniversary",
    birthday: "Birthday",
    apology: "Apology",
    gratitude: "Gratitude",
    general: "General",
  },
}

// Simulación de generador de texto con IA
const generateAIText = (type: string, occasion: string, language: string): string => {
  const templates = {
    es: {
      romantic: {
        valentine:
          "Mi querido amor, en este día especial quiero recordarte que eres la luz que ilumina mi camino. Cada momento a tu lado es un regalo que atesoro en mi corazón. Tu sonrisa es mi refugio y tu amor, mi fortaleza.",
        anniversary:
          "Hoy celebramos otro año de amor incondicional. Gracias por ser mi compañero de vida, mi confidente y mi mejor amigo. Contigo he aprendido que el amor verdadero existe y se renueva cada día.",
        birthday:
          "En tu día especial, quiero que sepas que eres la persona más maravillosa que conozco. Que este nuevo año de vida esté lleno de bendiciones, risas y momentos inolvidables juntos.",
        general:
          "Cada día que pasa me doy cuenta de lo afortunado que soy de tenerte en mi vida. Tu amor me inspira a ser mejor persona y tu presencia llena mis días de felicidad.",
      },
      passionate: {
        valentine:
          "Mi corazón arde de pasión por ti. Eres el fuego que consume mis pensamientos y la llama que enciende mi alma. En este día del amor, quiero entregarte todo mi ser.",
        anniversary:
          "Nuestro amor es como un volcán que nunca deja de erupcionar. Cada beso, cada caricia, cada mirada tuya despierta en mí una pasión que creía imposible.",
        general:
          "Eres mi obsesión más hermosa, mi adicción más dulce. No puedo imaginar un solo día sin tu amor ardiente corriendo por mis venas.",
      },
      sweet: {
        birthday:
          "Feliz cumpleaños a la persona que endulza mis días. Eres como un rayo de sol que ilumina hasta el día más gris. Espero poder celebrar muchos cumpleaños más a tu lado.",
        general:
          "Eres mi dulce refugio en este mundo. Tu ternura me abraza cuando más lo necesito y tu amor me da la paz que mi alma busca.",
      },
    },
    en: {
      romantic: {
        valentine:
          "My dearest love, on this special day I want to remind you that you are the light that illuminates my path. Every moment by your side is a gift I treasure in my heart. Your smile is my refuge and your love, my strength.",
        anniversary:
          "Today we celebrate another year of unconditional love. Thank you for being my life partner, my confidant and my best friend. With you I have learned that true love exists and is renewed every day.",
        birthday:
          "On your special day, I want you to know that you are the most wonderful person I know. May this new year of life be full of blessings, laughter and unforgettable moments together.",
        general:
          "Every day that passes I realize how lucky I am to have you in my life. Your love inspires me to be a better person and your presence fills my days with happiness.",
      },
    },
  }

  const langTemplates = templates[language as keyof typeof templates] || templates.es
  const typeTemplates = langTemplates[type as keyof typeof langTemplates] || langTemplates.romantic
  const text =
    typeTemplates[occasion as keyof typeof typeTemplates] || typeTemplates.general || Object.values(typeTemplates)[0]

  return text
}

export default function AITextGenerator({ onTextGenerated, currentLanguage }: AITextGeneratorProps) {
  const [selectedType, setSelectedType] = useState("romantic")
  const [selectedOccasion, setSelectedOccasion] = useState("general")
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const text = generateAIText(selectedType, selectedOccasion, currentLanguage)
    setGeneratedText(text)
    setIsGenerating(false)
  }

  const handleUseText = () => {
    onTextGenerated(generatedText)
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedText)
  }

  const currentMessageTypes = messageTypes[currentLanguage as keyof typeof messageTypes] || messageTypes.es
  const currentOccasions = occasions[currentLanguage as keyof typeof occasions] || occasions.es

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Generador de Texto IA
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controles */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Estilo del mensaje</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currentMessageTypes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Ocasión</label>
            <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currentOccasions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botón generar */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generar Texto
            </>
          )}
        </Button>

        {/* Texto generado */}
        {generatedText && (
          <div className="space-y-3">
            <Textarea
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              rows={6}
              className="resize-none"
              placeholder="El texto generado aparecerá aquí..."
            />

            <div className="flex gap-2">
              <Button onClick={handleUseText} className="flex-1 bg-transparent" variant="outline">
                Usar Texto
              </Button>
              <Button onClick={handleCopyText} variant="outline" size="icon">
                <Copy className="w-4 h-4" />
              </Button>
              <Button onClick={handleGenerate} variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

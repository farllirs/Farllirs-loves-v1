"use client"

import { useState } from "react"
import { Heart, Star, Gift, Sparkles, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Template {
  id: string
  name: string
  category: string
  icon: any
  preview: {
    title: string
    message: string
    backgroundColor: string
    textColor: string
    accentColor: string
    pattern: string
  }
  occasion: string
}

const templates: Template[] = [
  {
    id: "valentine",
    name: "San Valentín Clásico",
    category: "Romántico",
    icon: Heart,
    occasion: "San Valentín",
    preview: {
      title: "Mi Amor Eterno",
      message:
        "En este día especial quiero recordarte que eres la razón de mi sonrisa cada mañana. Tu amor ilumina mi mundo y hace que cada día sea una nueva aventura llena de felicidad.",
      backgroundColor: "#fef7f0",
      textColor: "#8b5a3c",
      accentColor: "#e91e63",
      pattern: "hearts",
    },
  },
  {
    id: "anniversary",
    name: "Aniversario Elegante",
    category: "Celebración",
    icon: Crown,
    occasion: "Aniversario",
    preview: {
      title: "Nuestro Aniversario",
      message:
        "Hoy celebramos otro año juntos, otro año de risas, lágrimas de felicidad y momentos inolvidables. Gracias por ser mi compañero de vida y mi mejor amigo.",
      backgroundColor: "#faf7ff",
      textColor: "#581c87",
      accentColor: "#a855f7",
      pattern: "vintage",
    },
  },
  {
    id: "birthday",
    name: "Cumpleaños Especial",
    category: "Celebración",
    icon: Gift,
    occasion: "Cumpleaños",
    preview: {
      title: "¡Feliz Cumpleaños!",
      message:
        "En tu día especial quiero que sepas lo importante que eres para mí. Que este nuevo año de vida esté lleno de bendiciones, amor y momentos maravillosos.",
      backgroundColor: "#fef3c7",
      textColor: "#92400e",
      accentColor: "#f59e0b",
      pattern: "stars",
    },
  },
  {
    id: "apology",
    name: "Disculpa Sincera",
    category: "Reconciliación",
    icon: Heart,
    occasion: "Disculpa",
    preview: {
      title: "Perdóname",
      message:
        "Sé que cometí un error y quiero pedirte perdón de corazón. Tu amor es lo más valioso que tengo y haré todo lo posible para recuperar tu confianza.",
      backgroundColor: "#f0f9ff",
      textColor: "#1e40af",
      accentColor: "#3b82f6",
      pattern: "dots",
    },
  },
  {
    id: "gratitude",
    name: "Agradecimiento",
    category: "Gratitud",
    icon: Sparkles,
    occasion: "Agradecimiento",
    preview: {
      title: "Gracias por Todo",
      message:
        "Quiero tomarme un momento para agradecerte por todo lo que haces por mí. Tu apoyo, tu amor y tu paciencia hacen de mí una mejor persona cada día.",
      backgroundColor: "#f7fee7",
      textColor: "#365314",
      accentColor: "#65a30d",
      pattern: "flowers",
    },
  },
  {
    id: "long_distance",
    name: "Amor a Distancia",
    category: "Romántico",
    icon: Star,
    occasion: "Distancia",
    preview: {
      title: "A Pesar de la Distancia",
      message:
        "Aunque estemos lejos, mi corazón está siempre contigo. Cada estrella en el cielo me recuerda que nuestro amor trasciende cualquier distancia.",
      backgroundColor: "#fef7f0",
      textColor: "#8b5a3c",
      accentColor: "#e91e63",
      pattern: "stars",
    },
  },
]

interface TemplatesGalleryProps {
  onSelectTemplate: (template: Template) => void
  currentLanguage: string
}

export default function TemplatesGallery({ onSelectTemplate, currentLanguage }: TemplatesGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Romántico", "Celebración", "Reconciliación", "Gratitud"]

  const filteredTemplates =
    selectedCategory === "Todos" ? templates : templates.filter((template) => template.category === selectedCategory)

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gift className="w-5 h-5 text-green-500" />
          Plantillas Predefinidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grid de plantillas */}
        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <template.icon className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-sm">{template.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {template.occasion}
                </Badge>
              </div>

              {/* Preview miniatura */}
              <div
                className="w-full h-20 rounded text-xs p-2 mb-2 overflow-hidden"
                style={{
                  backgroundColor: template.preview.backgroundColor,
                  color: template.preview.textColor,
                }}
              >
                <div className="font-bold mb-1" style={{ color: template.preview.accentColor }}>
                  {template.preview.title}
                </div>
                <div className="text-xs leading-tight line-clamp-2">{template.preview.message.substring(0, 80)}...</div>
              </div>

              <Button
                size="sm"
                className="w-full text-xs group-hover:bg-pink-500 group-hover:text-white transition-colors bg-transparent"
                variant="outline"
              >
                Usar Plantilla
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

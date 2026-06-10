"use client"

import { useRef, useState } from "react"
import { Camera, X, Loader2, ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string | null
  onChange: (value: string | null) => void
  /** rendered size in px */
  size?: number
  shape?: "circle" | "square"
  /** fallback initial(s) shown when there is no image */
  fallback?: string
  className?: string
}

/** Center-crop + resize an image file to a small square JPEG data URL. */
function resizeImage(file: File, max = 400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Could not read file"))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error("Could not load image"))
      img.onload = () => {
        const side = Math.min(img.width, img.height)
        const sx = (img.width - side) / 2
        const sy = (img.height - side) / 2
        const canvas = document.createElement("canvas")
        canvas.width = max
        canvas.height = max
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Canvas unsupported"))
        ctx.drawImage(img, sx, sy, side, side, 0, 0, max, max)
        resolve(canvas.toDataURL("image/jpeg", quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export function ImageUpload({
  value,
  onChange,
  size = 96,
  shape = "circle",
  fallback,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFile = async (file?: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file")
      return
    }
    setError("")
    setLoading(true)
    try {
      const dataUrl = await resizeImage(file)
      onChange(dataUrl)
    } catch {
      setError("Could not process that image")
    } finally {
      setLoading(false)
    }
  }

  const radius = shape === "circle" ? "rounded-full" : "rounded-2xl"

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group relative w-full h-full overflow-hidden border-2 border-dashed border-book-gold/50 bg-book-cream/70 flex items-center justify-center transition-colors hover:border-book-gold hover:bg-book-cream",
            radius
          )}
          aria-label="Upload image"
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : fallback ? (
            <span className="font-handwritten text-book-accent/80" style={{ fontSize: size * 0.4 }}>
              {fallback}
            </span>
          ) : (
            <ImagePlus className="text-book-gold/70" style={{ width: size * 0.32, height: size * 0.32 }} />
          )}

          {/* hover overlay */}
          <span className={cn(
            "absolute inset-0 flex items-center justify-center bg-book-text/45 opacity-0 group-hover:opacity-100 transition-opacity",
            radius
          )}>
            {loading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Camera className="w-5 h-5 text-white" />
            )}
          </span>
        </button>

        {value && !loading && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-book-accent text-white flex items-center justify-center shadow-md hover:bg-book-accent/90 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="text-[11px] text-red-500 font-serif">{error}</p>}
    </div>
  )
}

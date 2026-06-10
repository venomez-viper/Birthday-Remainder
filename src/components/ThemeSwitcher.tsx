"use client"
import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const themes = [
  { name: "Cherry Blossom", value: "cherry-blossom", color: "bg-pink-300" },
  { name: "Sunflower Garden", value: "sunflower-garden", color: "bg-amber-400" },
  { name: "Lavender Dreams", value: "lavender-dreams", color: "bg-purple-300" },
  { name: "Botanical Green", value: "botanical-green", color: "bg-emerald-400" },
  { name: "Midnight Garden", value: "midnight-garden", color: "bg-slate-800" },
  { name: "Rose Garden", value: "rose-garden", color: "bg-rose-600" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="group/button inline-flex shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background/80 backdrop-blur-md hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 shadow-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer w-12 h-12">
          <Palette className="h-6 w-6 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2 bg-background/90 backdrop-blur-xl border-primary/10">
          <DropdownMenuLabel className="font-serif">Select Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-1 gap-1">
            {themes.map((t) => (
              <DropdownMenuItem 
                key={t.value} 
                onClick={() => setTheme(t.value)}
                className={`flex items-center gap-3 cursor-pointer rounded-md p-2 transition-colors ${theme === t.value ? 'bg-primary/10 font-medium' : ''}`}
              >
                <div className={`w-4 h-4 rounded-full shadow-sm ${t.color}`} />
                {t.name}
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

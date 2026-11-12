import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, LANGS, type Content, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content }
const LangContext = createContext<Ctx | null>(null)

function readStored(): Lang | null {
  try {
    const v = localStorage.getItem('lang') as Lang | null
    return v && LANGS.includes(v) ? v : null
  } catch {
    return null
  }
}

function detect(): Lang {
  const stored = readStored()
  if (stored) return stored
  const nav = (navigator.language || 'en').slice(0, 2) as Lang
  return LANGS.includes(nav) ? nav : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect)
  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch { /* ignore */ }
  }
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}

type Theme = 'dark' | 'light'
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={useThemeState()}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const v = localStorage.getItem('theme')
      if (v === 'light' || v === 'dark') return v
    } catch { /* ignore */ }
    return 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}

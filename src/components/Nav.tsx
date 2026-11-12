import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useLang, useTheme } from '../i18n'
import { LANGS } from '../content'

const IDS = ['about', 'skills', 'experience', 'projects', 'contact'] as const

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="nav__name">Almir Dzaferi</a>
        <span className="nav__role">{t.hero.roles[0]}</span>
        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Main">
          {IDS.map((id, i) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>
              <span className="nav__idx">0{i + 1}</span> {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          {LANGS.map((l) => (
            <button key={l} className={`nav__lang ${l === lang ? 'is-active' : ''}`} onClick={() => setLang(l)} aria-pressed={l === lang}>
              {l.toUpperCase()}
            </button>
          ))}
          <button className="nav__icon" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="nav__icon nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}

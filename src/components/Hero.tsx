import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, MapPin } from 'lucide-react'
import { useLang } from '../i18n'
import { config } from '../config'
import Terminal from './Terminal'
import photo from '../assets/almir.webp'

const CAPTION = {
  en: 'me — probably fixing DNS',
  fr: 'moi — sûrement en train de réparer le DNS',
  de: 'ich — repariere wohl gerade DNS',
}
const TRY = { en: 'try it ↓', fr: 'essaie ↓', de: 'probier’s ↓' }

export default function Hero() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    setI(0)
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % t.hero.roles.length), 2800)
    return () => clearInterval(id)
  }, [lang, reduce, t.hero.roles.length])

  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__hello mono">{t.hero.hello} 👋</p>
          <h1 className="hero__name">
            Almir<br />Dzaferi<span className="hero__dot">.</span>
          </h1>
          <p className="hero__role">
            <AnimatePresence mode="wait">
              <motion.mark
                key={`${lang}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {t.hero.roles[i]}
              </motion.mark>
            </AnimatePresence>
          </p>
          <p className="hero__pitch">{t.hero.pitch}</p>
          <div className="hero__meta">
            <span className="pill"><MapPin size={14} /> {t.hero.location}</span>
            <span className="pill pill--ok"><span className="dot" /> {t.hero.available}</span>
          </div>
          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary">{t.hero.ctaProjects} <ArrowDownRight size={18} /></a>
            <a href="#contact" className="btn btn-ghost">{t.hero.ctaContact}</a>
          </div>
        </div>

        {config.showPhoto && (
          <motion.figure
            className="polaroid"
            initial={reduce ? false : { opacity: 0, rotate: 0, y: 20 }}
            animate={{ opacity: 1, rotate: 3, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
          >
            <span className="tape" />
            <img src={photo} alt="Almir Dzaferi" width={640} height={766} />
            <figcaption className="hand">{CAPTION[lang]}</figcaption>
          </motion.figure>
        )}
      </div>

      <div className="container hero__term">
        <span className="hand hero__try">{TRY[lang]}</span>
        <Terminal />
      </div>

      <div className="container">
        <ul className="stats">
          {t.stats.map((s, k) => (
            <li key={k} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useLang } from '../i18n'
import { config } from '../config'
import Terminal from './Terminal'
import photo from '../assets/almir.webp'

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
      <div className="container grid hero__grid">
        <motion.h1
          className="hero__name"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Almir<br />Dzaferi
        </motion.h1>

        <div className="hero__side">
          <div className="cross" aria-hidden="true"><i /><i /></div>
          {config.showPhoto && <img className="hero__photo" src={photo} alt="Almir Dzaferi" width={640} height={766} />}
        </div>

        <div className="hero__role">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${lang}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {t.hero.roles[i]}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="hero__pitch">{t.hero.pitch}</p>
        <dl className="hero__facts">
          <div><dt>{lang === 'de' ? 'Ort' : lang === 'fr' ? 'Lieu' : 'Location'}</dt><dd>{t.hero.location}</dd></div>
          <div><dt>{lang === 'de' ? 'Status' : lang === 'fr' ? 'Statut' : 'Status'}</dt><dd><span className="live" /> {t.hero.available}</dd></div>
        </dl>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--solid">{t.hero.ctaProjects} <ArrowDown size={18} /></a>
          <a href="#contact" className="btn btn--line">{t.hero.ctaContact} <ArrowRight size={18} /></a>
        </div>
      </div>

      <div className="band">
        <div className="container grid">
          <span className="band__label">Terminal</span>
          <div className="band__body"><Terminal /></div>
        </div>
      </div>

      <div className="container">
        <ul className="stats">
          {t.stats.map((s, k) => (
            <li key={k}>
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

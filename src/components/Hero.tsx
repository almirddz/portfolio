import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Send } from 'lucide-react'
import { useLang } from '../i18n'
import { config } from '../config'
import NetworkCanvas from './NetworkCanvas'
import photo from '../assets/almir.webp'

export default function Hero() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    setI(0)
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % t.hero.roles.length), 2600)
    return () => clearInterval(id)
  }, [lang, reduce, t.hero.roles.length])

  return (
    <section id="top" className="hero">
      <NetworkCanvas />
      <div className="hero__fade" />
      <div className="container hero__inner">
        <motion.div
          className="hero__text"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__status">
            <span className="dot" /> {t.hero.available}
          </span>
          <p className="hero__hello">{t.hero.hello}</p>
          <h1 className="hero__title">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${lang}-${i}`}
                className="hero__role"
                initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.45 }}
              >
                {t.hero.roles[i]}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="hero__pitch">{t.hero.pitch}</p>
          <p className="hero__loc">
            <MapPin size={16} /> {t.hero.location}
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary">
              {t.hero.ctaProjects} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Send size={16} /> {t.hero.ctaContact}
            </a>
          </div>
        </motion.div>

        {config.showPhoto && (
          <motion.div
            className="hero__photo"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__photo-ring" />
            <img src={photo} alt="Almir Dzaferi" width={300} height={300} />
            <div className="hero__terminal card" aria-hidden="true">
              <span className="term-dim">$</span> ping almir<br />
              <span className="term-ok">reply: time=1ms ttl=64</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="container">
        <div className="stats">
          {t.stats.map((s, k) => (
            <motion.div
              key={k}
              className="stat card"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + k * 0.08 }}
            >
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

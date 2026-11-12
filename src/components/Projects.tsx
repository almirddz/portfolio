import { useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { useLang } from '../i18n'
import Reveal from './Reveal'

function tilt(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export default function Projects() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="projects" className="section-alt">
      <div className="container">
        <Reveal>
          <span className="eyebrow">§ 04</span>
          <h2 className="section-title">{t.projects.title}</h2>
        </Reveal>
        <div className="projects-grid">
          {t.projects.items.map((p, i) => {
            const isOpen = open === i
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.08} className={i === 0 ? 'project--featured' : ''}>
                <article className="project card" onMouseMove={tilt}>
                  <div className="project__glow" />
                  <span className="project__kind">{p.kind}</span>
                  <h3 className="project__title">{p.title}</h3>
                  <p className="project__summary">{p.summary}</p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        className="project__details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {p.details.map((d, k) => (
                          <li key={k}>{d}</li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <div className="project__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project__actions">
                    <button className="project__toggle" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                      {isOpen ? t.projects.less : t.projects.more}
                      <ChevronDown size={16} className={isOpen ? 'rot' : ''} />
                    </button>
                    {p.link && (
                      <a className="project__link" href={p.link.href} target="_blank" rel="noopener noreferrer">
                        {p.link.label} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

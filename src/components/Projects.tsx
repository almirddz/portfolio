import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useLang } from '../i18n'
import Section from './Section'

export default function Projects() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section id="projects" num="04" title={t.projects.title}>
      <div className="table">
        {t.projects.items.map((p, i) => {
          const isOpen = open === i
          return (
            <div key={p.title} className={`row row--proj ${isOpen ? 'is-open' : ''}`}>
              <button className="row__head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span className="row__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="row__title row__title--big">{p.title}</span>
                <span className="row__org">{p.kind}</span>
                <Plus size={22} className="row__plus" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="proj"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="proj__inner">
                      <p className="proj__summary">{p.summary}</p>
                      <ul className="row__detail row__detail--flat">
                        {p.details.map((d, k) => <li key={k}>{d}</li>)}
                      </ul>
                      <p className="proj__tags">{p.tags.join(' / ')}</p>
                      {p.link && (
                        <a className="proj__link" href={p.link.href} target="_blank" rel="noopener noreferrer">
                          {p.link.label} <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

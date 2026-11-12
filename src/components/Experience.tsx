import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useLang } from '../i18n'
import Section from './Section'

export default function Experience() {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="experience" num="03" title={t.experience.title}>
      <div className="table">
        {t.experience.items.map((job, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`row row--exp ${isOpen ? 'is-open' : ''}`}>
              <button className="row__head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span className="row__year">{job.period}</span>
                <span className="row__title">{job.role}</span>
                <span className="row__org">{job.org}</span>
                <span className="row__place">{job.place}</span>
                <Plus size={20} className="row__plus" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    className="row__detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {job.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

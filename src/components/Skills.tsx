import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Network, Server, Code2, Wrench } from 'lucide-react'
import { useLang } from '../i18n'
import Reveal from './Reveal'

const ICONS = [Network, Server, Code2, Wrench]

export default function Skills() {
  const { t } = useLang()
  const [filter, setFilter] = useState<number>(-1)
  const groups = t.skills.groups

  return (
    <section id="skills" className="section-alt">
      <div className="container">
        <Reveal>
          <span className="eyebrow">02 · {t.nav.skills}</span>
          <h2 className="section-title">{t.skills.title}</h2>
        </Reveal>

        <Reveal>
          <div className="filters" role="tablist">
            <LayoutGroup>
              {[t.skills.all, ...groups.map((g) => g.name)].map((name, k) => {
                const idx = k - 1
                const active = filter === idx
                return (
                  <button key={name} role="tab" aria-selected={active} className={`filter ${active ? 'is-active' : ''}`} onClick={() => setFilter(idx)}>
                    {active && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <span className="filter__label">{name}</span>
                  </button>
                )
              })}
            </LayoutGroup>
          </div>
        </Reveal>

        <motion.div layout className="skills-grid">
          <AnimatePresence mode="popLayout">
            {groups.map((g, gi) =>
              filter === -1 || filter === gi ? (
                <motion.div
                  key={g.name}
                  layout
                  className="skill-card card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="skill-card__head">
                    {(() => { const I = ICONS[gi]; return <I size={20} /> })()}
                    <h3>{g.name}</h3>
                  </div>
                  <div className="skill-card__items">
                    {g.items.map((s, si) => (
                      <motion.span
                        key={s}
                        className="skill"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: si * 0.03 }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

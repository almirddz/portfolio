import { useLang } from '../i18n'
import Reveal from './Reveal'

// Experience rendered like `git log`, newest commit first.
const COMMITS = [
  { hash: 'a3f9c21', refs: 'HEAD -> sapporo' },
  { hash: '7b2e04d', refs: 'tag: cfc-2026' },
]

export default function Experience() {
  const { t } = useLang()
  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <span className="eyebrow">§ 03</span>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="mono muted cmd">$ git log --career</p>
        </Reveal>
        <div className="gitlog">
          {t.experience.items.map((job, i) => {
            const c = COMMITS[i] ?? { hash: '0000000', refs: '' }
            return (
              <Reveal key={i} delay={i * 0.08}>
                <article className="commit">
                  <div className="commit__graph"><span className={`commit__node ${job.current ? 'is-current' : ''}`} /></div>
                  <div className="commit__body">
                    <p className="mono commit__hash">
                      commit {c.hash}
                      {c.refs && <span className="commit__refs"> ({c.refs})</span>}
                    </p>
                    <p className="mono muted small">Date: {job.period} · {job.place}</p>
                    <h3 className="commit__msg">{job.role}</h3>
                    <p className="commit__org">{job.org}</p>
                    <ul className="commit__diff">
                      {job.bullets.map((b, k) => (
                        <li key={k}><span className="plus">+</span> {b}</li>
                      ))}
                    </ul>
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

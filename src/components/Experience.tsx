import { Briefcase, MapPin } from 'lucide-react'
import { useLang } from '../i18n'
import Reveal from './Reveal'

export default function Experience() {
  const { t } = useLang()
  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <span className="eyebrow">03 · {t.nav.experience}</span>
          <h2 className="section-title">{t.experience.title}</h2>
        </Reveal>
        <ol className="timeline">
          {t.experience.items.map((job, i) => (
            <li key={i} className="timeline__item">
              <span className={`timeline__dot ${job.current ? 'is-current' : ''}`} />
              <Reveal delay={i * 0.1}>
                <article className="job card">
                  <header className="job__head">
                    <div>
                      <h3>{job.role}</h3>
                      <p className="job__org">
                        <Briefcase size={15} /> {job.org}
                        <span className="sep">·</span>
                        <MapPin size={15} /> {job.place}
                      </p>
                    </div>
                    <span className={`job__period ${job.current ? 'is-current' : ''}`}>{job.period}</span>
                  </header>
                  <ul className="job__list">
                    {job.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

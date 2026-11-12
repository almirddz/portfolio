import { Award, GraduationCap } from 'lucide-react'
import { useLang } from '../i18n'
import Reveal from './Reveal'

export default function Education() {
  const { t } = useLang()
  return (
    <section id="education">
      <div className="container">
        <Reveal>
          <span className="eyebrow">§ 05</span>
          <h2 className="section-title">{t.education.title}</h2>
        </Reveal>
        <div className="edu-grid">
          {t.education.items.map((e, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="edu card">
                <div className="edu__icon">{e.note ? <Award size={20} /> : <GraduationCap size={20} />}</div>
                <div>
                  <div className="edu__top">
                    <h3>{e.title}</h3>
                    {e.badge && <span className={`badge ${e.note ? 'badge--gold' : ''}`}>{e.badge}</span>}
                  </div>
                  <p className="edu__org">{e.org}</p>
                  {e.note && <p className="edu__note">{e.note}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

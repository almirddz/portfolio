import { useLang } from '../i18n'
import Section from './Section'

export default function Education() {
  const { t } = useLang()
  return (
    <Section id="education" num="05" title={t.education.title}>
      <div className="table">
        {t.education.items.map((e, i) => (
          <div key={i} className="row row--edu">
            <span className="row__title">{e.title}</span>
            <span className="row__org">{e.org}</span>
            <span className="row__place">
              {e.badge && <span className={`flag ${e.note ? 'flag--red' : ''}`}>{e.badge}</span>}
            </span>
            {e.note && <span className="row__note">{e.note}</span>}
          </div>
        ))}
      </div>
    </Section>
  )
}

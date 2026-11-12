import { useLang } from '../i18n'
import Reveal from './Reveal'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about">
      <div className="container about">
        <Reveal>
          <span className="eyebrow">§ 01</span>
          <h2 className="section-title">{t.about.title}</h2>
        </Reveal>
        <div className="about__body">
          {t.about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={i === t.about.paragraphs.length - 1 ? 'about__next' : ''}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

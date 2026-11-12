import { useState } from 'react'
import { useLang } from '../i18n'
import Section from './Section'

export default function Skills() {
  const { t } = useLang()
  const [hover, setHover] = useState<string | null>(null)
  return (
    <Section id="skills" num="02" title={t.skills.title}>
      <div className="table">
        {t.skills.groups.map((g) => (
          <div key={g.name} className="row row--skills">
            <span className="row__key">{g.name}</span>
            <ul className="skills">
              {g.items.map((s) => (
                <li
                  key={s}
                  className={hover && hover !== s ? 'is-dim' : ''}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(null)}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

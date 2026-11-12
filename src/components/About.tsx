import { useLang } from '../i18n'
import Section from './Section'
import Reveal from './Reveal'

export default function About() {
  const { t } = useLang()
  const [lead, ...rest] = t.about.paragraphs
  return (
    <Section id="about" num="01" title={t.about.title}>
      <Reveal><p className="about__lead">{lead}</p></Reveal>
      <div className="about__cols">
        {rest.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}><p>{p}</p></Reveal>
        ))}
      </div>
    </Section>
  )
}

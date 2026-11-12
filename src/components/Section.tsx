import type { ReactNode } from 'react'
import Reveal from './Reveal'

// Swiss grid section: big red number on the left (2 cols), content on the right (10 cols).
export default function Section({ id, num, title, children, dark }: { id: string; num: string; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={`sec ${dark ? 'sec--dark' : ''}`}>
      <div className="container grid">
        <Reveal className="sec__num">{num}</Reveal>
        <div className="sec__body">
          <Reveal><h2 className="sec__title">{title}</h2></Reveal>
          {children}
        </div>
      </div>
    </section>
  )
}

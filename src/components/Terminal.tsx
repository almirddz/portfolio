import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLang } from '../i18n'
import { run, terminalHint } from '../terminal'

type Entry = { cmd?: string; out: string[] }

const SUGGESTIONS = ['help', 'whoami', 'skills', 'projects', 'ping almir', 'sudo hire-me']

export default function Terminal() {
  const { lang, t } = useLang()
  const [history, setHistory] = useState<Entry[]>([])
  const [value, setValue] = useState('')
  const [past, setPast] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHistory([{ out: [terminalHint(lang)] }])
  }, [lang])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [history])

  const exec = (cmd: string) => {
    const res = run(cmd, lang, t)
    if (res.action === 'clear') return setHistory([])
    setHistory((h) => [...h, { cmd, out: res.lines }])
    if (cmd.trim()) setPast((p) => [cmd, ...p].slice(0, 20))
    setCursor(-1)
    if (res.action === 'contact' || res.action === 'projects') {
      setTimeout(() => document.getElementById(res.action!)?.scrollIntoView({ behavior: 'smooth' }), 700)
    }
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      exec(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const n = Math.min(cursor + 1, past.length - 1)
      if (n >= 0) { setCursor(n); setValue(past[n]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const n = cursor - 1
      setCursor(n)
      setValue(n >= 0 ? past[n] : '')
    }
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <div className="term__body" ref={bodyRef} aria-live="polite">
        {history.map((e, i) => (
          <div key={i}>
            {e.cmd !== undefined && (
              <div><span className="term__prompt">$</span> {e.cmd}</div>
            )}
            {e.out.map((l, k) => (
              <div key={k} className="term__out">{l}</div>
            ))}
          </div>
        ))}
        <label className="term__line">
          <span className="term__prompt">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal"
          />
        </label>
      </div>
      <div className="term__chips">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={(e) => { e.stopPropagation(); exec(s) }}>{s}</button>
        ))}
      </div>
    </div>
  )
}

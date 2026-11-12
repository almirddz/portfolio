import { useEffect, useRef, useState, type FormEvent } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Send, ShieldCheck, Video, Linkedin } from 'lucide-react'
import { useLang } from '../i18n'
import { config } from '../config'
import Reveal from './Reveal'
import Section from './Section'

// Anti-bot layers:
// 1. hCaptcha (verified server-side by Web3Forms)
// 2. Two honeypots: Web3Forms "botcheck" + a hidden "website" field
// 3. Time trap: forms submitted < 3 s after opening are rejected
// 4. Cooldown: one message per minute per browser
// 5. Length limits + validation on every field
const MIN_FILL_MS = 3000
const COOLDOWN_MS = 60_000
const LIMITS = { name: 80, email: 120, subject: 120, message: 3000 }

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; msg?: string }

function lastSent(): number {
  try { return Number(localStorage.getItem('contact_sent_at') || 0) } catch { return 0 }
}

export default function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const startedAt = useRef(Date.now())
  const captchaRef = useRef<HCaptcha>(null)
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { startedAt.current = Date.now() }, [])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    // Honeypots: bots fill hidden fields. Pretend success, send nothing.
    if (get('website') || data.get('botcheck')) {
      setStatus({ kind: 'success', msg: c.success })
      form.reset()
      return
    }
    if (Date.now() - startedAt.current < MIN_FILL_MS) return setStatus({ kind: 'error', msg: c.tooFast })
    if (Date.now() - lastSent() < COOLDOWN_MS) return setStatus({ kind: 'error', msg: c.cooldown })

    const name = get('name'), email = get('email'), subject = get('subject'), message = get('message')
    const errs: Record<string, string> = {}
    if (name.length < 2) errs.name = c.invalid.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = c.invalid.email
    if (message.length < 20) errs.message = c.invalid.message
    setErrors(errs)
    if (Object.keys(errs).length) return

    if (!config.web3formsKey) return setStatus({ kind: 'error', msg: c.notConfigured })
    if (!token) return setStatus({ kind: 'error', msg: c.captcha })

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: config.web3formsKey,
          subject: `[Portfolio] ${subject || 'New message'}`,
          from_name: 'Portfolio – almirddz.github.io',
          name: name.slice(0, LIMITS.name),
          email: email.slice(0, LIMITS.email),
          message: message.slice(0, LIMITS.message),
          language: lang,
          botcheck: false,
          'h-captcha-response': token,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) throw new Error(json.message || 'failed')
      try { localStorage.setItem('contact_sent_at', String(Date.now())) } catch { /* ignore */ }
      setStatus({ kind: 'success', msg: c.success })
      form.reset()
    } catch {
      setStatus({ kind: 'error', msg: c.error })
    } finally {
      setToken(null)
      captchaRef.current?.resetCaptcha()
    }
  }

  return (
    <Section id="contact" num="06" title={c.title} dark>
      <div className="contact">
        <Reveal className="contact__intro">
          <p>{c.intro}</p>
          <ul className="contact__points">
            <li><Video size={18} /> Google Meet · Teams · Zoom</li>
            {config.linkedin && (
              <li><Linkedin size={18} /> <a className="contact__link" href={config.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
            )}
            <li><ShieldCheck size={18} /> hCaptcha · {c.privacy}</li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="contact__form" onSubmit={onSubmit} noValidate>
            {/* Honeypots — hidden from humans and screen readers */}
            <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="hp" aria-hidden="true">
              <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <div className="field-row">
              <Field label={c.name} name="name" max={LIMITS.name} autoComplete="name" error={errors.name} />
              <Field label={c.email} name="email" type="email" max={LIMITS.email} autoComplete="email" error={errors.email} />
            </div>
            <Field label={c.subject} name="subject" max={LIMITS.subject} />
            <Field label={c.message} name="message" textarea max={LIMITS.message} error={errors.message} />

            <div className="captcha">
              <HCaptcha
                ref={captchaRef}
                sitekey={config.hcaptchaSiteKey}
                reCaptchaCompat={false}
                theme="dark"
                languageOverride={lang}
                onVerify={setToken}
                onExpire={() => setToken(null)}
              />
            </div>

            <button type="submit" className="btn btn-primary contact__send" disabled={status.kind === 'sending'}>
              <Send size={16} /> {status.kind === 'sending' ? c.sending : c.send}
            </button>

            <AnimatePresence>
              {(status.kind === 'success' || status.kind === 'error') && (
                <motion.p
                  role="status"
                  className={`form-status form-status--${status.kind}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {status.kind === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />} {status.msg}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

function Field(props: {
  label: string
  name: string
  type?: string
  max: number
  textarea?: boolean
  autoComplete?: string
  error?: string
}) {
  const id = `f-${props.name}`
  return (
    <div className={`field ${props.error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{props.label}</label>
      {props.textarea ? (
        <textarea id={id} name={props.name} maxLength={props.max} rows={6} aria-invalid={!!props.error} />
      ) : (
        <input id={id} name={props.name} type={props.type ?? 'text'} maxLength={props.max} autoComplete={props.autoComplete} aria-invalid={!!props.error} />
      )}
      {props.error && <span className="field__error">{props.error}</span>}
    </div>
  )
}

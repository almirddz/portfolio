import { Github, Linkedin } from 'lucide-react'
import { useLang } from '../i18n'
import { config } from '../config'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} · {t.footer}</p>
        <div className="footer__links">
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
              <Github size={18} />
            </a>
          )}
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

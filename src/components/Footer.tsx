import { useLang } from '../i18n'
import { config } from '../config'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container grid">
        <span className="footer__a">© {new Date().getFullYear()} Almir Dzaferi</span>
        <span className="footer__b">{t.footer}</span>
        <span className="footer__c">
          {config.github && <a href={config.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
          {config.linkedin && <a href={config.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
        </span>
      </div>
    </footer>
  )
}

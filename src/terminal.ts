import type { Content, Lang } from './content'

// The little interactive shell in the hero. Each command returns lines of text.
type Lines = string[]

const ui: Record<Lang, { hint: string; notFound: string; hire: string; help: Lines; contactHint: string }> = {
  en: {
    hint: "type 'help' and press Enter",
    notFound: 'command not found',
    hire: "[sudo] password for recruiter: ******\nAccess granted. Scrolling to the contact form…",
    contactHint: 'Opening the contact form…',
    help: [
      'whoami      who is this guy',
      'skills      what I work with',
      'projects    things I built',
      'experience  where I worked',
      'ping almir  am I reachable?',
      'contact     send me a message',
      'clear       clear the screen',
    ],
  },
  fr: {
    hint: "tape 'help' puis Entrée",
    notFound: 'commande introuvable',
    hire: "[sudo] mot de passe pour recruteur : ******\nAccès accordé. Direction le formulaire de contact…",
    contactHint: 'Ouverture du formulaire de contact…',
    help: [
      'whoami      qui est ce gars',
      'skills      avec quoi je travaille',
      'projects    ce que j’ai construit',
      'experience  où j’ai travaillé',
      'ping almir  suis-je joignable ?',
      'contact     m’envoyer un message',
      'clear       effacer l’écran',
    ],
  },
  de: {
    hint: "tippe 'help' und Enter",
    notFound: 'Befehl nicht gefunden',
    hire: "[sudo] Passwort für Recruiter: ******\nZugriff gewährt. Weiter zum Kontaktformular…",
    contactHint: 'Kontaktformular wird geöffnet…',
    help: [
      'whoami      wer ist das',
      'skills      womit ich arbeite',
      'projects    was ich gebaut habe',
      'experience  wo ich gearbeitet habe',
      'ping almir  bin ich erreichbar?',
      'contact     Nachricht senden',
      'clear       Bildschirm leeren',
    ],
  },
}

export function terminalHint(lang: Lang) {
  return ui[lang].hint
}

export type Result = { lines: Lines; action?: 'clear' | 'contact' | 'projects' }

export function run(raw: string, lang: Lang, t: Content): Result {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')
  const u = ui[lang]
  switch (cmd) {
    case '':
      return { lines: [] }
    case 'help':
    case 'ls':
      return { lines: u.help }
    case 'whoami':
      return { lines: [t.hero.hello.replace(/^.*?(Almir)/, 'Almir Dzaferi'), t.hero.roles[0] + ' · ' + t.hero.location] }
    case 'skills':
      return { lines: t.skills.groups.map((g) => `${g.name.padEnd(26, ' ')} ${g.items.slice(0, 5).join(', ')}…`) }
    case 'projects':
      return { lines: t.projects.items.map((p) => `• ${p.title} — ${p.kind}`), action: 'projects' }
    case 'experience':
    case 'git log':
      return { lines: t.experience.items.map((j) => `${j.period.padEnd(20, ' ')} ${j.role} @ ${j.org}`) }
    case 'ping almir':
    case 'ping':
      return {
        lines: [
          'PING almir (Sapporo → Fribourg)',
          '64 bytes from almir: icmp_seq=1 ttl=64 time=1 ms',
          '64 bytes from almir: icmp_seq=2 ttl=64 time=1 ms',
          '--- 0% packet loss, ready to work ---',
        ],
      }
    case 'contact':
      return { lines: [u.contactHint], action: 'contact' }
    case 'sudo hire almir':
    case 'sudo hire-me':
    case 'hire':
      return { lines: u.hire.split('\n'), action: 'contact' }
    case 'clear':
      return { lines: [], action: 'clear' }
    default:
      return { lines: [`${cmd.split(' ')[0]}: ${u.notFound}`] }
  }
}

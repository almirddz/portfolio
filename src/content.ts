// All texts of the site, in three languages. Edit here — the components only display this.
export type Lang = 'en' | 'fr' | 'de'
export const LANGS: Lang[] = ['en', 'fr', 'de']

type Project = {
  title: string
  kind: string
  summary: string
  details: string[]
  tags: string[]
  link?: { label: string; href: string }
}

export type Content = {
  nav: { about: string; skills: string; experience: string; projects: string; contact: string }
  hero: {
    hello: string
    roles: string[]
    pitch: string
    location: string
    ctaProjects: string
    ctaContact: string
    available: string
  }
  stats: { value: string; label: string }[]
  about: { title: string; paragraphs: string[] }
  skills: { title: string; all: string; groups: { name: string; items: string[] }[] }
  experience: {
    title: string
    items: { role: string; org: string; place: string; period: string; current?: boolean; bullets: string[] }[]
  }
  projects: { title: string; more: string; less: string; items: Project[] }
  education: {
    title: string
    items: { title: string; org: string; note?: string; badge?: string }[]
  }
  contact: {
    title: string
    intro: string
    name: string
    email: string
    subject: string
    message: string
    send: string
    sending: string
    success: string
    error: string
    tooFast: string
    cooldown: string
    captcha: string
    notConfigured: string
    privacy: string
    invalid: { name: string; email: string; message: string }
  }
  footer: string
}

const shared = {
  skills: [
    ['Networking', 'Réseau', 'Netzwerk', ['TCP/IP', 'DNS / DHCP', 'VLANs', 'Cisco', 'Cisco Catalyst Center', 'EfficientIP IPAM', 'Wi-Fi (Catalyst 9800)', 'Checkmk']],
    ['Systems & virtualisation', 'Systèmes & virtualisation', 'Systeme & Virtualisierung', ['Linux', 'Windows Server', 'VMware ESXi', 'vSphere', 'Active Directory', 'GPO', 'OpenLDAP']],
    ['Automation & code', 'Automatisation & code', 'Automatisierung & Code', ['PowerShell', 'Python', 'Bash', 'Kotlin', 'SQL', 'JavaScript', 'Vue.js', 'Flask']],
    ['Tools', 'Outils', 'Tools', ['Jira Service Management', 'Git', 'Docker', 'Nginx', 'MariaDB', 'AI assistants']],
  ] as const,
}

const groups = (i: 0 | 1 | 2) => shared.skills.map((g) => ({ name: g[i] as string, items: [...g[3]] }))

export const content: Record<Lang, Content> = {
  en: {
    nav: { about: 'About', skills: 'Skills', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
    hero: {
      hello: "Hi, I'm Almir",
      roles: ['Infrastructure Engineer', 'Network & Systems', 'Automation enthusiast'],
      pitch:
        'I keep networks and servers running — and automate everything I do twice. Swiss IT specialist with hands-on experience in Cisco networking, virtualisation and Windows/Linux administration.',
      location: 'Switzerland · currently in Sapporo, Japan',
      ctaProjects: 'See my projects',
      ctaContact: 'Get in touch',
      available: 'Available from March 2027',
    },
    stats: [
      { value: '10,000', label: 'users supported' },
      { value: '4 yrs', label: 'apprenticeship in enterprise IT' },
      { value: '#1', label: 'best overall average in my profession (FR, 2026)' },
      { value: '3', label: 'working languages' },
    ],
    about: {
      title: 'About me',
      paragraphs: [
        'I trained as an IT specialist (Federal VET Diploma, enterprise IT) at the IT services of the State of Fribourg, an environment of around 10,000 users. There I supported users, managed Cisco network devices, DNS/DHCP and IP address management, and ran virtual machines on VMware.',
        'Since September 2026 I have been working in an international team in Sapporo, Japan, developing a management system and supporting the network. I like understanding how things work end to end, documenting them well, and turning repetitive tasks into scripts.',
        'Next step: preparing the Cisco CCNA and growing as an infrastructure engineer.',
      ],
    },
    skills: { title: 'Skills', all: 'All', groups: groups(0) },
    experience: {
      title: 'Experience',
      items: [
        {
          role: 'IT Intern – Development & Networking',
          org: 'Meiji Academy',
          place: 'Sapporo, Japan',
          period: 'Sep 2026 – present',
          current: true,
          bullets: [
            'Developing a management system in Kotlin with a relational database',
            'Building the frontend with JavaScript and Vue.js',
            'Supporting and maintaining the network equipment',
            'Working daily in an international team (Japan, France, Germany…)',
          ],
        },
        {
          role: 'IT Apprentice – Enterprise IT',
          org: 'SITel – State of Fribourg',
          place: 'Fribourg, Switzerland',
          period: '2022 – 2026',
          bullets: [
            'Level 1 & 2 support for around 10,000 users, tickets in Jira Service Management',
            'Cisco devices managed and monitored through Cisco Catalyst Center and Checkmk',
            'IP ranges, DNS and DHCP zones in EfficientIP SOLIDserver',
            'Active Directory: accounts, groups, GPOs and security policies',
            'Windows Server and Linux VMs on VMware ESXi & vSphere',
            'PowerShell automation for administration and inventory',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      more: 'Details',
      less: 'Hide',
      items: [
        {
          title: 'Net Inventory',
          kind: 'Final apprenticeship project',
          summary: 'A web app that pulls the network inventory from Cisco Catalyst Center and EfficientIP IPAM, correlates it and flags anomalies.',
          details: [
            'Collects devices and IP data through the Catalyst Center and IPAM APIs',
            'Correlates both sources and detects inconsistencies automatically',
            'Dashboard with searchable tables (Jinja2, DataTables)',
            'Runs in Docker behind Nginx, data stored in MariaDB',
          ],
          tags: ['Python', 'Flask', 'Cisco Catalyst Center', 'IPAM', 'MariaDB', 'Docker'],
        },
        {
          title: 'Management System',
          kind: 'Internship · Meiji Academy',
          summary: 'An internal management system with a Kotlin backend, a relational database and a Vue.js frontend.',
          details: [
            'Backend services and data model in Kotlin',
            'Database design and queries',
            'Interactive frontend in JavaScript / Vue.js',
          ],
          tags: ['Kotlin', 'SQL', 'Vue.js', 'JavaScript'],
        },
        {
          title: 'ESXi / vSphere Lab',
          kind: 'Infrastructure lab',
          summary: 'A complete virtualisation environment built on physical servers installed in a technical room.',
          details: [
            'Racked and installed the physical servers',
            'Designed the IP addressing plan and the network configuration',
            'Deployed ESXi hosts managed through vCenter / vSphere',
          ],
          tags: ['VMware ESXi', 'vSphere', 'Networking', 'Hardware'],
        },
        {
          title: 'Network & Wi-Fi Lab',
          kind: 'Infrastructure lab',
          summary: 'Cisco access points deployed through a centralised Wi-Fi controller, with VLAN segmentation.',
          details: [
            'Catalyst 9800 wireless controller setup',
            'VLAN configuration and connectivity testing',
            'Full network documentation',
          ],
          tags: ['Cisco', 'Catalyst 9800', 'Wi-Fi', 'VLANs'],
        },
        {
          title: 'Cobalo',
          kind: 'Co-founder',
          summary: 'A Swiss IT company for small businesses: IT setup, managed IT, support and websites.',
          details: ['Co-founded with my brother in Fribourg', 'IT setup and support for SMEs', 'Websites and automation'],
          tags: ['Entrepreneurship', 'Managed IT', 'Web'],
          link: { label: 'cobalo.ch', href: 'https://cobalo.ch' },
        },
      ],
    },
    education: {
      title: 'Education & certifications',
      items: [
        { title: 'Federal VET Diploma in IT – Enterprise IT', org: 'EPAI Fribourg · 2022 – 2026', note: 'Award for the best overall average in the profession', badge: 'Award' },
        { title: 'Federal Vocational Baccalaureate (Technical)', org: 'EPAI Fribourg · 2022 – 2026' },
        { title: 'TOEIC Listening & Reading – 885 / 990', org: 'ETS · 2026 · CEFR B2' },
        { title: 'Cisco CCNA (200-301)', org: 'Cisco', badge: 'In progress' },
      ],
    },
    contact: {
      title: 'Contact',
      intro: "Interested in working together? Send me a message — I'll get back to you quickly. I'm in Japan for now, so I prefer video calls over phone calls.",
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Thank you! Your message was sent.',
      error: 'Something went wrong. Please try again later.',
      tooFast: 'That was fast — please take a moment and try again.',
      cooldown: 'Message already sent. Please wait a minute before sending another one.',
      captcha: 'Please complete the captcha.',
      notConfigured: 'The contact form is not configured yet.',
      privacy: 'Your data is only used to answer your message.',
      invalid: { name: 'Please enter your name.', email: 'Please enter a valid email.', message: 'Please write at least 20 characters.' },
    },
    footer: 'Built with React by Almir Dzaferi.',
  },

  fr: {
    nav: { about: 'À propos', skills: 'Compétences', experience: 'Expérience', projects: 'Projets', contact: 'Contact' },
    hero: {
      hello: 'Salut, moi c’est Almir',
      roles: ['Infrastructure Engineer', 'Réseaux & systèmes', 'Passionné d’automatisation'],
      pitch:
        'Je fais tourner les réseaux et les serveurs — et j’automatise tout ce que je fais deux fois. Informaticien suisse avec une expérience pratique en réseau Cisco, virtualisation et administration Windows/Linux.',
      location: 'Suisse · actuellement à Sapporo, Japon',
      ctaProjects: 'Voir mes projets',
      ctaContact: 'Me contacter',
      available: 'Disponible dès mars 2027',
    },
    stats: [
      { value: '10’000', label: 'utilisateurs supportés' },
      { value: '4 ans', label: 'd’apprentissage d’informaticien d’entreprise' },
      { value: '#1', label: 'meilleure moyenne de la profession (FR, 2026)' },
      { value: '3', label: 'langues de travail' },
    ],
    about: {
      title: 'À propos',
      paragraphs: [
        'Je me suis formé comme informaticien d’entreprise CFC au SITel, le service informatique de l’État de Fribourg, dans un environnement d’environ 10’000 utilisateurs. J’y ai fait du support, géré des équipements réseau Cisco, le DNS/DHCP et l’IPAM, et exploité des machines virtuelles sous VMware.',
        'Depuis septembre 2026, je travaille dans une équipe internationale à Sapporo, au Japon, où je développe un système de gestion et assure le support réseau. J’aime comprendre comment les choses fonctionnent de bout en bout, bien les documenter et transformer les tâches répétitives en scripts.',
        'Prochaine étape : préparer le Cisco CCNA et progresser comme ingénieur infrastructure.',
      ],
    },
    skills: { title: 'Compétences', all: 'Tout', groups: groups(1) },
    experience: {
      title: 'Expérience',
      items: [
        {
          role: 'Stagiaire IT – Développement & réseau',
          org: 'Meiji Academy',
          place: 'Sapporo, Japon',
          period: 'sept. 2026 – aujourd’hui',
          current: true,
          bullets: [
            'Développement d’un système de gestion en Kotlin avec base de données',
            'Développement du frontend en JavaScript et Vue.js',
            'Support et maintenance des équipements réseau',
            'Travail quotidien dans une équipe internationale (Japon, France, Allemagne…)',
          ],
        },
        {
          role: 'Apprenti informaticien d’entreprise',
          org: 'SITel – État de Fribourg',
          place: 'Fribourg, Suisse',
          period: '2022 – 2026',
          bullets: [
            'Support niveaux 1 & 2 pour environ 10’000 utilisateurs, tickets dans Jira Service Management',
            'Gestion et surveillance des équipements Cisco via Cisco Catalyst Center et Checkmk',
            'Plages IP, zones DNS et DHCP dans EfficientIP SOLIDserver',
            'Active Directory : comptes, groupes, GPO et politiques de sécurité',
            'VM Windows Server et Linux sous VMware ESXi & vSphere',
            'Automatisation PowerShell pour l’administration et l’inventaire',
          ],
        },
      ],
    },
    projects: {
      title: 'Projets',
      more: 'Détails',
      less: 'Masquer',
      items: [
        {
          title: 'Net Inventory',
          kind: 'Travail de fin d’apprentissage (TPI)',
          summary: 'Une application web qui récupère l’inventaire réseau depuis Cisco Catalyst Center et EfficientIP IPAM, le corrèle et signale les anomalies.',
          details: [
            'Collecte des équipements et des données IP via les API Catalyst Center et IPAM',
            'Corrélation des deux sources et détection automatique des incohérences',
            'Dashboard avec tableaux filtrables (Jinja2, DataTables)',
            'Tourne dans Docker derrière Nginx, données dans MariaDB',
          ],
          tags: ['Python', 'Flask', 'Cisco Catalyst Center', 'IPAM', 'MariaDB', 'Docker'],
        },
        {
          title: 'Management System',
          kind: 'Stage · Meiji Academy',
          summary: 'Un système de gestion interne avec un backend Kotlin, une base de données relationnelle et un frontend Vue.js.',
          details: ['Services backend et modèle de données en Kotlin', 'Conception de la base de données et des requêtes', 'Frontend interactif en JavaScript / Vue.js'],
          tags: ['Kotlin', 'SQL', 'Vue.js', 'JavaScript'],
        },
        {
          title: 'Labo ESXi / vSphere',
          kind: 'Labo infrastructure',
          summary: 'Un environnement de virtualisation complet sur des serveurs physiques installés dans un local technique.',
          details: ['Installation des serveurs physiques en baie', 'Plan d’adressage IP et configuration réseau', 'Hôtes ESXi gérés via vCenter / vSphere'],
          tags: ['VMware ESXi', 'vSphere', 'Réseau', 'Hardware'],
        },
        {
          title: 'Labo réseau & Wi-Fi',
          kind: 'Labo infrastructure',
          summary: 'Déploiement de points d’accès Cisco via un contrôleur Wi-Fi centralisé, avec segmentation en VLAN.',
          details: ['Mise en place du contrôleur Catalyst 9800', 'Configuration des VLAN et tests de connectivité', 'Documentation réseau complète'],
          tags: ['Cisco', 'Catalyst 9800', 'Wi-Fi', 'VLANs'],
        },
        {
          title: 'Cobalo',
          kind: 'Co-fondateur',
          summary: 'Une entreprise informatique suisse pour les PME : mise en place IT, infogérance, support et sites web.',
          details: ['Co-fondée avec mon frère à Fribourg', 'Mise en place et support IT pour PME', 'Sites web et automatisation'],
          tags: ['Entrepreneuriat', 'Infogérance', 'Web'],
          link: { label: 'cobalo.ch', href: 'https://cobalo.ch' },
        },
      ],
    },
    education: {
      title: 'Formation & certifications',
      items: [
        { title: 'CFC Informaticien – Informaticien d’entreprise', org: 'EPAI Fribourg · 2022 – 2026', note: 'Prix de la meilleure moyenne générale de la profession', badge: 'Prix' },
        { title: 'Maturité professionnelle technique', org: 'EPAI Fribourg · 2022 – 2026' },
        { title: 'TOEIC Listening & Reading – 885 / 990', org: 'ETS · 2026 · CECR B2' },
        { title: 'Cisco CCNA (200-301)', org: 'Cisco', badge: 'En cours' },
      ],
    },
    contact: {
      title: 'Contact',
      intro: 'Envie de collaborer ? Envoyez-moi un message, je réponds rapidement. Je suis au Japon pour le moment, je préfère donc les visioconférences aux appels.',
      name: 'Nom',
      email: 'E-mail',
      subject: 'Objet',
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi…',
      success: 'Merci ! Votre message a bien été envoyé.',
      error: 'Une erreur est survenue. Réessayez plus tard.',
      tooFast: 'C’était rapide — prenez un instant et réessayez.',
      cooldown: 'Message déjà envoyé. Attendez une minute avant d’en envoyer un autre.',
      captcha: 'Merci de compléter le captcha.',
      notConfigured: 'Le formulaire de contact n’est pas encore configuré.',
      privacy: 'Vos données servent uniquement à répondre à votre message.',
      invalid: { name: 'Indiquez votre nom.', email: 'Indiquez un e-mail valide.', message: 'Écrivez au moins 20 caractères.' },
    },
    footer: 'Fait avec React par Almir Dzaferi.',
  },

  de: {
    nav: { about: 'Über mich', skills: 'Kenntnisse', experience: 'Erfahrung', projects: 'Projekte', contact: 'Kontakt' },
    hero: {
      hello: 'Hallo, ich bin Almir',
      roles: ['Infrastructure Engineer', 'Netzwerk & Systeme', 'Automatisierungs-Fan'],
      pitch:
        'Ich halte Netzwerke und Server am Laufen — und automatisiere alles, was ich zweimal mache. Schweizer Informatiker mit praktischer Erfahrung in Cisco-Netzwerken, Virtualisierung und Windows/Linux-Administration.',
      location: 'Schweiz · zurzeit in Sapporo, Japan',
      ctaProjects: 'Projekte ansehen',
      ctaContact: 'Kontakt aufnehmen',
      available: 'Verfügbar ab März 2027',
    },
    stats: [
      { value: '10’000', label: 'betreute Benutzer' },
      { value: '4 J.', label: 'Lehre als Betriebsinformatiker' },
      { value: '#1', label: 'bester Gesamtdurchschnitt des Berufs (FR, 2026)' },
      { value: '3', label: 'Arbeitssprachen' },
    ],
    about: {
      title: 'Über mich',
      paragraphs: [
        'Ich habe meine Lehre als Betriebsinformatiker EFZ beim SITel gemacht, dem Informatikdienst des Kantons Freiburg, mit rund 10’000 Benutzern. Dort habe ich Benutzer unterstützt, Cisco-Netzwerkgeräte, DNS/DHCP und IPAM verwaltet und virtuelle Maschinen unter VMware betrieben.',
        'Seit September 2026 arbeite ich in einem internationalen Team in Sapporo, Japan: Ich entwickle ein Management-System und betreue das Netzwerk. Ich will verstehen, wie Dinge von Anfang bis Ende funktionieren, dokumentiere sauber und mache aus wiederkehrenden Aufgaben Skripte.',
        'Nächster Schritt: Cisco CCNA und Weiterentwicklung als Infrastructure Engineer.',
      ],
    },
    skills: { title: 'Kenntnisse', all: 'Alle', groups: groups(2) },
    experience: {
      title: 'Erfahrung',
      items: [
        {
          role: 'IT-Praktikant – Entwicklung & Netzwerk',
          org: 'Meiji Academy',
          place: 'Sapporo, Japan',
          period: 'Sept. 2026 – heute',
          current: true,
          bullets: [
            'Entwicklung eines Management-Systems in Kotlin mit Datenbank',
            'Frontend-Entwicklung mit JavaScript und Vue.js',
            'Support und Betreuung der Netzwerkgeräte',
            'Tägliche Arbeit in einem internationalen Team (Japan, Frankreich, Deutschland…)',
          ],
        },
        {
          role: 'Lernender Betriebsinformatiker',
          org: 'SITel – Kanton Freiburg',
          place: 'Freiburg, Schweiz',
          period: '2022 – 2026',
          bullets: [
            'Support Stufe 1 & 2 für rund 10’000 Benutzer, Tickets in Jira Service Management',
            'Verwaltung und Überwachung von Cisco-Geräten mit Cisco Catalyst Center und Checkmk',
            'IP-Bereiche, DNS- und DHCP-Zonen in EfficientIP SOLIDserver',
            'Active Directory: Konten, Gruppen, GPOs und Sicherheitsrichtlinien',
            'Windows-Server- und Linux-VMs unter VMware ESXi & vSphere',
            'PowerShell-Automatisierung für Administration und Inventar',
          ],
        },
      ],
    },
    projects: {
      title: 'Projekte',
      more: 'Details',
      less: 'Ausblenden',
      items: [
        {
          title: 'Net Inventory',
          kind: 'Abschlussprojekt (IPA)',
          summary: 'Eine Web-App, die das Netzwerkinventar aus Cisco Catalyst Center und EfficientIP IPAM holt, abgleicht und Anomalien meldet.',
          details: [
            'Erfasst Geräte und IP-Daten über die APIs von Catalyst Center und IPAM',
            'Gleicht beide Quellen ab und erkennt Inkonsistenzen automatisch',
            'Dashboard mit durchsuchbaren Tabellen (Jinja2, DataTables)',
            'Läuft in Docker hinter Nginx, Daten in MariaDB',
          ],
          tags: ['Python', 'Flask', 'Cisco Catalyst Center', 'IPAM', 'MariaDB', 'Docker'],
        },
        {
          title: 'Management System',
          kind: 'Praktikum · Meiji Academy',
          summary: 'Ein internes Management-System mit Kotlin-Backend, relationaler Datenbank und Vue.js-Frontend.',
          details: ['Backend-Services und Datenmodell in Kotlin', 'Datenbankdesign und Abfragen', 'Interaktives Frontend in JavaScript / Vue.js'],
          tags: ['Kotlin', 'SQL', 'Vue.js', 'JavaScript'],
        },
        {
          title: 'ESXi-/vSphere-Labor',
          kind: 'Infrastruktur-Labor',
          summary: 'Eine vollständige Virtualisierungsumgebung auf physischen Servern in einem Technikraum.',
          details: ['Einbau der physischen Server ins Rack', 'IP-Adressplan und Netzwerkkonfiguration', 'ESXi-Hosts verwaltet über vCenter / vSphere'],
          tags: ['VMware ESXi', 'vSphere', 'Netzwerk', 'Hardware'],
        },
        {
          title: 'Netzwerk- & WLAN-Labor',
          kind: 'Infrastruktur-Labor',
          summary: 'Cisco-Access-Points über einen zentralen WLAN-Controller ausgerollt, mit VLAN-Segmentierung.',
          details: ['Einrichtung des Catalyst-9800-Controllers', 'VLAN-Konfiguration und Konnektivitätstests', 'Vollständige Netzwerkdokumentation'],
          tags: ['Cisco', 'Catalyst 9800', 'WLAN', 'VLANs'],
        },
        {
          title: 'Cobalo',
          kind: 'Mitgründer',
          summary: 'Ein Schweizer IT-Unternehmen für KMU: IT-Einrichtung, Managed IT, Support und Websites.',
          details: ['Mit meinem Bruder in Freiburg gegründet', 'IT-Einrichtung und Support für KMU', 'Websites und Automatisierung'],
          tags: ['Unternehmertum', 'Managed IT', 'Web'],
          link: { label: 'cobalo.ch', href: 'https://cobalo.ch' },
        },
      ],
    },
    education: {
      title: 'Ausbildung & Zertifikate',
      items: [
        { title: 'Informatiker EFZ – Betriebsinformatik', org: 'EPAI Freiburg · 2022 – 2026', note: 'Preis für den besten Gesamtdurchschnitt des Berufs', badge: 'Preis' },
        { title: 'Technische Berufsmaturität', org: 'EPAI Freiburg · 2022 – 2026' },
        { title: 'TOEIC Listening & Reading – 885 / 990', org: 'ETS · 2026 · GER B2' },
        { title: 'Cisco CCNA (200-301)', org: 'Cisco', badge: 'In Vorbereitung' },
      ],
    },
    contact: {
      title: 'Kontakt',
      intro: 'Lust auf Zusammenarbeit? Schreib mir eine Nachricht, ich antworte schnell. Ich bin zurzeit in Japan und bevorzuge deshalb Videokonferenzen statt Anrufe.',
      name: 'Name',
      email: 'E-Mail',
      subject: 'Betreff',
      message: 'Nachricht',
      send: 'Senden',
      sending: 'Wird gesendet…',
      success: 'Danke! Deine Nachricht wurde gesendet.',
      error: 'Etwas ist schiefgelaufen. Bitte später erneut versuchen.',
      tooFast: 'Das ging schnell — bitte kurz warten und erneut versuchen.',
      cooldown: 'Nachricht bereits gesendet. Bitte eine Minute warten.',
      captcha: 'Bitte das Captcha lösen.',
      notConfigured: 'Das Kontaktformular ist noch nicht eingerichtet.',
      privacy: 'Deine Daten werden nur zur Beantwortung deiner Nachricht verwendet.',
      invalid: { name: 'Bitte Namen angeben.', email: 'Bitte gültige E-Mail angeben.', message: 'Bitte mindestens 20 Zeichen schreiben.' },
    },
    footer: 'Mit React gebaut von Almir Dzaferi.',
  },
}

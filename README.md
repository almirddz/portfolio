# Portfolio – Almir Dzaferi

Personal portfolio built with **React + TypeScript + Vite** and **Framer Motion**.
Available in English, French and German, with dark and light themes.

Live: https://almirddz.github.io/portfolio/

## Features
- Animated network-topology background (canvas, respects reduced motion)
- Trilingual content (EN / FR / DE), auto-detected from the browser
- Filterable skills, experience timeline, expandable project cards
- Contact form protected against bots — no email address or phone number published

## Contact form security
Messages are delivered through [Web3Forms](https://web3forms.com) to my inbox. Layers:
1. **hCaptcha**, verified server-side by Web3Forms
2. **Two honeypot fields** that only bots fill in (silently dropped)
3. **Time trap**: submissions faster than 3 s are rejected
4. **Cooldown**: one message per minute per browser
5. **Validation and length limits** on every field

## Edit the content
- Texts in all languages: `src/content.ts`
- Links (GitHub, LinkedIn) and photo toggle: `src/config.ts`

## Run locally
```bash
npm install
echo "VITE_WEB3FORMS_KEY=your-access-key" > .env
npm run dev
```

## Deploy
The site is served by GitHub Pages from the `gh-pages` branch (built files).

Optional automatic deploy: copy `docs/github-pages-workflow.yml` to `.github/workflows/deploy.yml`,
then set **Settings → Pages → Source: GitHub Actions** and add the repository secret `WEB3FORMS_KEY`.

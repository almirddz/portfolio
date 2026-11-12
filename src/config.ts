// Personal links and settings — edit here.
// Leave a link empty ("") to hide it on the site.
export const config = {
  name: 'Almir Dzaferi',
  github: 'https://github.com/almirddz',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-profile'
  showPhoto: true,

  // Contact form (Web3Forms). This access key is public by design (it only lets people send
  // messages to my inbox). It can be overridden at build time:
  //   local:  create a .env file with VITE_WEB3FORMS_KEY=your-key
  //   GitHub: Settings → Secrets and variables → Actions → New repository secret WEB3FORMS_KEY
  web3formsKey: (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || '831b364d-0fb4-45bc-ab4c-0fb0f801e721',
  // Public hCaptcha site key provided by Web3Forms for free plans.
  hcaptchaSiteKey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
}

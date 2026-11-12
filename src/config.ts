// Personal links and settings — edit here.
// Leave a link empty ("") to hide it on the site.
export const config = {
  name: 'Almir Dzaferi',
  github: 'https://github.com/almirddz',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-profile'
  showPhoto: true,

  // Contact form (Web3Forms). The key is set at build time:
  //   local:  create a .env file with VITE_WEB3FORMS_KEY=your-key
  //   GitHub: Settings → Secrets and variables → Actions → New repository secret WEB3FORMS_KEY
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY as string | undefined,
  // Public hCaptcha site key provided by Web3Forms for free plans.
  hcaptchaSiteKey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
}

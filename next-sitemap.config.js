/** @type {import('next-sitemap').IConfig} */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`) ?? // Set this to your site URL in production env.
  (process.env.NEXT_PUBLIC_VERCEL_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ?? // Automatically set by Vercel.
  "http://localhost:3000"; // Asegurate de tener esta variable en tu .env

module.exports = {
  siteUrl: `${SITE_URL}`, // reemplaza por tu dominio
  generateRobotsTxt: true, // genera automáticamente robots.txt
  sitemapSize: 5000, // opcional, si tenés muchas páginas
  changefreq: 'daily',
  priority: 0.7,
};

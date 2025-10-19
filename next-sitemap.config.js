/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lukeshephard.com',
  generateRobotsTxt: true,
  outDir: "./out",
  exclude: ['/404'],
}
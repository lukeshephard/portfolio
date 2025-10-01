/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lukeshephard.com',
  generateRobotsTxt: true,
  output: "export",
  exclude: ['/404'],
}
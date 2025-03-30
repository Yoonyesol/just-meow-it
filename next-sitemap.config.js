/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://just-meow-it.timeqlife.com/' || 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

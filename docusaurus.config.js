// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const siteOrigin = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://yaffa.cc';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'YAFFA',
  tagline: 'Yet Another Free Financial Application',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://yaffa.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/documentation/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/kantorge/yaffa-docs/edit/main/',
          routeBasePath: '/',
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        googleTagManager: {
          containerId: 'GTM-WWCL54V',
        },
        sitemap: {
          lastmod: 'date',
          priority: 0.5,
        },
      }),
    ],
  ],

  plugins: [
    'plugin-image-zoom',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Default social card image, reused from the main site's logo so every
      // documentation page has an og:image even without a per-page override.
      image: 'https://yaffa.cc/images/logo/oinkrange-removebg.png',
      // Docusaurus has no built-in og:type; inject it site-wide here.
      metadata: [{property: 'og:type', content: 'website'}],
      imageZoom: {
        selector: '.markdown img.zoomable',
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        options: {
          margin: 24,
          background: 'rgba(122, 125, 233, 0.5)',
          scrollOffset: 0,
        },
      },
      navbar: {
        title: 'YAFFA',
        logo: {
          alt: 'YAFFA Logo - Oinkrange',
          src: 'img/oinkrange-removebg-150x150.png',
          href: `${siteOrigin}/documentation/`,
          target: '_self',
        },
        items: [
          {
            href: `${siteOrigin}/`,
            label: 'Home',
            position: 'left',
            target: '_self',
            className: 'navbar-back-link',
          },
          {
            href: `${siteOrigin}/features-of-yaffa-personal-finance-application/`,
            label: 'Features',
            position: 'left',
            target: '_self',
          },
          {
            type: 'docSidebar',
            sidebarId: 'documentationSidebar',
            label: 'Documentation',
            position: 'left',
          },
          {
            href: 'https://github.com/kantorge/yaffa',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                to: '/introduction',
              },
            ],
          },
          {
            title: 'YAFFA',
            items: [
              {
                label: 'Homepage',
                href: `${siteOrigin}/`,
              },
              {
                label: 'Features',
                href: `${siteOrigin}/features-of-yaffa-personal-finance-application/`,
              },
              {
                label: 'Sandbox',
                href: 'https://sandbox.yaffa.cc/',
              },
            ],
          },
          {
            title: 'Get Support',
            items: [
              {
                label: 'Contact Us',
                href: `${siteOrigin}/contact/`,
              },
              {
                label: 'GitHub',
                href: 'https://github.com/kantorge/yaffa',
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

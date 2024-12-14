// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'YAFFA',
  tagline: 'Yet Another Free Financial Application',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.yaffa.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/documentation/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          routeBasePath: '/resources',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        googleTagManager: {
          containerId: 'GTM-WWCL54V',
        },
      }),
    ],
  ],

  plugins: [
    'plugin-image-zoom'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO: add your project's social card
      // image: 'img/docusaurus-social-card.jpg',
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
          src: 'img/logo.png',
        },
        items: [
          {
            href: 'https://www.yaffa.cc/',
            label: 'YAFFA Homepage',
            position: 'left',
            target: '_self',
          },
          {
            type: 'docSidebar',
            sidebarId: 'documentationSidebar',
            position: 'left',
            label: 'Documentation',
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
                to: '/resources/introduction',
              },
            ],
          },
          {
            title: 'YAFFA',
            items: [
              {
                label: 'Homepage',
                href: 'https://www.yaffa.cc/',
              },
              {
                label: 'Features',
                href: 'https://www.yaffa.cc/features-of-yaffa-personal-finance-application/',
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
                to: 'https://www.yaffa.cc/contact/',
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

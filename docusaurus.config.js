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
      colorMode: {
        respectPrefersColorScheme: true,
      },
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
            // `html` (instead of `label`) skips Docusaurus's automatic
            // "external link" icon/aria-label, which it would otherwise add
            // to any absolute URL — even this same-origin, same-tab one.
            href: `${siteOrigin}/`,
            html: 'Home',
            position: 'left',
            target: '_self',
            className: 'navbar-back-link',
          },
          {
            href: `${siteOrigin}/features-of-yaffa-personal-finance-application/`,
            html: 'Features',
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
            href: `${siteOrigin}/faq/`,
            html: 'FAQ',
            position: 'left',
            target: '_self',
          },
          {
            href: 'https://sandbox.yaffa.cc/',
            label: 'Try the demo',
            position: 'right',
            className: 'navbar-cta-link',
          },
          {
            href: 'https://github.com/kantorge/yaffa',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'YAFFA Logo - Oinkrange',
          src: 'img/oinkrange-removebg-150x150.png',
          href: `${siteOrigin}/`,
          target: '_self',
          width: 48,
          height: 48,
        },
        // Mirrors the main site's footer structure (Resources / Get in touch)
        // so the two properties feel like one product.
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Features',
                href: `${siteOrigin}/features-of-yaffa-personal-finance-application/`,
                // Same-origin link to the main site, meant to feel internal:
                // opens in the same tab (overriding Docusaurus's new-tab
                // default for absolute URLs) and skips the "external link"
                // icon/aria-label; see src/theme/Footer/LinkItem.
                target: '_self',
                internal: true,
              },
              {
                label: 'Documentation',
                to: '/introduction',
              },
              {
                label: 'Try YAFFA',
                href: `${siteOrigin}/try-yaffa-budget-app/`,
                target: '_self',
                internal: true,
              },
              {
                label: 'Demo and Sandbox',
                href: 'https://sandbox.yaffa.cc/',
              },
            ],
          },
          {
            title: 'Get in touch',
            items: [
              {
                label: 'info@yaffa.cc',
                href: 'mailto:info@yaffa.cc',
              },
              {
                label: 'Contact',
                href: `${siteOrigin}/contact/`,
                target: '_self',
                internal: true,
              },
              {
                label: 'GitHub',
                href: 'https://github.com/kantorge/yaffa',
              },
            ],
          },
        ],
        copyright: `YAFFA - Yet Another Free Financial Application &middot; <a href="${siteOrigin}/privacy-policy/">Privacy policy</a> &middot; <a href="${siteOrigin}/terms-and-conditions/">Terms of service</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

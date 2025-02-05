import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Docs Iryna',
  tagline: 'Documentation for Iryna',
  favicon: 'img/favicon.ico',


  // Set the production url of your site here
  url: 'https://docs.iryna.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',


  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/light-theme.css',
            './src/css/dark-theme.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.png',
    navbar: {
      logo: {
        alt: 'Iryna Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo_dark.png', // Added logo for dark mode
        href: 'https://iryna.ai',
      },
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} Iryna. Documentation built with Docusaurus.`,

    },
  },

};

export default config;

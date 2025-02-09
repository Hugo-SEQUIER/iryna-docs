import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'html',
      value: '<span class="sidebar-title">Key Concepts</span>',
      className: 'sidebar-title-item',
    },
    'vision',
    'workflow',
    'irys',
    'swarm',
    'agents',
    'roadmap',
    'tokenomics',
    {
      type: 'html',
      value: '<span class="sidebar-title">Technical Documentation</span>',
      className: 'sidebar-title-item',
    },
    'quickstart',
    'aiWrapper',
    'character',
    'actions',
    'plugins',
  ],
};



export default sidebars;

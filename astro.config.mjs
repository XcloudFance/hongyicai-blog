// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import preact from '@astrojs/preact';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://hongyicai.cc',
    integrations: [mdx(
        {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }
    ), sitemap(), icon(), preact()],

});
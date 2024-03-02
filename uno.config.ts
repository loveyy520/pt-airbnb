// uno.config.ts
import presetRemToPx from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      }
    }),
    presetUno(),
    presetWebFonts(),
    presetRemToPx()
    // ...
  ],
  transformers: [
    transformerAttributifyJsx(), // no effect ??
  ],
  preflights: [
    {
      getCSS: ({ theme }) => `
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
      `,
    },
  ]
})
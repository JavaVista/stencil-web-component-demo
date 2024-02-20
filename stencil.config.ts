import { Config } from '@stencil/core';
import { env } from '@alepop/stencil-env';

export const config: Config = {
  // namespace needed when creating a component library
  namespace: 'stencil-web-component',
  globalStyle: 'src/styles/style.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      // output to the project to be used in a static host
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'assets', dest: 'assets' },
        { src: 'services', dest: 'services' },
      ],
    },
  ],
  plugins: [
    env()
  ],
  testing: {
    browserHeadless: "new",
  },
  extras: {
    enableImportInjection: true,
  }
};

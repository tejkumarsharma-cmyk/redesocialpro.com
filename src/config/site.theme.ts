import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'gallery-mosaic',
    eyebrow: 'Gallery publishing',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'image',
    featuredTaskKeys: ['image', 'profile', 'article'],
  },
  navigation: {
    variant: 'minimal',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})

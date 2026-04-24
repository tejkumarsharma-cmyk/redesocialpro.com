import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'visual',
  themePack: 'curation-library',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'gallery-top',
  footerTemplate: 'editorial-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'image',
  enabledTasks: ['image', 'profile', 'article', 'listing', 'classified', 'sbm'],
  taskTemplates: {
    image: 'image-masonry',
    profile: 'profile-business',
    article: 'article-journal',
    listing: 'listing-showcase',
    classified: 'classified-bulletin',
    sbm: 'sbm-library',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}

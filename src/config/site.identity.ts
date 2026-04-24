export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '99hwj78t92',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Redesocial Pro',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Premium image sharing and public profiles',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Redesocial Pro is a minimal gallery for image-led posts and creator profiles—built for people who browse with intention.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'redesocialpro.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://redesocialpro.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const


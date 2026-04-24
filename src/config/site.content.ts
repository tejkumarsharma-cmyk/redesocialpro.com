import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Image sharing for people who care about craft',
    searchCue: 'Search boards, creators, and visual posts',
    emphasizedTaskKeys: ['image', 'profile'] as TaskKey[],
    moreLabel: 'More',
  },
  footer: {
    tagline: 'Save inspiration, publish images, and grow your public profile',
  },
  hero: {
    badge: 'Image sharing · Public profiles',
    title: ['Your gallery and your public profile—', 'together in one premium surface.'],
    description:
      'Redesocial Pro is built for people who scroll images first: full-width frames, calm typography, and creator profiles that explain who made the work—without turning the site into a noisy feed.',
    primaryCta: {
      label: 'Open the gallery',
      href: '/images',
    },
    secondaryCta: {
      label: 'Browse profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search image posts, profiles, and tags across the site',
    /** Hero stat row — factual positioning for the product (not live metrics). */
    stats: [
      { kicker: 'Primary', line: 'Image posts & series' },
      { kicker: 'Secondary', line: 'Public creator profiles' },
      { kicker: 'Built for', line: 'Viewers who save references' },
    ],
    focusLabel: 'Focus',
    featureCardBadge: 'Fresh from the gallery',
    featureCardTitle: 'New uploads set the tone of the homepage feed.',
    featureCardDescription:
      'The latest visuals stay center stage while profiles add context—without changing how the platform works under the hood.',
  },
  home: {
    metadata: {
      title: 'Redesocial Pro — image sharing and public profiles',
      description:
        'Discover curated imagery, creator profiles, and visual stories on a premium, minimal gallery platform.',
      openGraphTitle: 'Redesocial Pro — image sharing and public profiles',
      openGraphDescription:
        'Browse image posts and public profiles with a gallery-first layout designed for viewers and creators.',
      keywords: [
        'image sharing',
        'photo gallery',
        'creator profiles',
        'visual discovery',
        'Redesocial Pro',
        'portfolio',
      ],
    },
    introBadge: 'How it works',
    introTitle: 'A quieter feed for people who live in images.',
    introParagraphs: [
      'Redesocial Pro brings image posts and public profiles together so discovery feels continuous: scroll the gallery, land on a creator, and keep exploring related work.',
      'The interface stays minimal on purpose—large imagery, soft surfaces, and typography that stays out of the way.',
      'Every other task type remains available when you need it, but the experience stays tuned to viewers and visual publishing.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Gallery-first homepage with masonry pacing and generous whitespace.',
      'Profiles as the secondary lane for identity, credits, and follow-through.',
      'Supporting sections stay reachable without crowding the main story.',
      'Lightweight motion and CSS-first polish for fast load on mobile and desktop.',
    ],
    primaryLink: {
      label: 'Open images',
      href: '/images',
    },
    secondaryLink: {
      label: 'Meet creators',
      href: '/profile',
    },
    galleryFeature: {
      kicker: 'Made for viewers',
      title: 'Bring your favorite visuals into focus',
      subtitle:
        'With Redesocial Pro, you can tune discovery around mood, palette, and subject—then save what resonates to your profile trail.',
      mockSearch: 'coastal minimal',
      mockFilters: ['Palette', 'Subject', 'Format'],
      popoverTitle: 'Tune by palette',
      popoverHint: 'Preview swatches to steer results toward warm, cool, or neutral imagery.',
      swatchLabels: ['Warm', 'Balanced', 'Deep', 'Muted', 'Rich'],
      tileClasses: [
        'from-[#c9a882] to-[#8d6b52]',
        'from-[#9eb3a8] to-[#5C766D]',
        'from-[#d8cfc5] to-[#9a8b82]',
      ],
      featureEyebrow: 'Discovery',
      featureTitle: 'Tune discovery without losing the gallery feel',
      featureBody:
        'Filters stay lightweight and visual-first—so you spend less time configuring lists and more time browsing imagery that matches your taste.',
      ctaLabel: 'Try the gallery',
      ctaHref: '/images',
    },
    /** Homepage-only SaaS-style sections (visual product home). */
    saasLanding: {
      heroSearchCta: 'Search',
      features: {
        kicker: 'Why Redesocial Pro',
        title: 'A calm gallery surface for serious visual publishing.',
        subtitle:
          'Redesocial Pro is built around image posts and public profiles: generous media, readable type, and navigation that gets out of the way. Articles, listings, classifieds, and saved boards stay on their usual routes whenever you need them.',
        cards: [
          {
            icon: 'image' as const,
            title: 'Immersive image presentation',
            body: 'Spotlight framing, a horizontal ribbon of live posts, and cards that respect aspect ratio—so portfolios, mood boards, and campaign stills feel intentional instead of squeezed into a generic feed.',
          },
          {
            icon: 'user' as const,
            title: 'Profiles that complete the story',
            body: 'Every public profile carries bio, links, and context so viewers can move from a frame they love to the creator behind it in one clear step.',
          },
          {
            icon: 'search' as const,
            title: 'One search, whole site',
            body: 'The hero search strip opens the same search experience you use elsewhere—posts, profiles, and tags—without a second mental model.',
          },
          {
            icon: 'sparkles' as const,
            title: 'Light motion, fast loads',
            body: 'Short CSS transitions, soft shadows, and restrained hover states keep the interface alive while staying quick on phones and laptops.',
          },
        ],
      },
      steps: {
        kicker: 'How it works',
        title: 'Publish imagery, refine your profile, stay easy to find',
        items: [
          {
            title: 'Create image posts',
            body: 'Use the image gallery task to publish stills or series. Titles, summaries, and media render on listing and detail pages exactly as the platform already does today.',
          },
          {
            title: 'Polish your public profile',
            body: 'The profile task is your identity lane: credits, outbound links, and highlights so collaborators know who they are reaching after seeing your work.',
          },
          {
            title: 'Help viewers search and follow through',
            body: 'Visitors start from the hero or navbar search, open a post, then land on your profile when they want more—same URLs and flows across the site.',
          },
          {
            title: 'Keep other tools within reach',
            body: 'Articles, listings, classifieds, and saved boards stay in the “More” menu and via direct links; they are not removed—just not the headline on this homepage.',
          },
        ],
      },
      testimonials: {
        kicker: 'From people who ship visuals',
        title: 'Built for the way portfolios are reviewed today',
        items: [
          {
            quote:
              'We wanted a client-facing gallery that felt like its own product. Redesocial Pro gives us that presentation while we keep the same publishing workflow our team already knows.',
            name: 'Elena Voss',
            role: 'Studio producer · Berlin',
            highlight: false,
          },
          {
            quote:
              'Big imagery up front and a quiet profile page matches how our buyers actually browse: scroll frames first, read credits second.',
            name: 'Marcus Reid',
            role: 'Gallery coordinator · London',
            highlight: true,
          },
          {
            quote:
              'Search in the hero matches search everywhere else on the site, so we are not teaching two different patterns to new visitors.',
            name: 'Priya Nandakumar',
            role: 'Brand lead · Singapore',
            highlight: false,
          },
        ],
      },
      galleryRibbon: {
        kicker: 'From your live feed',
        title: 'Latest uploads on Redesocial Pro',
        subtitle:
          'This strip pulls the same image-task posts as your /images gallery—real content from your workspace, ordered by what is newest when the homepage loads.',
      },
      closing: {
        title: 'Open the gallery—or meet creators on profile first',
        subtitle:
          'Accounts, tasks, and URLs are unchanged. This homepage is simply tuned for people who discover through imagery and follow through on public profiles.',
      },
    },
  },
  cta: {
    badge: 'Start publishing',
    title: 'Share imagery and shape a public profile people remember.',
    description:
      'Create an account to publish image posts, curate your profile surface, and keep every other task type one click away when you need it.',
    primaryCta: {
      label: 'Create account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Editorial notes and long reads',
    description: 'Essays, guides, and stories that pair well with the gallery when you want more context.',
  },
  listing: {
    title: 'Discoverable listings',
    description: 'Structured pages for brands, studios, and services that show up alongside visual work.',
  },
  classified: {
    title: 'Timely posts and offers',
    description: 'Short-form notices and deals when you need something faster than a gallery scroll.',
  },
  image: {
    title: 'Image gallery',
    description: 'Image-led posts, visual series, and media-first browsing tuned for discovery.',
  },
  profile: {
    title: 'Public profiles',
    description: 'Creator and brand profiles that anchor the imagery you discover on Redesocial Pro.',
  },
  sbm: {
    title: 'Saved links and references',
    description: 'Curated bookmarks and resource lists for deeper creative and professional trails.',
  },
  pdf: {
    title: 'Documents and downloads',
    description: 'PDFs, decks, and files shared across the platform when you need something to take away.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings that sit beside the gallery',
    paragraphs: [
      'Listings give structured detail—hours, services, locations—when a visual post needs a business home.',
      'They stay available without taking over the image-first rhythm of the site.',
      'Browse listings when you are ready to act, then return to imagery when you want inspiration again.',
    ],
    links: [
      { label: 'Browse images', href: '/images' },
      { label: 'Open classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Long-form writing with gallery pacing',
    paragraphs: [
      'Articles add narrative depth when a single image is not enough—process notes, essays, and guides live here.',
      'The layout uses editorial spacing so reading feels intentional, not squeezed into a feed.',
      'Jump between writing and visuals whenever a story references new work.',
    ],
    links: [
      { label: 'Open images', href: '/images' },
      { label: 'See profiles', href: '/profile' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Short posts for timely opportunities',
    paragraphs: [
      'Classifieds handle gigs, rentals, gear, and quick offers that need fast scanning.',
      'They are visually quieter than the gallery so urgency reads clearly.',
      'Pair classified browsing with profiles when you want to know who is behind a post.',
    ],
    links: [
      { label: 'Image gallery', href: '/images' },
      { label: 'Business listings', href: '/listings' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'The image gallery—center of Redesocial Pro',
    paragraphs: [
      'This is the primary surface for image-led posts: large media, soft corners, and a masonry rhythm tuned for viewers.',
      'Use it to publish portfolios, mood boards, campaign stills, or any story where the picture leads.',
      'Profiles and articles stay one click away when someone wants more context.',
    ],
    links: [
      { label: 'Meet creators', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Saved resources', href: '/sbm' },
    ],
  },
  profile: {
    title: 'Profiles that complete the picture',
    paragraphs: [
      'Profiles are the secondary emphasis: public identity pages for photographers, studios, and collaborators.',
      'They anchor trust—bios, links, and highlights—without turning the whole site into a directory clone.',
      'Browse profiles to understand who published the work you saved from the gallery.',
    ],
    links: [
      { label: 'Browse images', href: '/images' },
      { label: 'Open listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  sbm: {
    title: 'Curated shelves for references',
    paragraphs: [
      'Bookmarks collect tutorials, gear lists, mood links, and anything you want to revisit later.',
      'The layout stays text-forward so resources remain easy to scan.',
      'Use shelves alongside imagery when a post needs supporting links.',
    ],
    links: [
      { label: 'Gallery', href: '/images' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'Downloadable files and decks',
    paragraphs: [
      'PDFs host longer documents—rate cards, treatments, reports—without forcing them into the image grid.',
      'Downloads stay organized by category so you can find the right file quickly.',
      'Pair documents with gallery posts when a project needs both visuals and paperwork.',
    ],
    links: [
      { label: 'Images', href: '/images' },
      { label: 'Articles', href: '/articles' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Community signals',
    paragraphs: [
      'Short updates keep momentum between larger publishes.',
      'They are intentionally lightweight so the gallery remains the hero.',
      'Use them as breadcrumbs back into imagery and profiles.',
    ],
    links: [
      { label: 'Gallery', href: '/images' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  comment: {
    title: 'Responses alongside writing',
    paragraphs: [
      'Comments keep discussion attached to articles where it belongs.',
      'They add perspective without competing with the gallery layout.',
      'Use them to ask questions, share references, or point readers to related visuals.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Images', href: '/images' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Teams and organizations',
    paragraphs: [
      'Organization pages group people, projects, and shared publishing under one structured identity.',
      'They complement profiles when a whole studio needs a single surface.',
      'Connect org pages to listings and imagery for a fuller story.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Gallery', href: '/images' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass, FileText, Globe2, Image as ImageIcon, LayoutGrid, MapPin, Search, ShieldCheck, Sparkles, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Partial<Record<TaskKey, any>> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostTaskValue(post?: SitePost | null) {
  return (post as { task?: unknown } | null | undefined)?.task
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskValue = getPostTaskValue(post)
              const taskKey = resolveTaskKey(taskValue, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || (typeof taskValue === 'string' ? taskValue : '') || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const gallery = imagePosts.length ? imagePosts.slice(0, 8) : articlePosts.slice(0, 8)
  const heroVisual = gallery[0]
  const landing = siteContent.home.saasLanding
  const featureIcons = {
    image: ImageIcon,
    user: User,
    search: Search,
    sparkles: Sparkles,
  } as const
  const profileHref = SITE_CONFIG.tasks.find((task) => task.key === 'profile')?.route || '/profile'

  return (
    <main className="bg-[#f3efeb] text-[#201714]">
      <section className="bg-[#060709] pb-20">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d7d6d5]">
                <ImageIcon className="h-3.5 w-3.5" />
                {siteContent.hero.badge}
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.45rem]">
                {siteContent.hero.title[0]}
                <br />
                {siteContent.hero.title[1]}
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#d1d5db]">{siteContent.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={primaryTask?.route || siteContent.hero.primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#b88555,#C9996B)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(201,153,107,0.35)] transition hover:scale-[1.02] hover:brightness-110"
                >
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={siteContent.hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {siteContent.hero.secondaryCta.label}
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {siteContent.hero.stats.map((stat) => (
                  <div key={stat.kicker} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9ca3af]">{stat.kicker}</p>
                    <p className="mt-2 text-sm font-medium text-white">{stat.line}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
              <div className="relative h-[360px] overflow-hidden rounded-[1.2rem] sm:h-[455px]">
                <ContentImage src={getPostImage(heroVisual)} alt={heroVisual?.title || 'Featured visual'} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.55))]" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/50 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6d3d1]">{siteContent.hero.featureCardBadge}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{siteContent.hero.featureCardTitle}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#d1d5db]">{siteContent.hero.featureCardDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-full border border-[#d9cec5] bg-[#f8f4f0] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-full px-4 py-2.5 text-sm text-[#5C4F4A]">
                <Search className="h-4 w-4 text-[#5C766D]" />
                {siteContent.hero.searchPlaceholder}
              </div>
              <Link
                href={`/search?q=${encodeURIComponent(siteContent.home.saasLanding.galleryRibbon.title)}`}
                className="inline-flex items-center justify-center rounded-full bg-[#5C766D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f6660]"
              >
                {landing.heroSearchCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-[-2.2rem] max-w-7xl px-4 pb-14 pt-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.2rem] border border-[#e7ddd4] bg-[#f7f4f1] shadow-[0_18px_44px_rgba(92,79,74,0.09)]">
          <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C766D]">{landing.features.kicker}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2c1e19] sm:text-[2.2rem]">{landing.features.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5C4F4A]">{landing.features.subtitle}</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {landing.features.cards.map((card) => {
                const Icon = featureIcons[card.icon]
                return (
                  <article key={card.title} className="rounded-2xl border border-[#e7ddd4] bg-white p-5 shadow-[0_10px_22px_rgba(92,79,74,0.08)]">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3eee8] text-[#5b2f1f]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#2c1e19]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5C4F4A]">{card.body}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="border-y border-[#eadfd6] bg-[#faf8f6] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C766D]">{landing.steps.kicker}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2c1e19] sm:text-[2.2rem]">{landing.steps.title}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {landing.steps.items.map((item, index) => (
                <article key={item.title} className="rounded-[1.2rem] border border-[#e7ddd4] bg-[#fffdfa] p-5 shadow-[0_8px_20px_rgba(92,79,74,0.07)]">
                  <p className="text-xl font-semibold tracking-[-0.03em] text-[#C9996B]">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[#2c1e19]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5C4F4A]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-[linear-gradient(180deg,#130f0e_0%,#1c1714_100%)] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-5xl">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C9996B]">{landing.testimonials.kicker}</p>
              <h2 className="mt-3 text-center text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.2rem]">{landing.testimonials.title}</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {landing.testimonials.items.map((item) => (
                  <article
                    key={`${item.name}-${item.role}`}
                    className={`rounded-2xl border p-5 ${
                      item.highlight
                        ? 'border-[#dcb387] bg-[#f7ecdf] text-[#2c1e19]'
                        : 'border-white/10 bg-white/5 text-white'
                    }`}
                  >
                    <p className={`text-sm leading-7 ${item.highlight ? 'text-[#5C4F4A]' : 'text-slate-300'}`}>“{item.quote}”</p>
                    <div className="mt-6">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className={`text-xs uppercase tracking-[0.2em] ${item.highlight ? 'text-[#5C4F4A]' : 'text-slate-400'}`}>{item.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-3xl rounded-[1.6rem] border border-[#e7ddd4] bg-white px-6 py-10 text-center shadow-[0_14px_32px_rgba(92,79,74,0.08)]">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#2c1e19] sm:text-[2rem]">{landing.closing.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5C4F4A] sm:text-base">{landing.closing.subtitle}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href={(SITE_CONFIG.tasks.find((task) => task.key === 'image')?.route) || '/images'}
                  className="inline-flex items-center rounded-full bg-[#5C766D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#50675f]"
                >
                  Open images
                </Link>
                <Link
                  href={profileHref}
                  className="inline-flex items-center rounded-full border border-[#d6c6b8] bg-[#f8f4ef] px-5 py-2.5 text-sm font-semibold text-[#2c1e19] hover:bg-[#efe7de]"
                >
                  Meet creators
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[1.8rem] border border-[#e6d9ce] bg-[#f0ebe6] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C766D]">{landing.galleryRibbon.kicker}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#2c1e19]">{landing.galleryRibbon.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5C4F4A]">{landing.galleryRibbon.subtitle}</p>
            </div>
            <Link
              href={(SITE_CONFIG.tasks.find((task) => task.key === 'image')?.route) || '/images'}
              className="inline-flex items-center rounded-full border border-[#d8c8bb] bg-white px-5 py-2.5 text-sm font-semibold text-[#2c1e19] transition hover:bg-[#efe7de]"
            >
              Open image feed
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(getPostTaskValue(post), 'image'), post.slug)}
                className="overflow-hidden rounded-[1.1rem] border border-[#e7ddd4] bg-white shadow-[0_10px_28px_rgba(92,79,74,0.08)]"
              >
                <div className="relative h-40">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-medium text-[#2c1e19]">{post.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(getPostTaskValue(post), 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}

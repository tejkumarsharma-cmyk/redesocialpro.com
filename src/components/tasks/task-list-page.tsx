import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry':
    'bg-[radial-gradient(circle_at_20%_0%,rgba(201,153,107,0.12),transparent_32%),linear-gradient(180deg,#faf8f6_0%,#ede9e6_100%)] text-[#5C4F4A]',
  'image-portfolio':
    'bg-[radial-gradient(circle_at_80%_0%,rgba(92,118,109,0.12),transparent_30%),linear-gradient(180deg,#f6f3ef_0%,#e8e2dc_100%)] text-[#5C4F4A]',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#fbf6f0_0%,#f3ebe4_45%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#eef4f1_0%,#faf8f6_55%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['profile-creator'].includes(layoutKey)
  const galleryShell = layoutKey === 'image-masonry' || layoutKey === 'image-portfolio'
  const warmPaper =
    galleryShell || layoutKey.startsWith('article') || layoutKey.startsWith('sbm') || layoutKey.startsWith('profile')
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : warmPaper
      ? {
          muted: 'text-[#5C4F4A]/75',
          panel: 'border border-[rgba(92,79,74,0.1)] bg-[rgba(255,252,249,0.94)]',
          soft: 'border border-[rgba(92,79,74,0.1)] bg-white/80',
          input: 'border border-[rgba(92,79,74,0.12)] bg-white text-[#5C4F4A]',
          button: galleryShell
            ? 'bg-[#C9996B] text-[#2a211c] hover:bg-[#b8895e]'
            : 'bg-[#5C766D] text-white hover:bg-[#4d635c]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-slate-200 bg-white',
          soft: 'border border-slate-200 bg-slate-50',
          input: 'border border-slate-200 bg-white text-slate-950',
          button: 'bg-slate-950 text-white hover:bg-slate-800',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(92,79,74,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-relaxed ${ui.muted}`}>Structured listings when you need services, studios, or brands—not the same layout as the image gallery, but still on the same calm canvas.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                {taskConfig?.description || 'Latest posts'}
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${ui.muted}`}>
                Long-form writing on a warm paper column—wider measure, calmer type, and filters tucked to the side so the page never feels like the masonry gallery.
              </p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-relaxed ${ui.muted}`}>Use categories to jump between topics while keeping the article rhythm intact.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 rounded-[2rem] border border-[#e5e7eb] bg-[#f7f7f7] p-4 shadow-[0_18px_56px_rgba(15,61,46,0.08)] sm:p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div className="relative min-h-[320px] overflow-hidden rounded-[1.2rem] bg-[#dfe7e3] sm:min-h-[400px] lg:min-h-[470px]">
                {posts[0] ? (
                  <ContentImage
                    src={(Array.isArray(posts[0].media) && posts[0].media[0]?.url) || '/placeholder.svg?height=1200&width=900'}
                    alt={posts[0].title}
                    fill
                    className="object-cover"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f3d2e]/28 to-transparent" />
              </div>

              <div className="rounded-[1.2rem] border border-[#d7ddd9] bg-white p-6 shadow-[0_10px_34px_rgba(15,61,46,0.09)] sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eef4f1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f3d2e]">
                  <Icon className="h-3.5 w-3.5" /> Image sharing
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#1a1a1a] sm:text-4xl">{taskConfig?.label || 'Images'}</h1>
                <p className="mt-4 text-sm leading-7 text-[#1a1a1a]/75 sm:text-base">
                  {taskConfig?.description || 'Browse the newest image posts with a clean, gallery-first layout designed for visual discovery.'}
                </p>
                <form className="mt-6 flex flex-col gap-3 sm:flex-row" action={taskConfig?.route || '#'}>
                  <select name="category" defaultValue={normalizedCategory} className="h-11 flex-1 rounded-xl border border-[#d7ddd9] bg-white px-3 text-sm text-[#1a1a1a]">
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <button type="submit" className="h-11 rounded-xl bg-[#0f3d2e] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#134b38]">
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(92,79,74,0.08)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-foreground">Public profiles for people behind the imagery.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${ui.muted}`}>
                  Identity, credits, and contact paths stay readable here—separate from the masonry gallery so both surfaces keep their own rhythm.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">Pinboard for short, time-sensitive posts.</h1>
              <p className={`mt-4 text-sm leading-relaxed ${ui.muted}`}>A tighter grid rhythm than the gallery—built for scanning offers, gigs, and quick asks.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Scan-first layout', 'Clear timestamps', 'Jump back to imagery anytime'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                Shelves for links, references, and saved creative trails.
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${ui.muted}`}>
                Text-first rows with sage accents—built for scanning titles and URLs, not hero photography.
              </p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}

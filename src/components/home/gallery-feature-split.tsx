import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { siteContent } from '@/config/site.content'

export function GalleryFeatureSplit() {
  const copy = siteContent.home.galleryFeature

  return (
    <section className="border-y border-[rgba(92,79,74,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(237,233,230,0.92)_100%)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5C766D]">{copy.kicker}</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-[#5C4F4A] sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#5C4F4A]/80 sm:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative rounded-[2rem] bg-[#e4ddd6] p-6 shadow-[0_28px_80px_rgba(92,79,74,0.12)] sm:p-8 lg:p-10">
            <div className="absolute -right-3 -top-3 hidden h-24 w-24 rounded-full bg-[#C9996B]/25 blur-2xl sm:block" aria-hidden />
            <div className="mx-auto max-w-[280px] rounded-[1.75rem] border border-[rgba(92,79,74,0.12)] bg-[#faf8f6] p-4 shadow-[0_20px_50px_rgba(92,79,74,0.14)] sm:max-w-[320px]">
              <div className="flex items-center gap-2 rounded-full bg-[#EDE9E6] px-3 py-2 text-xs font-medium text-[#5C4F4A]/75">
                <span className="inline-block h-2 w-2 rounded-full bg-[#5C766D]" aria-hidden />
                {copy.mockSearch}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {copy.mockFilters.map((label) => (
                  <span key={label} className="rounded-full border border-[rgba(92,79,74,0.12)] bg-white px-3 py-1 text-[11px] font-semibold text-[#5C4F4A]">
                    {label}
                  </span>
                ))}
              </div>
              <div className="relative mt-4 rounded-2xl border border-[rgba(92,79,74,0.1)] bg-white p-3 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-[#5C4F4A]">{copy.popoverTitle}</p>
                  <Sparkles className="h-4 w-4 shrink-0 text-[#C9996B]" aria-hidden />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#5C4F4A]/70">{copy.popoverHint}</p>
                <div className="mt-3 flex gap-2">
                  {copy.swatchLabels.map((label, i) => (
                    <span
                      key={label}
                      title={label}
                      className="h-9 w-9 rounded-full border border-[rgba(92,79,74,0.12)] shadow-inner"
                      style={{
                        background: ['#d4a574', '#c4916b', '#a67c52', '#8f6848', '#6d4f3a'][i % 5],
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {copy.tileClasses.map((cls, index) => (
                  <div key={index} className={`aspect-[4/5] rounded-xl bg-gradient-to-b shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ${cls}`} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#5C766D]">{copy.featureEyebrow}</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-[#5C4F4A] sm:text-[2rem]">{copy.featureTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#5C4F4A] opacity-90 sm:text-base">{copy.featureBody}</p>
            <Link
              href={copy.ctaHref}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#C9996B] px-8 py-3.5 text-sm font-semibold text-[#2a211c] shadow-[0_14px_40px_rgba(201,153,107,0.35)] transition hover:bg-[#b8895e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C766D]"
            >
              {copy.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

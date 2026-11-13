import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Search,
  X,
} from 'lucide-react'
import { PageHeader, EmptyState } from '../components/ui/LayoutPrimitives'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { InfoNote } from '../components/ui/Form'
import { TOPIC_ICONS } from '../components/research/TopicIcons'
import { RESEARCH_ARTICLES, RESEARCH_TOPICS, type ResearchArticle } from '../data/research'
import { cn } from '../lib/utils'

const topicDescriptions: Record<string, string> = {
  Cotton: 'Fibre, farming and the water that grows a T-shirt.',
  Denim: 'The fabric, finishing and lifespan of a favourite pair.',
  'Fast fashion': 'Speed, volume and the hidden resource cost.',
  Dyeing: 'Colour, wet processing and wastewater questions.',
  'Garment care': 'Washing, drying and keeping clothes in use.',
  'Reuse & repair': 'Swaps, resale, repair and responsible donation.',
}

export function ResearchPage() {
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState<string>('All topics')

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return RESEARCH_ARTICLES.filter((article) => {
      const matchesSearch =
        !needle ||
        [article.title, article.summary, article.topic, article.intro]
          .join(' ')
          .toLowerCase()
          .includes(needle)
      const matchesTopic = topic === 'All topics' || article.topic === topic
      return matchesSearch && matchesTopic
    })
  }, [search, topic])

  const featured = RESEARCH_ARTICLES.find((article) => article.featured) ?? RESEARCH_ARTICLES[0]
  const showFeatured = !search.trim() && topic === 'All topics'

  return (
    <>
      <PageHeader
        eyebrow="Research & Learn"
        title="The water behind what we wear."
        description="Clear, considered explainers about fibre, denim, dyeing, care and circular fashion — with an honest view of what is still being verified."
        aside={
          <div className="max-w-[16rem] rounded-2xl border border-border bg-white/70 p-4">
            <Badge tone="sand">
              <BookOpen className="size-3" aria-hidden="true" />
              Sample editorial library
            </Badge>
            <p className="mt-2.5 text-xs leading-relaxed text-muted">
              Articles are clearly labelled sample content. No research sources have been invented.
            </p>
          </div>
        }
      />

      <div className="container-page py-10 sm:py-14 lg:py-16">
        {showFeatured && featured ? <FeaturedArticle article={featured} /> : null}

        <section className="mt-10 sm:mt-14" aria-labelledby="library-heading">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-forest">The library</p>
              <h2
                id="library-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-charcoal"
              >
                Start with a question
              </h2>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="research-search" className="sr-only">
                Search research articles
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="research-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search topics, questions or keywords…"
                className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-10 text-sm text-charcoal outline-none transition placeholder:text-muted/70 focus:border-forest focus:ring-4 focus:ring-forest/10"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-ivory hover:text-charcoal"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by topic">
            <TopicChip
              label="All topics"
              active={topic === 'All topics'}
              onClick={() => setTopic('All topics')}
            />
            {RESEARCH_TOPICS.map((item) => {
              const Icon = TOPIC_ICONS[item]
              return (
                <TopicChip
                  key={item}
                  label={item}
                  active={topic === item}
                  onClick={() => setTopic(item)}
                  icon={<Icon className="size-3.5" aria-hidden="true" />}
                />
              )
            })}
          </div>

          {filtered.length ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-7">
              <EmptyState
                icon={<Search className="size-7" aria-hidden="true" />}
                title="No articles match that search."
                description="Try a broader keyword or choose a different topic. The full sample library is still available."
                action={
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSearch('')
                      setTopic('All topics')
                    }}
                  >
                    Reset research filters
                  </Button>
                }
              />
            </div>
          )}
        </section>

        <section className="mt-12 grid gap-6 rounded-3xl bg-sage/55 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-forest">Source integrity</p>
            <h2 className="mt-2 text-balance font-display text-2xl font-semibold tracking-[-0.035em] text-charcoal sm:text-3xl">
              No borrowed authority. No invented citations.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              WearWell is in a stage-one preview. The library explains concepts without pretending
              to have a verified evidence base that does not exist yet.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: 'Clearly labelled',
                text: 'Every article is marked as sample content.',
              },
              {
                icon: CheckCircle2,
                title: 'Sources to come',
                text: 'Verified references will be published with the research release.',
              },
              {
                icon: ArrowUpRight,
                title: 'Transparent method',
                text: 'We explain the limits of every estimate we show.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-forest/10 bg-white/55 p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-white/80 text-forest">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-charcoal">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        <div className="mt-8">
          <InfoNote tone="water">
            <strong className="font-semibold">A note on scope.</strong> These articles are editorial
            previews, not a literature review. WearWell has not yet verified external sources or
            claimed specific findings from them.
          </InfoNote>
        </div>
      </div>
    </>
  )
}

function TopicChip({
  label,
  active,
  onClick,
  icon,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
        active
          ? 'border-forest bg-forest text-white'
          : 'border-border bg-white text-muted hover:border-forest/35 hover:text-charcoal',
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function ArticleCard({ article }: { article: ResearchArticle }) {
  const Icon = TOPIC_ICONS[article.topic]
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link to={`/learn/${article.slug}`} className="relative block overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
        <Badge tone="outline" className="absolute left-3.5 top-3.5 border-white/60 bg-ivory/90 text-charcoal backdrop-blur">
          <Icon className="size-3" aria-hidden="true" />
          {article.topic}
        </Badge>
        <span className="absolute bottom-3.5 right-3.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
          Sample article
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-muted">
          {article.readTime} · Preview
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-[-0.025em] text-charcoal">
          <Link
            to={`/learn/${article.slug}`}
            className="transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{article.summary}</p>
        <Link
          to={`/learn/${article.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-forest transition hover:text-forest-deep"
        >
          Read the explainer
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function FeaturedArticle({ article }: { article: ResearchArticle }) {
  const Icon = TOPIC_ICONS[article.topic]
  return (
    <section aria-labelledby="featured-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-muted">Featured explainer</p>
        <Link
          to="/learn"
          className="hidden items-center gap-1.5 text-xs font-semibold text-forest transition hover:text-forest-deep sm:inline-flex"
        >
          All research
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <article className="group grid overflow-hidden rounded-[2rem] border border-border bg-white shadow-card lg:grid-cols-[1.05fr_0.95fr]">
        <Link to={`/learn/${article.slug}`} className="relative block min-h-[18rem] overflow-hidden lg:min-h-[26rem]">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="size-full object-cover transition duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <Badge tone="outline" className="border-white/60 bg-ivory/90 text-charcoal backdrop-blur">
              <Icon className="size-3" aria-hidden="true" />
              {article.topic}
            </Badge>
          </div>
          <p className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white/75">
            {article.readTime} · Sample content
          </p>
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <Badge tone="sand" className="self-start">
            Research preview
          </Badge>
          <h2
            id="featured-heading"
            className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-charcoal sm:text-4xl"
          >
            <Link
              to={`/learn/${article.slug}`}
              className="transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px]">{article.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={`/learn/${article.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Read the explainer
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              Source review pending
            </p>
          </div>
        </div>
      </article>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {RESEARCH_TOPICS.map((item) => {
          const Icon = TOPIC_ICONS[item]
          return (
            <span
              key={item}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-white/60 px-3 py-1.5 text-[11px] text-muted"
            >
              <Icon className="size-3" aria-hidden="true" />
              {topicDescriptions[item]}
            </span>
          )
        })}
      </div>
    </section>
  )
}

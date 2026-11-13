import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Info,
  ShieldQuestion,
} from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { InfoNote } from '../components/ui/Form'
import { TOPIC_ICONS } from '../components/research/TopicIcons'
import {
  RESEARCH_ARTICLES,
  getArticleBySlug,
  type ResearchArticle,
} from '../data/research'
import { NotFoundPage } from './NotFoundPage'

export function ArticlePage() {
  const { slug } = useParams()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) return <NotFoundPage />

  const Icon = TOPIC_ICONS[article.topic] ?? BookOpen
  const related = RESEARCH_ARTICLES.filter(
    (candidate) => candidate.slug !== article.slug && candidate.topic !== article.topic,
  ).slice(0, 2)

  return (
    <>
      <div className="container-page pt-7 sm:pt-9">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 rounded-full py-2 text-xs font-semibold text-muted transition hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to Research &amp; Learn
        </Link>
      </div>

      <article>
        <header className="container-page pb-8 pt-4 sm:pb-10 sm:pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="sage">
              <Icon className="size-3" aria-hidden="true" />
              {article.topic}
            </Badge>
            <Badge tone="sand">
              <BookOpen className="size-3" aria-hidden="true" />
              Sample article · sources pending
            </Badge>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-charcoal sm:text-5xl lg:text-[3.7rem]">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {article.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {article.readTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              Preview edition
            </span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span>Stage-one editorial content</span>
          </div>
        </header>

        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-sage">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="aspect-[16/8] w-full object-cover sm:aspect-[16/6.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full bg-ivory/90 px-3 py-1.5 text-[10px] font-medium text-charcoal backdrop-blur sm:bottom-5 sm:left-5">
              Photography via Unsplash · sample imagery
            </p>
          </div>
        </div>

        <div className="container-page py-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
            <div>
              <InfoNote tone="sand" icon="alert" className="mb-8">
                <strong className="font-semibold">Sample content, clearly labelled.</strong> This
                article explains concepts for the WearWell preview. It does not cite external
                research yet, and should not be treated as a verified source.
              </InfoNote>

              <div className="article-copy">
                <p className="text-lg leading-[1.8] text-charcoal sm:text-xl">{article.intro}</p>

                <div className="mt-10 space-y-10">
                  {article.sections.map((section, index) => {
                    const id = `section-${index + 1}`
                    return (
                      <section key={section.heading} id={id} className="scroll-mt-28">
                        <div className="mb-4 flex items-start gap-3">
                          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-sage font-display text-[10px] font-semibold text-forest">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-charcoal sm:text-3xl">
                            {section.heading}
                          </h2>
                        </div>
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.list ? (
                          <ul>
                            {section.list.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {section.callout ? (
                          <div className="mt-5 rounded-2xl border border-forest/10 bg-water/60 px-4 py-4">
                            <p className="flex items-start gap-2 text-sm leading-relaxed text-water-deep">
                              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                              {section.callout}
                            </p>
                          </div>
                        ) : null}
                      </section>
                    )
                  })}
                </div>

                <section className="mt-12 rounded-3xl bg-sage/65 p-6 sm:p-7" aria-labelledby="takeaways-heading">
                  <div className="flex items-center gap-2 text-forest">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    <h2
                      id="takeaways-heading"
                      className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                    >
                      Key takeaways
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {article.takeaways.map((takeaway) => (
                      <li key={takeaway} className="flex items-start gap-3 text-sm leading-relaxed text-[#4F5F52]">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-10 border-t border-border pt-8" aria-labelledby="source-heading">
                  <div className="flex items-center gap-2">
                    <ShieldQuestion className="size-4 text-forest" aria-hidden="true" />
                    <h2
                      id="source-heading"
                      className="font-display text-xl font-semibold tracking-[-0.025em] text-charcoal"
                    >
                      Sources &amp; methodology
                    </h2>
                  </div>
                  <div className="mt-4 rounded-2xl border border-border bg-ivory p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Source status</p>
                    <ul className="mt-3 space-y-2">
                      {article.sources.map((source) => (
                        <li key={source} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#B49B72]" aria-hidden="true" />
                          {source}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Methodology
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{article.methodology}</p>
                  </div>
                </section>
              </div>

              <div className="mt-10 flex flex-col gap-3 rounded-3xl border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.025em] text-charcoal">
                    Put the idea into practice
                  </p>
                  <p className="mt-1 max-w-md text-sm text-muted">
                    See what is already in your wardrobe, or explore small changes you can make today.
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <ButtonLink to="/wardrobe" size="sm">
                    My wardrobe
                  </ButtonLink>
                  <ButtonLink to="/tips" variant="secondary" size="sm">
                    Tips
                  </ButtonLink>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-[100px] lg:self-start">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">In this article</p>
                <nav aria-label="Article contents" className="mt-3">
                  <ol className="space-y-2">
                    {article.sections.map((section, index) => (
                      <li key={section.heading}>
                        <a
                          href={`#section-${index + 1}`}
                          className="group flex items-start gap-2.5 rounded-lg py-1 text-sm leading-snug text-muted transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                        >
                          <span className="mt-0.5 font-display text-[10px] text-forest/40">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="rounded-xl bg-water/65 p-3.5">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-water-deep">
                      <Info className="size-3" aria-hidden="true" />
                      Research status
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#5F6F72]">
                      Sample content. Verified source notes will replace this preview in a later
                      stage.
                    </p>
                  </div>
                </div>
              </div>

              {related.length ? (
                <div className="mt-5">
                  <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Keep reading
                  </p>
                  <div className="mt-3 space-y-3">
                    {related.map((item) => (
                      <RelatedArticle key={item.slug} article={item} />
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </article>

      <div className="border-t border-border bg-sage/35">
        <div className="container-page py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">Continue exploring</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-charcoal">
                Turn a better understanding into a lighter wardrobe.
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonLink to="/calculator">
                Calculate a footprint
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/learn" variant="secondary">
                All research
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function RelatedArticle({ article }: { article: ResearchArticle }) {
  const Icon = TOPIC_ICONS[article.topic] ?? BookOpen
  return (
    <Link
      to={`/learn/${article.slug}`}
      className="group flex gap-3 rounded-2xl border border-border bg-white p-3 transition hover:border-forest/25 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
    >
      <img
        src={article.image}
        alt=""
        loading="lazy"
        className="size-16 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0">
        <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-forest">
          <Icon className="size-2.5" aria-hidden="true" />
          {article.topic}
        </p>
        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-charcoal transition group-hover:text-forest">
          {article.title}
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted">
          {article.readTime}
          <ArrowUpRight className="size-2.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

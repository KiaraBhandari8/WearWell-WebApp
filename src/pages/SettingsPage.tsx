import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Database,
  Download,
  EyeOff,
  Image,
  Info,
  Leaf,
  LockKeyhole,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { PageHeader } from '../components/ui/LayoutPrimitives'
import { Badge } from '../components/ui/Badge'
import { Button, ButtonLink } from '../components/ui/Button'
import { ConfirmDialog, InfoNote } from '../components/ui/Form'
import { Toggle } from '../components/ui/Controls'
import { useWardrobe } from '../context/WardrobeContext'
import { useToast } from '../context/ToastContext'
import { SAMPLE_GARMENTS } from '../data/garments'

export function SettingsPage() {
  const {
    garments,
    totalItems,
    estimatedTotal,
    settings,
    clearWardrobe,
    resetWardrobe,
    updateSetting,
  } = useWardrobe()
  const { toast } = useToast()
  const [confirmClear, setConfirmClear] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const samplePresent = useMemo(
    () =>
      garments.length === SAMPLE_GARMENTS.length &&
      garments.every((garment) => SAMPLE_GARMENTS.some((sample) => sample.id === garment.id)),
    [garments],
  )

  const handleClear = () => {
    clearWardrobe()
    toast({
      title: 'Wardrobe cleared',
      description: 'All garment entries have been removed from this browser session.',
      tone: 'info',
    })
  }

  const handleRestore = () => {
    resetWardrobe()
    toast({
      title: 'Sample wardrobe restored',
      description: `${SAMPLE_GARMENTS.length} preview garments are back in your wardrobe.`,
      tone: 'info',
    })
  }

  const handleExport = () => {
    const payload = {
      app: 'WearWell',
      stage: 'stage-one preview',
      exportedAt: new Date().toISOString(),
      note: 'Session-only preview data. Footprint values are illustrative.',
      wardrobe: garments,
      preferences: settings,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'wearwell-preview-wardrobe.json'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
    toast({
      title: 'Preview data exported',
      description: 'A JSON copy of this session’s wardrobe has been downloaded.',
      tone: 'success',
    })
  }

  return (
    <>
      <PageHeader
        eyebrow="Privacy & Settings"
        title="Your wardrobe, your call."
        description="Understand what this preview keeps, manage your sample wardrobe and adjust how footprint information appears across WearWell."
        aside={
          <div className="rounded-2xl border border-border bg-white/70 p-4">
            <Badge tone="sage">
              <ShieldCheck className="size-3" aria-hidden="true" />
              Privacy-first preview
            </Badge>
            <p className="mt-2.5 max-w-[16rem] text-xs leading-relaxed text-muted">
              No account, no backend and no uploads. Changes live in this browser session only.
            </p>
          </div>
        }
      />

      <div className="container-page py-10 sm:py-14 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start xl:gap-10">
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage text-forest">
                  <Database className="size-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-charcoal">
                    Wardrobe information
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    What exists in WearWell right now and where it lives.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
                <p>
                  WearWell stores your wardrobe entries — names, categories, materials, quantities,
                  statuses, purchase details, notes and any selected image — only in the current
                  browser session. There is no account, remote database or server sync in this stage.
                </p>
                <InfoNote tone="water" icon="info">
                  <strong className="font-semibold">Session-only preview.</strong> Refreshing or
                  closing the page resets the wardrobe to the sample data. Export a JSON copy if you
                  want to keep a record of what you entered.
                </InfoNote>
              </div>

              <div className="mt-5 grid gap-2 border-t border-border pt-5 sm:grid-cols-2">
                <Button variant="secondary" onClick={handleExport} disabled={!garments.length}>
                  <Download className="size-4" aria-hidden="true" />
                  Export preview data
                </Button>
                <Button variant="danger" onClick={() => setConfirmClear(true)} disabled={!garments.length}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Clear wardrobe data
                </Button>
              </div>

              <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-ivory px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <RotateCcw className="size-3.5 text-forest" aria-hidden="true" />
                  {samplePresent ? 'Sample wardrobe is currently loaded.' : 'Restore the original preview wardrobe.'}
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="self-start text-xs font-semibold text-forest transition hover:text-forest-deep sm:self-auto"
                >
                  Restore sample
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-water text-water-deep">
                  <Sparkles className="size-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-charcoal">
                    Preferences
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    These settings apply during this session. They are not saved to an account.
                  </p>
                </div>
              </div>

              <div className="mt-4 divide-y divide-border/70">
                <Toggle
                  id="show-estimates"
                  checked={settings.showEstimates}
                  onChange={(checked) => updateSetting('showEstimates', checked)}
                  label="Show footprint estimates in My Wardrobe"
                  description="Display illustrative water values on garment cards, summaries and detail views."
                />
                <Toggle
                  id="reduce-motion"
                  checked={settings.reduceMotion}
                  onChange={(checked) => updateSetting('reduceMotion', checked)}
                  label="Reduce motion"
                  description="Limit hover movement, entrance animations and smooth transitions across the app."
                />
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-ivory px-3.5 py-3 text-xs leading-relaxed text-muted">
                <EyeOff className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                If you hide estimates, the wardrobe values are masked but the underlying preview
                numbers remain in memory until the session ends.
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sand text-[#78664D]">
                  <Image className="size-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-charcoal">
                    Image management
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    How garment photos work in this preview.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: 'Local only',
                    text: 'Selected images are read into your browser and are never uploaded here.',
                  },
                  {
                    title: 'Under 4 MB',
                    text: 'Use a JPG, PNG or WebP image. The form helps you catch oversized files.',
                  },
                  {
                    title: 'Replace anytime',
                    text: 'Add, replace or remove a photo while adding or editing a garment.',
                  },
                ].map((item, index) => (
                  <div key={item.title} className="rounded-2xl bg-ivory p-4">
                    <span className="font-display text-[10px] font-semibold text-forest/45">
                      0{index + 1}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-charcoal">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
                  </div>
                ))}
              </div>

              <ButtonLink to="/wardrobe" variant="secondary" size="sm" className="mt-5">
                Manage wardrobe images
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </ButtonLink>
            </section>

            <section id="contact" className="scroll-mt-28 rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage text-forest">
                  <Mail className="size-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-charcoal">
                    Contact
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    A real contact route is not available in this preview. No email address or
                    support inbox has been invented.
                  </p>
                </div>
              </div>
              <p className="mt-4 rounded-2xl bg-sand/60 px-4 py-3 text-xs leading-relaxed text-[#6D675D]">
                Contact details and a source request route will be added before launch. Until then,
                the Research &amp; Learn library explains what is still being verified.
              </p>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-[100px]">
            <div className="rounded-3xl bg-[#3F5B46] p-6 text-ivory shadow-soft">
              <div className="flex items-center gap-2 text-[#C6DCCB]">
                <LockKeyhole className="size-4" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Privacy at a glance</p>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em]">
                Small footprint. Clear boundaries.
              </h2>
              <ul className="mt-5 space-y-3.5">
                {[
                  'No account or sign-in required.',
                  'No wardrobe entries sent to a server.',
                  'No analytics or advertising scripts in this build.',
                  'No encrypted-storage claim, because there is no remote storage.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ivory/75">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#C6DCCB]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-ivory/15 bg-ivory/[0.07] p-4">
                <p className="text-xs leading-relaxed text-ivory/60">
                  Stage two will introduce persistent storage with a documented data model. This page
                  will be updated before that happens.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Current session</p>
                <Badge tone="outline">Preview</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-ivory p-3">
                  <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-charcoal">
                    {totalItems}
                  </p>
                  <p className="text-[10px] text-muted">garments</p>
                </div>
                <div className="rounded-xl bg-water/65 p-3">
                  <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-water-deep">
                    {settings.showEstimates ? `≈${Math.round(estimatedTotal / 1000)}k` : '—'}
                  </p>
                  <p className="text-[10px] text-[#5F6F72]">litres estimated</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                Estimates are illustrative stage-one references, not audited measurements.
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-sage/45 p-5">
              <div className="flex items-center gap-2 text-forest">
                <Leaf className="size-4" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em]">Remember</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6B5D]">
                The most useful wardrobe data is honest data. Add what you own, not what you wish
                you wore.
              </p>
              <Link
                to="/wardrobe"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition hover:text-forest-deep"
              >
                Back to my wardrobe
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        onConfirm={handleClear}
        title="Clear all wardrobe data?"
        description="Every garment entry in this preview session will be removed. You can restore the sample wardrobe afterwards."
        confirmLabel="Clear wardrobe"
        cancelLabel="Keep my clothes"
      />

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={handleRestore}
        title="Restore the sample wardrobe?"
        description="This replaces the current preview entries with the original eight sample garments."
        confirmLabel="Restore sample"
        cancelLabel="Cancel"
        tone="primary"
      />
    </>
  )
}

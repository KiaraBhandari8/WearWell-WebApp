import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../../lib/utils'

export function GarmentImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={cn('relative overflow-hidden bg-sage', className)}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn('size-full object-cover transition duration-700 ease-out', imgClassName)}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-[linear-gradient(135deg,#DCE8D9_0%,#E3EDF0_100%)]">
          <div className="flex flex-col items-center gap-2 text-forest/45">
            <ImageOff className="size-7" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">No image</span>
          </div>
        </div>
      )}
    </div>
  )
}

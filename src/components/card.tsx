import type { PropsWithChildren } from 'react'

import { cn } from '../lib/cn'

type CardProps = PropsWithChildren<{
  className?: string
  description: string
  eyebrow?: string
  title: string
}>

export function Card({
  children,
  className,
  description,
  eyebrow,
  title,
}: CardProps) {
  return (
    <article
      className={cn(
        'rounded-4xl border border-line bg-white px-5 py-5 shadow-soft',
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h2 className="font-display text-2xl leading-tight text-ink">
            {title}
          </h2>
          <p className="text-sm leading-6 text-muted">{description}</p>
        </div>
      </div>

      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  )
}

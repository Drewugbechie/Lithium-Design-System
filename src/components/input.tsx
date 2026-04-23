import type { InputHTMLAttributes } from 'react'

import { cn } from '../lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hint?: string
  label?: string
}

export function Input({ className, hint, label, ...props }: InputProps) {
  return (
    <label className="grid gap-2">
      {label ? (
        <span className="text-sm font-medium text-ink">{label}</span>
      ) : null}
      <input
        className={cn(
          'h-11 rounded-2xl border border-line bg-white px-4 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15',
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  )
}

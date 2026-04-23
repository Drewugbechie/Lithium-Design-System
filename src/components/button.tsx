import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../lib/cn'

type ButtonKind = 'filled' | 'outlined' | 'dashed' | 'text'
type ButtonStatus = 'default' | 'primary' | 'info'
type ButtonState = 'default' | 'hovered' | 'pressed'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children?: ReactNode
  kind?: ButtonKind
  status?: ButtonStatus
  state?: ButtonState
  size?: ButtonSize
  prefixIcon?: boolean
  suffixIcon?: boolean
  loading?: boolean
}

type VisualPalette = {
  borderColor: string
  disabledBorderColor: string
  disabledTextColor: string
  filled: Record<ButtonState, string>
  solidTextColor: string
  subtle: Record<ButtonState, string>
  textColor: string
}

const paletteByStatus: Record<ButtonStatus, VisualPalette> = {
  default: {
    borderColor: 'border-neutral-400',
    disabledBorderColor: 'border-neutral-300',
    disabledTextColor: 'text-neutral-400',
    filled: {
      default: 'bg-neutral-100',
      hovered: 'bg-neutral-200',
      pressed: 'bg-neutral-300',
    },
    solidTextColor: 'text-neutral-950',
    subtle: {
      default: 'bg-transparent',
      hovered: 'bg-neutral-100',
      pressed: 'bg-neutral-300',
    },
    textColor: 'text-neutral-950',
  },
  primary: {
    borderColor: 'border-primary-text',
    disabledBorderColor: 'border-neutral-300',
    disabledTextColor: 'text-neutral-400',
    filled: {
      default: 'bg-primary-500',
      hovered: 'bg-primary-600',
      pressed: 'bg-primary-700',
    },
    solidTextColor: 'text-white',
    subtle: {
      default: 'bg-transparent',
      hovered: 'bg-primary-surface-100',
      pressed: 'bg-primary-surface-200',
    },
    textColor: 'text-primary-text',
  },
  info: {
    borderColor: 'border-info-500',
    disabledBorderColor: 'border-neutral-300',
    disabledTextColor: 'text-neutral-400',
    filled: {
      default: 'bg-info-500',
      hovered: 'bg-info-600',
      pressed: 'bg-info-700',
    },
    solidTextColor: 'text-white',
    subtle: {
      default: 'bg-transparent',
      hovered: 'bg-info-surface-100',
      pressed: 'bg-info-surface-200',
    },
    textColor: 'text-info-500',
  },
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 min-w-9 gap-2 px-2 py-2 text-sm leading-5',
  md: 'min-h-9 min-w-10 gap-2.5 px-3 py-2 text-base leading-6',
  lg: 'min-h-9 min-w-11 gap-3 px-3.5 py-2 text-[18px] leading-7',
}

const iconSizes: Record<ButtonSize, string> = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
}

function PlusIcon({ size }: { size: ButtonSize }) {
  return (
    <svg
      aria-hidden="true"
      className={iconSizes[size]}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

function SpinnerIcon({ size }: { size: ButtonSize }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(iconSizes[size], 'animate-spin')}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function getVisualClasses({
  disabled,
  kind,
  loading,
  state,
  status,
}: Pick<ButtonProps, 'disabled' | 'kind' | 'loading' | 'state' | 'status'>) {
  const palette = paletteByStatus[status ?? 'default']

  if (disabled) {
    if (kind === 'filled') {
      return cn('border border-transparent bg-neutral-200', palette.disabledTextColor)
    }

    if (kind === 'text') {
      return cn('bg-transparent', palette.disabledTextColor)
    }

    return cn(
      'bg-white',
      palette.disabledBorderColor,
      palette.disabledTextColor,
      kind === 'dashed' ? 'border border-dashed' : 'border',
    )
  }

  if (loading) {
    if (kind === 'filled') {
      return cn('border border-transparent', palette.filled[state ?? 'default'], palette.solidTextColor)
    }

    if (kind === 'text') {
      return cn(palette.subtle[state ?? 'hovered'], palette.textColor)
    }

    return cn(
      palette.subtle[state ?? 'hovered'],
      palette.borderColor,
      palette.textColor,
      kind === 'dashed' ? 'border border-dashed' : 'border',
    )
  }

  if (kind === 'filled') {
    return cn('border border-transparent', palette.filled[state ?? 'default'], palette.solidTextColor)
  }

  if (kind === 'text') {
    return cn(palette.subtle[state ?? 'default'], palette.textColor)
  }

  return cn(
    state === 'default' ? 'bg-white' : palette.subtle[state ?? 'default'],
    palette.borderColor,
    palette.textColor,
    kind === 'dashed' ? 'border border-dashed' : 'border',
  )
}

export function Button({
  children = 'Button',
  className,
  disabled = false,
  kind = 'filled',
  loading = false,
  prefixIcon = true,
  size = 'sm',
  state = 'default',
  status = 'default',
  suffixIcon = true,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-kind={kind}
      data-size={size}
      data-state={state}
      data-status={status}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-[28px] font-medium tracking-[-0.01em] outline-none transition-colors',
        'disabled:cursor-not-allowed',
        sizeClasses[size],
        getVisualClasses({ disabled, kind, loading, state, status }),
        className,
      )}
      {...props}
    >
      {loading ? (
        <SpinnerIcon size={size} />
      ) : (
        <>
          {prefixIcon ? <PlusIcon size={size} /> : null}
          {children ? <span>{children}</span> : null}
          {suffixIcon ? <PlusIcon size={size} /> : null}
        </>
      )}
    </button>
  )
}

'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    setTheme(current)
  }, [])

  const toggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('lithium-theme', nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Use ${theme === 'light' ? 'dark' : 'light'} theme`}>
      <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
      {theme}
    </button>
  )
}

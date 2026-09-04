import type { Metadata } from 'next'
import Script from 'next/script'
import '@lithium/tokens/theme.css'
import '@lithium/ui/styles.css'
import './styles.css'

export const metadata: Metadata = {
  title: 'Lithium UI — Architecture foundation',
  description: 'A precise, machine-readable design system for AI-native products.',
}

const themeScript = `try{const saved=localStorage.getItem('lithium-theme');const system=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=saved||system}catch{document.documentElement.dataset.theme='light'}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body data-lithium-root>
        <Script id="lithium-theme" strategy="beforeInteractive">{themeScript}</Script>
        {children}
      </body>
    </html>
  )
}

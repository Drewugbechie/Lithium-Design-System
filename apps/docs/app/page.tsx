import registry from '@lithium/registry/data'
import Link from 'next/link'
import { ThemeToggle } from '../components/theme-toggle'

const boundaries = [
  { name: 'Tokens', owner: 'Visual values and themes', output: 'CSS · JSON · Figma data' },
  { name: 'UI', owner: 'Runtime behavior and TypeScript APIs', output: 'React package' },
  { name: 'Registry', owner: 'Meaning and machine discovery', output: 'JSON · search · future MCP' },
]

const pipeline = ['Tokens', 'Implementation', 'Registry', 'Documentation', 'Agent retrieval']

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="wordmark" href="/">Lithium<span>UI</span></Link>
        <div className="nav-links">
          <a href="#architecture">Architecture</a>
          <a href="/registry/v1/index.json">Registry</a>
          <a href="/llms.txt">LLMs</a>
          <ThemeToggle />
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">Foundation · Phase 2</p>
        <h1>The design system for both humans and AI.</h1>
        <p className="lede">Lithium is an open design-system foundation for AI products, built around explicit ownership, deterministic outputs, and accessible composition.</p>
        <div className="hero-actions">
          <a className="primary-action" href="#architecture">Explore the architecture</a>
          <a className="quiet-action" href="/registry/v1/index.json">Inspect registry JSON <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="metrics" aria-label="Foundation status">
        <div><strong>{registry.resources.length}</strong><span>Published resources</span></div>
        <div><strong>3</strong><span>Authored sources</span></div>
        <div><strong>1</strong><span>Query contract</span></div>
        <div><strong>v{registry.registryVersion}</strong><span>Registry contract</span></div>
      </section>

      <section className="section" id="architecture">
        <div className="section-heading">
          <p className="eyebrow">Source ownership</p>
          <h2>One fact, one owner.</h2>
          <p>Generated consumers share the same facts instead of maintaining parallel descriptions.</p>
        </div>
        <div className="boundary-grid">
          {boundaries.map((boundary, index) => (
            <article className="boundary-card" key={boundary.name}>
              <span className="index">0{index + 1}</span>
              <h3>{boundary.name}</h3>
              <p>{boundary.owner}</p>
              <code>{boundary.output}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section pipeline-section">
        <div className="section-heading">
          <p className="eyebrow">Resource lifecycle</p>
          <h2>A repeatable path to production.</h2>
        </div>
        <ol className="pipeline">
          {pipeline.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
        </ol>
      </section>

      <section className="section status-panel">
        <div>
          <p className="eyebrow">Current boundary</p>
          <h2>The foundation is ready. Components are intentionally next.</h2>
        </div>
        <p>This phase establishes tokens, theming, validation, deterministic retrieval, and development quality gates. The first eight components will be added only after this foundation is reviewed.</p>
      </section>

      <footer>
        <span>Lithium UI</span>
        <span>Calm infrastructure for complex AI interactions.</span>
      </footer>
    </main>
  )
}

# Lithium UI architecture

Status: Phase 2 foundation implemented

## Summary

Lithium currently has one documentation app and three packages. Each fact has one owner:

- `@lithium/tokens` owns visual values and themes.
- `@lithium/ui` owns future React behavior and public TypeScript APIs.
- `@lithium/registry` owns structured meaning, validation, discovery, and relationships.
- `@lithium/docs` presents generated outputs to people and exposes thin machine-readable routes.

Components are intentionally not implemented yet. The current code proves the build, token, registry, query, theming, documentation, and quality-gate foundations needed before the first vertical slice.

## System

```text
token JSON ──generator──► CSS variables ──► UI + docs
       └───────────────► JSON + Figma variable data

UI source ──future API extraction──┐
                                   ▼
registry manifests ──validation──► published registry
                                   │
                         ┌─────────┼──────────┐
                         ▼         ▼          ▼
                       docs    static JSON  intent search
                                              │
                                              ▼
                                          future MCP
```

Figma consumes generated variable data. React and Figma component implementations remain separate and use manually reviewed stable mappings.

## Repository

```text
apps/
  docs/                       Next.js 15 documentation app

packages/
  tokens/                     canonical tokens, themes, generator, tests
  ui/                         package boundary, shared CSS contract, tests
  registry/                   Zod schema, compiler, query library, tests

ARCHITECTURE.md
README.md
eslint.config.mjs
package.json                  npm workspaces and commands
tsconfig.json                 shared strict TypeScript configuration
vitest.config.ts
```

npm workspaces handle package linking. No task runner is needed at this size; root scripts explicitly order foundation builds.

## Sources of truth

| Fact | Authored source | Generated consumers |
| --- | --- | --- |
| Token values and modes | `packages/tokens/src/tokens.json` and `src/themes/*.json` | CSS, JSON, Figma-variable data |
| Runtime behavior and props | Future files in `packages/ui/src` | JavaScript, declarations, extracted API |
| Resource meaning and guidance | `packages/registry/src/resources/*.json` | Registry JSON, search, docs, future MCP |
| Registry shape | `packages/registry/src/schema.ts` | Build validation and TypeScript types |
| Runnable examples | Future resource-owned TypeScript modules | Docs previews, tests, registry references |

Props, imports, examples, installation text, and source paths will be extracted or derived when components are added. They must not be copied manually into registry manifests.

## Tokens and themes

The canonical DTCG-compatible token source covers color, typography, spacing, radius, border, shadow, opacity, motion, sizing, breakpoints, and z-index.

The generator:

1. loads primitives plus light and dark semantic themes;
2. validates aliases and detects cycles;
3. emits every token through the stable `--li-*` CSS contract;
4. produces deterministic `tokens.json`, `theme.css`, and `figma-variables.json` files;
5. includes no timestamps or environment-specific paths.

Library and documentation CSS consume these custom properties. Dark mode uses `data-theme="dark"`; the docs app respects saved preference and system preference. Reduced-motion defaults are provided by the UI style layer.

Component-specific tokens will be introduced only when semantic tokens cannot express a reusable decision.

## Registry and discovery

Authored manifests are strict Zod-validated records containing:

```text
identity and kind
lifecycle and access
intent, use-for, avoid-for, and keywords
composition and typed relationships
accessibility requirements
design and implementation guidance
example references
optional Figma mapping
```

The compiler sorts inputs and rejects invalid shapes, duplicate IDs, incorrect filenames, dangling relationships, deprecated resources without guidance, and stable resources without Figma mappings. It produces versioned deterministic files under `dist/registry/v1`.

One framework-neutral query library exposes:

```ts
getResource(registry, id)
listResources(registry, filters)
searchResources(registry, query, filters)
```

Search currently uses deterministic scoring across IDs, titles, intents, use cases, keywords, and normalized search text. Vector infrastructure is not justified yet.

The public interfaces have distinct jobs:

- `/registry/v1/index.json` provides cacheable exact registry retrieval.
- `/registry/v1/resources/<id>.json` provides one exact resource.
- `/api/search?q=<intent>` performs deterministic task-oriented search.
- `/llms.txt` tells agents where to begin.

There is no duplicate REST endpoint for exact resource retrieval.

## UI architecture

The UI package currently establishes only its build, export, CSS layering, focus, and reduced-motion contracts. Components begin in Phase 3.

Component rules:

- use native semantics before ARIA;
- forward refs on focusable primitives;
- extend the correct native attributes;
- use semantic variants and explicit finite states;
- favor typed compound parts over boolean feature flags;
- use token-backed values;
- define keyboard, focus, disabled, dynamic-announcement, responsive, and reduced-motion behavior;
- never expose private model reasoning as a Thinking component.

Public compound APIs must be tested from an external TypeScript consumer so documentation cannot advertise code that fails to compile.

## Documentation

The Next.js app uses Tailwind CSS for layout while all design values come from Lithium variables. It currently documents the foundation and links directly to registry and agent interfaces.

When resources exist, component pages will combine the published registry with runnable examples and include preview, installation, Copy Prompt, extracted API, variants, composition, accessibility, design guidance, related resources, Figma status, and source access.

Long-form prose may live in docs, but structured facts stay in the registry.

## Quality gates

The root commands are intentionally explicit:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
```

- ESLint scans the entire repository rather than only packages that opt in.
- Type checking builds required generated foundations first.
- Vitest covers token output, strict registry validation, deterministic output, intent discovery, and the UI package foundation.
- The Next build verifies routes and production rendering.
- Commands must work from a clean checkout and may not rely on ignored stale output.

## Free, Pro, and versioning

Registry lifecycle (`experimental`, `beta`, `stable`, `deprecated`) is separate from access (`free`, `pro`, `preview`). The current empty registry exposes only the public projection.

Registry schema versions use versioned URLs. Resource IDs are permanent, token paths are public API, and published packages will use semantic versioning. Pro authentication, payment, and protected delivery are not implemented.

## Figma boundary

Tokens own values and generate a neutral Figma-variable interchange file. Figma owns its component construction and publication. React owns runtime behavior and accessibility. Registry records stable mapping identifiers and reports missing mappings.

No Figma file, component key, plugin, Code Connect mapping, or bidirectional synchronization is claimed by the current implementation.

## Deferred

The following remain intentionally unbuilt:

- all React components and patterns;
- MCP until published resource retrieval is populated and stable;
- CLI until a tested source-install contract exists;
- Storybook and a separate playground;
- runtime patterns or template packages;
- a Lithium-owned icon package;
- API extraction and example compilation, which require real components;
- vector search, databases, authentication, billing, and Pro enforcement;
- automatic Figma component synchronization.

## Next milestone

After foundation review, implement only Button, Avatar, Textarea, PromptInput, Message, Citation, Thinking, and ToolCall plus one conversational-AI pattern. Every resource must complete tokens, implementation, states, accessibility, validation, documentation, preview, Copy Prompt, static retrieval, search, and MCP discovery before the inventory expands.

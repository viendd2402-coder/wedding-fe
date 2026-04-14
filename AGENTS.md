<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Wedding invitation templates

Each template must be **visually and structurally unique**. Do not share layout or invitation UI components across templates; duplicate code per template folder if needed. Prefer colocated Tailwind or a CSS Module scoped to that template only. See `.cursor/rules/wedding-templates-unique.mdc`. Demo-only chrome (e.g. preview lightbox in `template-workspace`) may stay shared.

Customer-facing **headings, intros, and long descriptions** should be **editable via preview fields** (per-template extras with clear fallbacks to sample i18n), not locked only in static copy—see rule **4a** in `wedding-templates-unique.mdc`.

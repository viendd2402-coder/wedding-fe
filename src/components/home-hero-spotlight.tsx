"use client";

import { useEffect, useMemo, useState } from "react";
import { TemplateListCard } from "@/components/template-list-card";
import { useMessages } from "@/i18n/use-messages";
import { fetchPublicApi } from "@/lib/api-fetch";
import type { WeddingTemplate } from "@/lib/templates";
import {
  getTemplateHref,
  TOP_TEMPLATE_SPOTLIGHT_LIMIT,
  weddingTemplates,
} from "@/lib/templates";

/**
 * `{ success, message, data: { items, total } }` hoặc mảng gốc / `{ data: [...] }`.
 */
function unwrapPopularInvitesList(payload: unknown): unknown[] | null {
  if (payload == null) return null;
  if (Array.isArray(payload)) return payload;
  if (typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;
  if (root.success === false) return null;
  if (Array.isArray(root.items)) return root.items;
  const data = root.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const inner = data as Record<string, unknown>;
    if (Array.isArray(inner.items)) return inner.items;
  }
  if (Array.isArray(data)) return data;
  return null;
}

function compactTemplateKey(s: string): string {
  return s.replace(/[\s-]+/g, "").toUpperCase();
}

function resolveTemplateForPopularItem(
  o: Record<string, unknown>,
  slugToTemplate: Map<string, WeddingTemplate>,
): WeddingTemplate | null {
  const slugRaw = o.templateSlug ?? o.template_slug;
  if (typeof slugRaw === "string" && slugRaw.trim()) {
    const t = slugToTemplate.get(slugRaw.trim());
    if (t) return t;
  }
  const name = o.templateName ?? o.template_name;
  if (typeof name !== "string" || !name.trim()) return null;
  const key = compactTemplateKey(name);
  for (const t of weddingTemplates) {
    if (compactTemplateKey(t.slug) === key) return t;
  }
  return null;
}

/** Ghép một dòng API với mẫu trong registry (ảnh, tier, style); link ưu tiên `invitePath`. */
type SpotlightItem = {
  key: string;
  template: WeddingTemplate;
  displayName: string;
  href: string;
};

function spotlightItemsFromPopularPayload(
  rawItems: unknown[],
  slugToTemplate: Map<string, WeddingTemplate>,
): SpotlightItem[] {
  const out: SpotlightItem[] = [];
  for (let i = 0; i < rawItems.length; i++) {
    const x = rawItems[i];
    if (!x || typeof x !== "object") continue;
    const o = x as Record<string, unknown>;
    const template = resolveTemplateForPopularItem(o, slugToTemplate);
    if (!template) continue;

    const eventTitle =
      typeof o.eventTitle === "string" ? o.eventTitle.trim() : "";
    const displayName = eventTitle;

    const inviteRaw = o.invitePath ?? o.invite_path;
    const invitePath =
      typeof inviteRaw === "string" && inviteRaw.trim().startsWith("/")
        ? inviteRaw.trim()
        : null;
    const href = invitePath ?? getTemplateHref(template);

    const id = o.id;
    const key =
      typeof id === "number" && Number.isFinite(id)
        ? `invite-${id}`
        : typeof id === "string" && id.trim()
          ? `invite-${id.trim()}`
          : invitePath
            ? `path-${invitePath}`
            : `idx-${i}-${template.slug}`;

    out.push({ key, template, displayName, href });
  }
  return out;
}

/** Section "được yêu thích" — tự ẩn khi API chưa có dữ liệu. */
export default function HomeHeroSpotlight() {
  const { homeHeroSpotlight: copy, home } = useMessages();
  const slugToTemplate = useMemo(
    () => new Map(weddingTemplates.map((t) => [t.slug, t])),
    [],
  );
  const [items, setItems] = useState<SpotlightItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await fetchPublicApi(
        `api/invites/popular?limit=${TOP_TEMPLATE_SPOTLIGHT_LIMIT}`,
        { method: "GET" },
      );
      if (cancelled) return;
      if (!r.ok || r.data == null) {
        setItems([]);
        return;
      }
      const list = unwrapPopularInvitesList(r.data);
      if (!list) {
        setItems([]);
        return;
      }
      setItems(spotlightItemsFromPopularPayload(list, slugToTemplate));
    })();
    return () => {
      cancelled = true;
    };
  }, [slugToTemplate]);

  if (items.length === 0) return null;

  return (
    <section className="lux-band py-24 sm:py-28" aria-labelledby="home-spotlight-title">
      <div className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="lux-eyebrow lux-eyebrow--center">{copy.eyebrow}</p>
          <h2 id="home-spotlight-title" className="lux-title mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem]">
            {copy.title}
          </h2>
          <p className="lux-muted mt-4 text-[0.95rem] leading-relaxed sm:text-base">{copy.body}</p>
        </div>

        {/* Bục vinh danh: Top 01 ở giữa và đứng cao hơn hạng 02 / 03 */}
        <ol className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map(({ key, template, displayName, href }, index) => (
            <li
              key={key}
              className={index === 0 ? "lg:order-2" : index === 1 ? "lg:order-1 lg:mt-16" : "lg:order-3 lg:mt-16"}
            >
              <TemplateListCard
                item={template}
                href={href}
                title={displayName || undefined}
                rank={index + 1}
                demoLabel={copy.openLabel}
                secondarySaveSlug={template.slug}
                secondaryLabel={home.templateCardSave}
              />
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <a href="#templates" className="lux-link text-sm">
            {copy.viewAll}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

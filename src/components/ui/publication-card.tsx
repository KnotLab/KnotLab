import React from "react";
import clsx from "clsx";
import { Button } from "./button";

export type PublicationLink = { label: string; href: string };

export type PublicationCardProps = {
  title: string;
  authors: string;
  venue?: string;
  year?: string | number;
  /** Thumbnail path or URL. If relative, it will be resolved against BASE_URL (works on GitHub Pages). */
  imageSrc?: string;
  imageAlt?: string;
  /** Optional tags like “Best Paper”, “Dataset”, etc. */
  tags?: string[];
  /** Action links (Paper, Code, Demo, Slides…) */
  links?: PublicationLink[];
  className?: string;
};

function resolveAsset(p?: string) {
  if (!p) return undefined as string | undefined;
  // absolute URL (http/https/data/blob) → keep
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(p) || p.startsWith("data:") || p.startsWith("blob:")) {
    return p;
  }
  const base = import.meta.env.BASE_URL || "/";
  if (p.startsWith(base)) return p; // already prefixed
  if (p.startsWith("/")) return new URL(p.slice(1), base).toString();
  return new URL(p, base).toString();
}

export function PublicationCard({
  title,
  authors,
  venue,
  year,
  imageSrc,
  imageAlt,
  tags,
  links,
  className,
}: PublicationCardProps) {
  const thumb = React.useMemo(() => resolveAsset(imageSrc), [imageSrc]);

  return (
    <article className={clsx("rounded-lg border p-4 sm:p-5", className)}>
      <div className="flex flex-col sm:flex-row gap-4">
        {thumb ? (
          // <img
          //   src={thumb}
          //   alt={imageAlt ?? title}
          //   loading="lazy"
          //   width={160}
          //   height={112}
          //   className="h-24 w-32 sm:h-28 sm:w-40 rounded-md border object-cover bg-muted"
          // />
          <img
            src={thumb}
            height={112}
            alt={imageAlt ?? title}
            loading="lazy"
            className="max-w-full sm:max-w-[160px] max-h-full object-contain"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{authors}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            {(venue || year) && (
              <span className="rounded border bg-muted px-2 py-0.5 text-muted-foreground">
                {venue}
                {venue && year ? " • " : ""}
                {year ?? ""}
              </span>
            )}
            {tags?.map((t) => (
              <span
                key={t}
                className="rounded-full border bg-secondary px-2.5 py-0.5 text-secondary-foreground"
              >
                {t}
              </span>
            ))}
            {links?.map((l) => (
              <Button key={l.href} size="sm" variant="outline" asChild>
                <a href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default PublicationCard;
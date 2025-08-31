import React from "react";
import clsx from "clsx";
import { User } from "lucide-react";

export type AvatarCardProps = {
  name: string;
  href?: string;
  subtitle?: string;
  imageSrc?: string;
  /** Image to show only while hovering the avatar */
  hoverImageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  external?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function AvatarCard({
  name,
  href,
  subtitle,
  imageSrc,
  hoverImageSrc,
  imageAlt,
  children,
  external,
  size = "md",
  className,
}: AvatarCardProps) {
  const [baseError, setBaseError] = React.useState(false);
  const [hoverError, setHoverError] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [hoverLoaded, setHoverLoaded] = React.useState(false);

  // Preload the hover image so the first hover doesn't flicker.
  React.useEffect(() => {
    if (!hoverImageSrc) return;
    const img = new Image();
    img.src = hoverImageSrc;
    img.onload = () => setHoverLoaded(true);
    img.onerror = () => setHoverError(true);
  }, [hoverImageSrc]);

  const sizeClasses = {
    sm: "h-12 w-12 text-xs",
    md: "h-16 w-16 text-sm",
    lg: "h-20 w-20 text-base",
  } as const;

  const hasLink = !!href && href.trim() !== "";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  // Show hover image only when: hovering avatar + we have a hover src + it loaded + no error
  const showHover =
    hovered && !!hoverImageSrc && hoverLoaded && !hoverError;

  const currentSrc = showHover ? hoverImageSrc : imageSrc;

  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
        "transition hover:shadow-md focus-within:shadow-md",
        className
      )}
    >
      <div className="flex items-start gap-4 p-4 sm:p-5">
        {/* Avatar (only this area triggers the swap) */}
        <div className="shrink-0">
          {currentSrc && !baseError ? (
            <div
              className={clsx(
                "relative overflow-hidden rounded-full border border-border bg-muted",
                "transition-transform",
                sizeClasses[size]
              )}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}   /* keyboard focus */
              onBlur={() => setHovered(false)}
            >
              <img
                key={currentSrc} // ensures the element updates when src changes
                src={currentSrc}
                alt={imageAlt ?? name}
                onError={() => {
                  if (showHover) setHoverError(true);
                  else setBaseError(true);
                }}
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          ) : (
            // Fallback: initials or icon
            <div
              className={clsx(
                "grid place-items-center rounded-full bg-muted text-muted-foreground border border-border",
                sizeClasses[size]
              )}
            >
              {name ? (
                <span className="font-medium">{initialsFromName(name)}</span>
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-tight tracking-tight">
            {hasLink ? (
              <a
                href={href}
                {...linkProps}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 rounded-sm hover:underline"
              >
                {name}
              </a>
            ) : (
              <span className="rounded-sm">{name}</span>
            )}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {children && (
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground/90">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvatarCard;
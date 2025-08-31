import * as React from "react";
import { Separator } from "./separator";
import clsx from "clsx";

type TitleImage = {
  src: string;
  alt?: string;      // set to "" if decorative
  size?: number;     // px
  rounded?: boolean; // default true
  className?: string;
};

export function Section({
  id,
  title,
  ariaLabel,
  titleImage,
  className,
  titleClassName,
  children,
}: React.PropsWithChildren<{
  id: string;
  /** Can be string or a React node (to allow images/badges etc.) */
  title: React.ReactNode;
  /** Provide when title is not a string (for a11y) */
  ariaLabel?: string;
  /** Optional image rendered in front of the title */
  titleImage?: TitleImage;
  className?: string;
  titleClassName?: string;
}>) {
  const label =
    typeof title === "string" ? title : ariaLabel ?? undefined;

  const size = titleImage?.size ?? 40;

  return (
    <section
      id={id}
      className={clsx("scroll-mt-24 md:scroll-mt-28 py-6", className)}
      aria-label={label}
    >
      <div className="container mx-auto max-w-5xl px-4">
        <h2
          className={clsx(
            "text-3xl md:text-4xl font-semibold tracking-tight",
            "flex items-center gap-3", // lets the image sit nicely before text
            titleClassName
          )}
        >
          {titleImage && (
            <img
              src={titleImage.src}
              alt={titleImage.alt ?? ""}
              width={size}
              height={size}
              className={clsx(
                "shrink-0 object-cover",
                (titleImage.rounded ?? true) && "rounded-full",
                titleImage.className
              )}
            />
          )}
          <span className="leading-none">{title}</span>
        </h2>

        <Separator className="mb-6 mt-2" />

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}
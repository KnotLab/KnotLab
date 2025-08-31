import { Button } from "@/components/ui/button";

type Cta = { label: string; href?: string };

export function FriendlyHero({
  title = "Hello And Welcome",
  subtitle = "The Knowledge-infused Nursing Oriented Training 🪢 Lab",
  primary = { label: "Contact Us", href: "#" },
  secondary = { label: "Our Work", href: "#" },
  className = "",
}: {
  title?: string;
  subtitle?: string;
  primary?: Cta;
  secondary?: Cta;
  className?: string;
}) {
  const hasPrimary = primary?.href && primary.label;
  const hasSecondary = secondary?.href && secondary.label;

  return (
    <section className={["relative overflow-hidden", "py-20 sm:py-28", className].join(" ")}>
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full" />

      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className={[
              "font-display font-black tracking-wide",
              "text-4xl sm:text-6xl md:text-7xl",
              "text-stone-700 dark:text-stone-100",
              "[text-shadow:0_2px_0_rgba(255,255,255,0.6)] dark:[text-shadow:0_1px_0_rgba(0,0,0,0.4)]",
              "font-[ui-rounded]"
            ].join(" ")}
          >
            {title}
          </h1>

          {/* subtitle now uses ui-rounded */}
          <p
            className={[
              "mt-6 text-lg sm:text-xl leading-relaxed",
              "text-stone-600 dark:text-stone-300",
              "max-w-3xl mx-auto",
            ].join(" ")}
          >
            {subtitle}
          </p>

          {/* CTA buttons — square-ish with soft corners */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {hasPrimary && (
              <Button
                asChild
                className="
                    h-12 rounded-xl text-lg px-8 font-bold shadow-sm hover:shadow-md
                    bg-[rgb(180,95,65)] hover:bg-[rgb(180,95,65)/0.9]
                    text-white
                    focus-visible:ring-[rgb(180,95,65)/.35]
                "
                >
                <a href={primary.href}>{primary.label}</a>
                </Button>
            )}

            {hasSecondary && (
                <Button
                    asChild
                    variant="outline"
                    className="
                        h-12 px-8 text-lg rounded-xl
                        font-bold
                        border-2 border-[rgb(180,95,65)]
                        text-[rgb(180,95,65)] hover:text-[rgb(180,95,65)]
                        hover:bg-[rgb(180,95,65)/0.06] dark:hover:bg-[rgb(180,95,65)/0.12]
                        focus-visible:ring-2 focus-visible:ring-[rgb(180,95,65)/.25]
                    "
                    >
                    <a href={secondary.href}>{secondary.label}</a>
                </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * FriendlyHero
 * A soft, welcoming hero inspired by the screenshot—rounded, warm, and playful.
 * Uses shadcn Button and Tailwind utilities. Drop into your page and tweak props.
 *
 * Props
 * - title, subtitle: copy text
 * - primary: { label, href }
 * - secondary: { label, href }
 * - className: extra classes
 *
 * Tips
 * - For the rounded display look, set a display font on .font-display in globals.
 */
export function FriendlyHero({
  title = "Hello And Welcome",
  subtitle =
    "The Knowledge-infused Nursing Oriented Training 🪢 Lab",
  className = "",
}: {
  title?: string
  subtitle?: string
  className?: string
}) {
  return (
    <section
      className={[
        "relative overflow-hidden",
        // warm cream background similar to reference; swap to bg-background to use your theme
        // "bg-[oklch(0.98_0.02_85)] dark:bg-[oklch(0.22_0.02_240)]",
        "py-20 sm:py-28",
        className,
      ].join(" ")}
    >
      {/* subtle corner blobs for charm */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full" />

      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className={[
              "font-display font-black tracking-wide",
              "text-4xl sm:text-6xl md:text-7xl",
              "text-stone-700 dark:text-stone-100",
              // soft text shadow for the bubbly feel
              "[text-shadow:0_2px_0_rgba(255,255,255,0.6)] dark:[text-shadow:0_1px_0_rgba(0,0,0,0.4)]",
            ].join(" ")}
          >
            {title}
          </h1>

          <p
            className={[
              "mt-6 text-lg sm:text-xl leading-relaxed",
              "text-stone-600 dark:text-stone-300",
              "max-w-3xl mx-auto",
            ].join(" ")}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

/* Optional: add this to your globals.css to imitate the rounded friendly title type
:root { --font-display: "Baloo 2", "Fredoka", "Nunito", system-ui, sans-serif; }
.font-display { font-family: var(--font-display); }
*/

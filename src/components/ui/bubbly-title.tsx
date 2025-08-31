// BubblyTitle.tsx
type BubblyTitleProps = {
  children: React.ReactNode
  solidColor?: string
  funFont?: boolean
  bubbles?: boolean
  className?: string
  size?: "xs" | "sm" | "md" | "lg" // NEW
}

const SIZE = {
  xs: "text-xl sm:text-2xl md:text-3xl",
  sm: "text-2xl sm:text-3xl md:text-4xl",
  md: "text-3xl sm:text-4xl md:text-5xl",
  lg: "text-4xl sm:text-5xl md:text-6xl",
} as const

export function BubblyTitle({
  children,
  solidColor,
  funFont = true,
  className = "",
  size = "lg", // default same as before
}: BubblyTitleProps) {
  const fontClass = funFont ? "font-[ui-rounded]" : ""
  
  return (
    <span
      style={{ color: solidColor }}                 // ← solid color here
      className={[
        "relative inline-block font-black tracking-wide",
        SIZE[size],
        fontClass,
        "[text-shadow:0_2px_0_rgba(255,255,255,.7)]",
        "dark:[text-shadow:0_1px_0_rgba(0,0,0,.4)]",
        className,
      ].join(" ")}
    >
      {children}
      {/* bubbles… */}
    </span>
  )
}

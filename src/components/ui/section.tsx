import { Separator } from "./separator";

export function Section({ id, title, children }: React.PropsWithChildren<{ id: string; title: string }>) {
  return (
    <section
      id={id}
      className="scroll-mt-24 md:scroll-mt-28 py-6"
      aria-label={title}
    >
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
        <Separator className="mb-6 mt-2" />
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}
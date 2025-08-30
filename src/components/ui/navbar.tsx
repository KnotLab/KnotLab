import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";

const SECTIONS = [
  { id: "what_we_do", label: "What we do?" },
  { id: "vision", label: "Our Vision" },
  { id: "team", label: "Our Team" },
  { id: "publications", label: "Publications" }
] as const;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {SECTIONS.map((s) => (
          <NavigationMenuItem key={s.id}>
            <NavigationMenuLink asChild>
              <Button
                variant="ghost"
                size="sm"
                className="font-medium"
                onClick={() => scrollToId(s.id)}
              >
                {s.label}
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="mt-6 space-y-2">
          {SECTIONS.map((s) => (
            <Button
              key={s.id}
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={() => {
                scrollToId(s.id);
                // Close the sheet by clicking the overlay programmatically
                const overlay = document.querySelector<HTMLElement>(
                  "[data-state='open'][data-radix-sheet-override]"
                );
                overlay?.click();
              }}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
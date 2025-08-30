import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { AvatarCard } from "@/components/ui/avatar-card";
import { PublicationCard, type PublicationCardProps } from "@/components/ui/publication-card";
import { scrollToId, DesktopNav, MobileNav } from "@/components/ui/navbar";

// https://gist.github.com/SheldonWangRJT/8d3f44a35c8d1386a396b9b49b43c385

// If you're using Vite/CRA asset imports, replace with your logo path or remove
// import logo from "./logo.svg";

/**
 * Single-page App scaffold for the WebEyeTrack site
 * - Top fixed navbar built with shadcn/ui
 * - Smooth in-page scrolling to sections
 * - Mobile menu via <Sheet>
 * - Accessible, keyboard-friendly nav
 */

const PUBLICATIONS: PublicationCardProps[] = [
  {
    title:
      "Eye movements as predictors of student experiences during nursing simulation learning events",
    authors:
      "M. Lee, C. Vatral, C. Cohn, E. Davalos, M. Jessee, G. Biswas, D. Levin",
    venue: "CRPI",
    year: 2025,
    links: [
      { label: "Website", href: "https://link.springer.com/article/10.1186/s41235-025-00640-7" },
    ],
    imageSrc: "/paper_teasers/eye_cognitive_2025.png",
    imageAlt: "Egocentric view of nursing simulation with gaze overlay"
  },
  {
    title:
      "Prediction of Students’ Self-confidence Using Multimodal Features in an Experiential Nurse Training Environment",
    authors:
      "C. Vatral, M. Lee, C. Cohn, E. Davalos, D. Levin, G. Biswas",
    venue: "AIED",
    year:2023,
    links: [
      { label: "Website", href: "https://link.springer.com/chapter/10.1007/978-3-031-36336-8_41" },
      { label: "Paper", href: "https://www.researchgate.net/profile/Caleb-Vatral/publication/372015876_Prediction_of_Students%27_Self-confidence_Using_Multimodal_Features_in_an_Experiential_Nurse_Training_Environment/links/64c96492862f8d299989172d/Prediction-of-Students-Self-confidence-Using-Multimodal-Features-in-an-Experiential-Nurse-Training-Environment.pdf" },
    ],
    imageSrc: "/paper_teasers/Prediction_AIED2023.png",
    imageAlt: "Feature Set used in Analysis"
  },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      {/* Fixed top bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex h-16 md:h-20 items-center justify-between gap-3">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* Uncomment if you have a logo asset */}
              {/* <img src={logo} alt="WebEyeTrack logo" className="h-7 w-7" /> */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("hero");
                }}
                className="text-lg md:text-xl font-bold"
              >
                🪢 Knot Lab
              </a>
            </div>

            <DesktopNav />
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/KnotLab"
                target="_blank"
                rel="noreferrer noopener"
                className="hidden sm:inline-flex"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>

        {/* (1) What we do? */}
        <Section id="what_we_do" title="What we do?">
          <div className="space-y-4">
            <p>
            We focus on advancing <strong>healthcare education</strong> through AI-driven nursing simulation-based training.
            Our work empowers educators and instructors to deliver immersive, realistic, and adaptive training experiences
            for nursing students.
            </p>
            <ul className="list-disc pl-6">
              <li>Developing AI-assisted simulation scenarios that reflect real-world clinical challenges.</li>
              <li>Enhancing student feedback with intelligent assessment and personalized guidance.</li>
              <li>Integrating virtual patients and adaptive environments for enriched learning experiences.</li>
            </ul>
          </div>
        </Section>

        {/* (2) Our Vision */}
        <Section id="vision" title="Our Vision">
          <div className="space-y-4">
            <p>
              We believe the future of nursing education lies in creating <strong>powerful, data-driven, and human-centered learning tools</strong>.
              By combining AI with simulation-based training, we aim to prepare the next generation of nurses to deliver safe,
              compassionate, and effective care.
            </p>
            <p>
              Our vision is to make simulation training more accessible, scalable, and impactful—equipping educators with
              intelligent support systems and giving students opportunities to practice, fail safely, and grow with confidence.
            </p>
          </div>
        </Section>

        {/* (3) Our Team */}
        <Section id="team" title="Our Team">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AvatarCard
              name="Yike Zhang"
              href="https://yikezhang.me"
              subtitle="Assistant Professor, Healthcare Ed | LLMs"
              imageSrc={`/profiles/yike_zhang.jpeg`}
              external
            />
            <AvatarCard
              name="Eduardo Davalos"
              href="https://edavalosanaya.github.io"
              subtitle="Assistant Professor, AIED | HCI | LLMs"
              imageSrc={`/profiles/eduardo_davalos.webp`}
              external
            />
          </div>
        </Section>

        {/* (4) Our Publications */}
        <Section id="publications" title="Our Publications">
          <div className="space-y-4">
            {PUBLICATIONS.map((pub) => (
              <PublicationCard key={pub.title} {...pub} />
            ))}
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} The Knot Lab. All rights reserved.
        </div>
      </footer>

      {/* Back to top */}
      <div className="fixed bottom-5 right-5">
        <Button
          variant="secondary"
          onClick={() => scrollToId("hero")}
          className="shadow-lg"
        >
          Back to top
        </Button>
      </div>
    </div>
  );
}
import { Github } from "lucide-react";
import { FriendlyHero } from "@/components/ui/friendly-hero";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { AvatarCard } from "@/components/ui/avatar-card";
import { PublicationCard, type PublicationCardProps } from "@/components/ui/publication-card";
import { scrollToId, DesktopNav, MobileNav } from "@/components/ui/navbar";

import { BubblyTitle } from "@/components/ui/bubbly-title";

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
      "WEBEYETRACK: Scalable Eye‑Tracking for the Browser via On‑Device Few‑Shot Personalization",
    authors:
      "E. Davalos*, Y. Zhang*, N. Srivastava, Y. Thatigotla, J. A. Salas, S. McFadden, S.-J. Cho, A. Goodwin, A. TS, G. Biswas",
    venue: "arXiv",
    year: 2025,
    links: [
      { label: "Website", href: "https://redforestai.github.io/WebEyeTrack/" },
      { label: "Paper", href: "https://arxiv.org/abs/2508.19544" },
      { label: "Code", href: "https://github.com/RedForestAi/WebEyeTrack" },
    ],
    imageSrc: `${import.meta.env.BASE_URL}/paper_teasers/WebEyeTrack_AAAI2026.jpg`,
    imageAlt: "WebEyeTrack Architecture Figure"
  },
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
    imageSrc: `${import.meta.env.BASE_URL}/paper_teasers/eye_cognitive_2025.png`,
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
    imageSrc: `${import.meta.env.BASE_URL}/paper_teasers/Prediction_AIED2023.png`,
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

      {/* Static Image On the Left Panel */}
      <img
        src={`${import.meta.env.BASE_URL}/profiles/hi.jpg`}
        alt="" aria-hidden="true"
        loading="lazy" draggable="false"
        className="hidden lg:block
                  fixed left-4 bottom-20
                  z-30 w-36 h-auto
                  pointer-events-none select-none
                  border-0 rounded-none ring-0 shadow-none "
      />

      {/* Main content */}
      <main>

        <FriendlyHero
          title="Hello and Welcome"
          titleImage={{
          src: `${import.meta.env.BASE_URL}/profiles/cat_title.jpg`,
          size: 150,          // px
          rounded: true,     // set false for a square icon
          position: "left",  // or "right"
        }}
          subtitle="The Knowledge-infused Nursing Oriented Training 🪢 Lab"
          primary={{ label: "Contact Us", href: "mailto:yzhang5@stmarytx.edu" }}
          secondary={{ label: "Our Work", href: "#publications" }}
        />


        {/* (1) What we do? */}
        <Section id="what_we_do" 
                  title={<BubblyTitle size="sm" solidColor="oklch(0.5794 0.1185 39.9)">What We Do?</BubblyTitle>} 
                  titleImage={{src: `${import.meta.env.BASE_URL}/profiles/cat_paw.jpg`,
                              alt: "",      // or "" if purely decorative
                              size: 60,
                              rounded: true}}>
          <div className="space-y-4">
            <p>
            We focus on advancing <strong>healthcare education</strong> through AI-driven nursing simulation-based training.
            Our work empowers educators and instructors to deliver immersive, realistic, and adaptive training experiences
            for nursing students.
            </p>
            <ul className="list-disc pl-6">
              <li>Developing AI-assisted simulation scenarios that reflect real-world clinical challenges.</li>
              <li>Improving student feedback with intelligent assessment and personalized guidance.</li>
              <li>Integrating virtual patients and adaptive environments for enriched learning experiences.</li>
            </ul>
          </div>
        </Section>

        {/* (2) Our Vision */}
        <Section id="vision" title={<BubblyTitle size="sm" solidColor="oklch(0.5794 0.1185 39.9)">Our Vision</BubblyTitle>} 
                titleImage={{src: `${import.meta.env.BASE_URL}/profiles/cat_paw.jpg`,
                            alt: "",      // or "" if purely decorative
                            size: 60,
                            rounded: true}}>
          <div className="space-y-4">
            <p>
              We believe the future of nursing education lies in creating <strong>powerful, data-driven, and human-centered learning tools</strong>.
              By combining AI with simulation-based training, we aim to prepare the next generation of nurses to deliver safe,
              compassionate, and effective care.
            </p>
            <p>
              Our vision is to make simulation training more accessible, scalable, and impactful by equipping educators with
              intelligent support systems and giving students opportunities to practice, fail safely, and grow with confidence.
            </p>
          </div>
        </Section>

        {/* (3) Our Team */}
        <Section id="team" 
                title={<BubblyTitle size="sm" solidColor="oklch(0.5794 0.1185 39.9)">Our Team</BubblyTitle>} 
                titleImage={{src: `${import.meta.env.BASE_URL}/profiles/cat_paw.jpg`,
                            alt: "",      // or "" if purely decorative
                            size: 60,
                            rounded: true}}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AvatarCard
              name="Dr. Yike Zhang"
              href="https://yikezhang.me"
              subtitle="Assistant Professor, HCI | Healthcare | AIED | LLMs"
              imageSrc={`${import.meta.env.BASE_URL}/profiles/ragdoll.jpg`}
              hoverImageSrc={`${import.meta.env.BASE_URL}/profiles/yike_zhang.jpeg`}
              external
            />
            <AvatarCard
              name="Dr. Eduardo Davalos"
              href="https://edavalosanaya.github.io"
              subtitle="Assistant Professor, AIED | HCI | LLMs"
              imageSrc={`${import.meta.env.BASE_URL}/profiles/bb.jpg`}
              hoverImageSrc={`${import.meta.env.BASE_URL}/profiles/eduardo_davalos.webp`}
              external
            />
            <AvatarCard
              name="To Be Filled In ..."
              subtitle=""
              imageSrc={`${import.meta.env.BASE_URL}/profiles/new_cat.jpg`}
              external
            />
          </div>
        </Section>

        {/* (4) Our Publications */}
        <Section id="publications" title={<BubblyTitle size="sm" solidColor="oklch(0.5794 0.1185 39.9)">Publications</BubblyTitle>} 
                  titleImage={{src: `${import.meta.env.BASE_URL}/profiles/cat_paw.jpg`,
                              alt: "",      // or "" if purely decorative
                              size: 60,
                              rounded: true}}>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub) => (
              <PublicationCard key={pub.title} {...pub} />
            ))}
          </div>
        </Section>
      </main>

    {/* Have a good day! */}
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <img
        src={`${import.meta.env.BASE_URL}/profiles/lovely_cats.jpg`}
        loading="lazy"
        draggable="false"
        className="mx-auto block
                  w-full max-w-[420px] sm:max-w-[520px]
                  h-auto rounded-none shadow-none border-0 /* no edges */"
      />
    </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} The Knot Lab. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
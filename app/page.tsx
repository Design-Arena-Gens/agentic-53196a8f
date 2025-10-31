"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Capability =
  | "Text-to-Video"
  | "Avatar Presenter"
  | "Video Editing"
  | "Real-Time"
  | "3D Scenes"
  | "Storyboarding"
  | "Voice Cloning";

type PricingTier = "Free" | "Freemium" | "Paid" | "Enterprise";

type VideoAIDescriptor = {
  name: string;
  description: string;
  website: string;
  pricing: PricingTier;
  bestFor: string;
  releaseYear: number;
  capabilities: Capability[];
  notableCustomers?: string[];
};

const TOOLKIT: VideoAIDescriptor[] = [
  {
    name: "Runway Gen-2",
    description:
      "Creative text-to-video and image-to-video generation with granular camera motion controls, style presets, and timeline-based editing.",
    website: "https://runwayml.com",
    pricing: "Freemium",
    bestFor: "Filmmakers seeking cinematic control and experimental visuals",
    releaseYear: 2023,
    capabilities: ["Text-to-Video", "Video Editing"],
    notableCustomers: ["Cannes Film Festival", "Google Brand Studio"]
  },
  {
    name: "Synthesia",
    description:
      "Avatar-presented videos in over 130 languages, customizable speakers, and enterprise-grade security for corporate communications.",
    website: "https://www.synthesia.io",
    pricing: "Enterprise",
    bestFor: "Training and global enterprise enablement teams",
    releaseYear: 2017,
    capabilities: ["Avatar Presenter", "Voice Cloning"],
    notableCustomers: ["Accenture", "Roche", "Amazon"]
  },
  {
    name: "Pika Labs",
    description:
      "Community-driven text-to-video lab with playable camera paths, multimodal input, and rapid iteration for social content.",
    website: "https://www.pika.art",
    pricing: "Freemium",
    bestFor: "Creators and social storytellers iterating on visual ideas fast",
    releaseYear: 2023,
    capabilities: ["Text-to-Video", "Real-Time"]
  },
  {
    name: "HeyGen",
    description:
      "Lifelike AI presenters, instant dubbing with lip-sync, collaborative workflows, and an API for programmatic video generation.",
    website: "https://www.heygen.com",
    pricing: "Paid",
    bestFor: "Marketing and growth teams shipping localized content at scale",
    releaseYear: 2022,
    capabilities: ["Avatar Presenter", "Voice Cloning", "Video Editing"],
    notableCustomers: ["L'Oréal", "Ally Bank"]
  },
  {
    name: "Synths.Video",
    description:
      "Automate the creation of YouTube-ready videos from blog posts, including editing templates, voice-over, and scheduled publishing.",
    website: "https://synths.video",
    pricing: "Paid",
    bestFor: "SEO and content marketing teams turning articles into videos",
    releaseYear: 2021,
    capabilities: ["Avatar Presenter", "Video Editing"]
  },
  {
    name: "Colossyan Creator",
    description:
      "Script-to-video generation with multi-speaker scenes, AI-assisted script suggestions, and camera direction automation.",
    website: "https://www.colossyan.com",
    pricing: "Paid",
    bestFor: "Learning & development teams with minimal production resources",
    releaseYear: 2021,
    capabilities: ["Avatar Presenter", "Text-to-Video", "Video Editing"],
    notableCustomers: ["Pearson", "Vodafone"]
  },
  {
    name: "Visla",
    description:
      "Storyboarding assistant with B-roll sourcing, AI editing suggestions, and collaborative review rounds for video teams.",
    website: "https://www.visla.us",
    pricing: "Freemium",
    bestFor: "In-house video teams planning story arcs and branded edits",
    releaseYear: 2022,
    capabilities: ["Storyboarding", "Video Editing"]
  },
  {
    name: "Luma Dream Machine",
    description:
      "High-fidelity text-to-video engine with photorealistic rendering and emerging support for 3D scenes generated from prompts.",
    website: "https://lumalabs.ai",
    pricing: "Freemium",
    bestFor: "Experimental storytellers pushing realistic visual fidelity",
    releaseYear: 2024,
    capabilities: ["Text-to-Video", "3D Scenes"]
  },
  {
    name: "Descript AI",
    description:
      "AI-powered video editing suite with overdub voice cloning, filler word removal, and instant screen recorder cleanup.",
    website: "https://www.descript.com",
    pricing: "Freemium",
    bestFor: "Podcasters and video editors wanting script-based editing",
    releaseYear: 2020,
    capabilities: ["Video Editing", "Voice Cloning"]
  },
  {
    name: "InVideo",
    description:
      "Template-driven video creation that adapts scripts to social formats, offers AI voiceovers, and brand asset management.",
    website: "https://invideo.io",
    pricing: "Paid",
    bestFor: "Agencies producing social ads at high velocity",
    releaseYear: 2019,
    capabilities: ["Text-to-Video", "Video Editing"]
  },
  {
    name: "Rephrase.ai",
    description:
      "Hyper-personalized avatar videos driven by CRM data, with API integrations for campaign automation and performance tracking.",
    website: "https://www.rephrase.ai",
    pricing: "Enterprise",
    bestFor: "Sales and lifecycle marketing creating personalized outreach",
    releaseYear: 2018,
    capabilities: ["Avatar Presenter", "Voice Cloning"]
  },
  {
    name: "Kapwing AI Studio",
    description:
      "Collaborative video editing workspace augmented with AI cleanup tools, smart resizing, and rewrite assistance for scripts.",
    website: "https://www.kapwing.com/ai",
    pricing: "Freemium",
    bestFor: "Marketers and social media teams refining quick-turn edits",
    releaseYear: 2023,
    capabilities: ["Video Editing", "Storyboarding"]
  }
];

const ALL_CAPABILITIES: Capability[] = [
  "Text-to-Video",
  "Avatar Presenter",
  "Video Editing",
  "Real-Time",
  "3D Scenes",
  "Storyboarding",
  "Voice Cloning"
];

const PRICING_OPTIONS: PricingTier[] = ["Free", "Freemium", "Paid", "Enterprise"];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCapabilities, setActiveCapabilities] = useState<Capability[]>([]);
  const [pricingTier, setPricingTier] = useState<PricingTier | "All">("All");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");

  const filteredToolkit = useMemo(() => {
    return TOOLKIT.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.bestFor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPricing =
        pricingTier === "All" ||
        (pricingTier === "Free" && tool.pricing === "Free") ||
        (pricingTier === "Freemium" && tool.pricing === "Freemium") ||
        (pricingTier === "Paid" && tool.pricing === "Paid") ||
        (pricingTier === "Enterprise" && tool.pricing === "Enterprise");

      const matchesCapabilities =
        activeCapabilities.length === 0 ||
        activeCapabilities.every((capability) => tool.capabilities.includes(capability));

      return matchesSearch && matchesPricing && matchesCapabilities;
    }).sort((a, b) => {
      return sortDirection === "desc"
        ? b.releaseYear - a.releaseYear
        : a.releaseYear - b.releaseYear;
    });
  }, [searchTerm, activeCapabilities, pricingTier, sortDirection]);

  const toggleCapability = (capability: Capability) => {
    setActiveCapabilities((current) =>
      current.includes(capability)
        ? current.filter((item) => item !== capability)
        : [...current, capability]
    );
  };

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div>
          <p className={styles.tagline}>2024 Landscape</p>
          <h1>Video Generation AI Navigator</h1>
          <p className={styles.subtitle}>
            Discover the top platforms that turn scripts, prompts, and data into dynamic video content.
            Compare capabilities, pricing, and standout differentiators across the landscape.
          </p>
        </div>
        <div className={styles.heroPanel}>
          <div>
            <h2>Quick Stats</h2>
            <ul>
              <li>
                <span className={styles.metricLabel}>Average release</span>
                <span className={styles.metricValue}>
                  {Math.round(
                    TOOLKIT.reduce((sum, tool) => sum + tool.releaseYear, 0) / TOOLKIT.length
                  )}
                </span>
              </li>
              <li>
                <span className={styles.metricLabel}>Capabilities tracked</span>
                <span className={styles.metricValue}>{ALL_CAPABILITIES.length}</span>
              </li>
              <li>
                <span className={styles.metricLabel}>Tools listed</span>
                <span className={styles.metricValue}>{TOOLKIT.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className={styles.filters} aria-label="Filters">
        <div className={styles.search}>
          <label htmlFor="search" className="sr-only">
            Search tools
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search by name, use case, or feature..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className={styles.filterGroup} role="group" aria-label="Capability filters">
          {ALL_CAPABILITIES.map((capability) => {
            const isActive = activeCapabilities.includes(capability);
            return (
              <button
                key={capability}
                type="button"
                className={isActive ? styles.filterActive : ""}
                onClick={() => toggleCapability(capability)}
              >
                {capability}
              </button>
            );
          })}
        </div>

        <div className={styles.controlRow}>
          <div className={styles.dropdownWrapper}>
            <label htmlFor="pricing-filter">Pricing</label>
            <select
              id="pricing-filter"
              value={pricingTier}
              onChange={(event) => setPricingTier(event.target.value as PricingTier | "All")}
            >
              <option value="All">All tiers</option>
              {PRICING_OPTIONS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.sortToggle}>
            <span>Release year</span>
            <button
              type="button"
              onClick={() =>
                setSortDirection((current) => (current === "desc" ? "asc" : "desc"))
              }
            >
              {sortDirection === "desc" ? "Newest → Oldest" : "Oldest → Newest"}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.results} aria-live="polite">
        {filteredToolkit.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No tools found</h3>
            <p>Try removing some filters or searching with different keywords.</p>
          </div>
        ) : (
          filteredToolkit.map((tool) => (
            <article key={tool.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{tool.name}</h3>
                  <span className={styles.pricingBadge}>{tool.pricing}</span>
                </div>
                <p className={styles.releaseYear}>{tool.releaseYear}</p>
              </div>
              <p className={styles.description}>{tool.description}</p>

              <div className={styles.tokenRow}>
                <span className={styles.tokenLabel}>Best for</span>
                <p>{tool.bestFor}</p>
              </div>

              <div className={styles.tokenRow}>
                <span className={styles.tokenLabel}>Capabilities</span>
                <div className={styles.capabilitiesList}>
                  {tool.capabilities.map((capability) => (
                    <span key={`${tool.name}-${capability}`}>{capability}</span>
                  ))}
                </div>
              </div>

              {tool.notableCustomers && (
                <div className={styles.tokenRow}>
                  <span className={styles.tokenLabel}>Notable teams</span>
                  <div className={styles.capabilitiesList}>
                    {tool.notableCustomers.map((customer) => (
                      <span key={`${tool.name}-${customer}`}>{customer}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.footer}>
                <a href={tool.website} target="_blank" rel="noreferrer">
                  Visit website
                </a>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default Page;

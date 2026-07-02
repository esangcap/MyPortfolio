"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  Download,
  FileText,
  GitBranch,
  Mail,
  Menu,
  PanelsTopLeft,
  Phone,
  Quote,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Lenis from "lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const navigation = ["Work", "Stack", "Proof", "Timeline", "Contact"];

const skills = [
  { icon: Code2, title: "Full-stack builds", text: "React, Next.js, Node, Express, Supabase, PHP, and production UI systems." },
  { icon: PanelsTopLeft, title: "Commerce craft", text: "Shopify Liquid, WordPress, WooCommerce, conversion UX, custom calculators, and theme systems." },
  { icon: Bot, title: "AI automation", text: "n8n workflows, AI assistants, operational automations, and client-facing demos." },
  { icon: Cloud, title: "Cloud delivery", text: "AWS API Gateway, Lambda, S3, EC2, Google Cloud Functions, BigQuery, and Cloud Storage." },
];

const recentProjects = [
  {
    name: "PeopleLens AU",
    type: "AI HR intelligence demo",
    year: "2026",
    href: "https://github.com/esangcap/Peoplemindhrmsau",
    stack: "React, Vite, Supabase, MUI, AI assistant",
    summary:
      "Built a polished workforce intelligence prototype with employee profiles, compliance, skills, reporting, and an AI HR assistant for client demos.",
  },
  {
    name: "Panadero UAE",
    type: "Multi-branch bakery system",
    year: "2026",
    href: "https://github.com/esangcap/Panaderomultibranchesuae",
    stack: "React, TypeScript, Supabase Auth, Edge Functions, Vite",
    summary:
      "Built a branch-aware bakery management platform with staff login, POS, order creation, kitchen workflow, inventory, recipes, alerts, transfers, and admin tooling.",
  },
  {
    name: "Teamio, NL",
    type: "Product website prototype",
    year: "2026",
    href: "https://teamiosupport.io",
    stack: "React, Vite, motion, conversion sections",
    summary:
      "Implemented a marketing experience from a Figma code bundle with ROI storytelling, video assets, and responsive product sections.",
  },
  {
    name: "Dylux.com, US",
    type: "Shopify theme merge",
    year: "2026",
    href: "https://dylux.com",
    stack: "Shopify Liquid, theme merge, storefront QA",
    summary:
      "Managed a Shopify theme merge workflow around an updated Xclusive theme, consolidating storefront changes while preserving production theme behavior.",
  },
  {
    name: "QR Order, US",
    type: "Restaurant ordering system",
    year: "2026",
    href: "https://qrorder.pro",
    stack: "React, application UI, ordering flows",
    summary:
      "Created a QR ordering product for restaurants, extending the React application experience behind qrorder.pro.",
  },
  {
    name: "Foureditors.com, NL",
    type: "Shopify theme engineering",
    year: "2026",
    href: "https://foureditors.com",
    stack: "Shopify Liquid, snippets, conversion UX, tracking hygiene",
    summary:
      "Maintained a custom Shopify theme with specialized Liquid snippets, product/course sections, checkout integrations, and URL sanitization for cleaner tracking.",
  },
  {
    name: "Premier Concrete Equipment, AU",
    type: "Shopify theme repository",
    year: "2026",
    href: "https://premierce.com.au",
    stack: "Shopify Liquid, storefront theme, VS Code workflow",
    summary:
      "Managed the PremierCE Shopify theme locally with a versioned repository workflow for storefront customization and maintainable theme updates.",
  },
];

const projectThemes = [
  { bg: "#eefaf6", border: "#14b8a6", line: "#b8e5dc", accent: "#0f766e" },
  { bg: "#fff8e8", border: "#f59e0b", line: "#f5ddb0", accent: "#b45309" },
  { bg: "#eff6ff", border: "#38bdf8", line: "#bfdbfe", accent: "#0369a1" },
  { bg: "#f5f3ff", border: "#8b5cf6", line: "#ddd6fe", accent: "#6d28d9" },
  { bg: "#f1f5f9", border: "#64748b", line: "#cbd5e1", accent: "#334155" },
  { bg: "#fff1f2", border: "#fb7185", line: "#fecdd3", accent: "#be123c" },
  { bg: "#ecfccb", border: "#84cc16", line: "#d9f99d", accent: "#4d7c0f" },
];

const workMetrics: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: "70%+", label: "Less manual work through smarter workflows", icon: Workflow },
  { value: "2-5x", label: "Faster operations and delivery turnaround", icon: ArrowUpRight },
  { value: "Data", label: "Clearer visibility for better decisions", icon: Code2 },
  { value: "Scale", label: "Systems designed to grow with the business", icon: Sparkles },
];

const websiteWork = [
  "getboomba.com",
  "dam-health.com",
  "shop.drfranks.co.uk",
  "slideshop.com",
  "foureditors.com",
  "neuftechph.com",
  "thepowdershampoo.com",
  "beautebynature.com",
];

const testimonials = [
  {
    quote:
      "Eric is a developer you can trust. Thinks along, can communicate well and quickly and is also very skilled.",
    name: "Tim",
    role: "CEO, Four Editors",
  },
  {
    quote:
      "Very professional and highly skilled at his craft. I will try to work with him again for any needs in the future.",
    name: "Matt Gramer",
    role: "CEO, Kentucky Counseling Center",
  },
  {
    quote:
      "The end product exceeds my expectations. Excellent work and very professional.",
    name: "Alex Blastique",
    role: "Operations Manager, Neuftech",
  },
];

const timeline = [
  ["2026", "Full Stack Engineer | AI automations", "PeopleLens AU, Panadero UAE, Teamio, DyluxMerge, FourEditors 2026, PremierCE Theme, and QR Order."],
  ["2025", "Shopify project delivery", "utilise social, AVAMIA, DAM Health, Dr. Franks, Uniquely Lola James, and Screen Shaver."],
  ["2024", "Membership commerce", "slideshop.com rebuild with paid-member template download restrictions."],
  ["2022-2024", "Lead Shopify developer", "getboomba.com conversion features, theme customization, and stakeholder delivery."],
  ["2010-2020", "Enterprise web developer", "Emirates Airlines internal web systems and cross-department data experiences."],
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.09,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function MagneticField() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const background = useMotionTemplate`radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(20, 184, 166, 0.28), transparent 32%), radial-gradient(circle at ${100 - mouse.x}% ${mouse.y}%, rgba(245, 158, 11, 0.18), transparent 30%)`;

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
      style={{ background }}
    />
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 38, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollTheater() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const beamScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.2, 0.95, 0.35]);
  const activeTheme = projectThemes[activeProject % projectThemes.length];

  return (
    <section id="work" ref={targetRef} className="relative overflow-hidden bg-[#071016] py-24 text-white sm:py-32">
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-24 h-[760px] w-[760px] rounded-full border border-teal-300/20"
        style={{ opacity: ambientOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-1/2"
        style={{
          opacity: ambientOpacity,
          background: `radial-gradient(circle at 70% 24%, ${activeTheme.border}33, transparent 34%), radial-gradient(circle at 30% 72%, ${activeTheme.border}1f, transparent 36%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 px-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <div>
            <p className="font-mono text-xs uppercase text-teal-200">My Work</p>
            <div className="mt-4 h-px w-16 bg-teal-300" />
            <h2 className="mt-8 max-w-xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Technology that turns busy operations into business momentum.
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-white/68">
              Each build connects process, data, automation, and customer experience so teams move faster, reduce manual work, and see clearer decisions.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 border border-white/10 bg-white/[0.035]">
            {workMetrics.map(({ value, label, icon: Icon }) => (
              <div key={value} className="min-h-32 border-b border-r border-white/10 p-5 even:border-r-0 last:border-b-0 [&:nth-last-child(2)]:border-b-0">
                <Icon className="h-6 w-6 text-teal-200" />
                <p className="mt-5 text-2xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-xs leading-5 text-white/54">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 hidden items-center gap-4 lg:flex">
            <div className="relative h-44 w-px overflow-hidden bg-white/15">
              <motion.div className="absolute left-0 top-0 h-full w-full origin-top bg-teal-300" style={{ scaleY: beamScale }} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-white/45">Viewing</p>
              <p className="mt-2 font-mono text-sm text-teal-200">
                {String(activeProject + 1).padStart(2, "0")} / {String(recentProjects.length).padStart(2, "0")}
              </p>
              <p className="mt-4 max-w-[12rem] text-sm leading-6 text-white/58">{recentProjects[activeProject].name}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-7 top-8 hidden w-px bg-white/12 md:block">
            <motion.div className="absolute left-0 top-0 h-full w-full origin-top bg-amber-300" style={{ scaleY: beamScale }} />
          </div>
          {recentProjects.map((project, index) => {
            const theme = projectThemes[index % projectThemes.length];

            return (
              <motion.a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group relative mb-5 ml-0 block overflow-hidden p-px shadow-[0_28px_100px_rgba(0,0,0,0.28)] md:ml-16"
                initial={{ opacity: 1, x: 0, rotateX: 0, filter: "blur(0px)" }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.36, margin: "-12% 0px -12% 0px" }}
                transition={{ duration: 0.72, delay: Math.min(index * 0.03, 0.18), ease: [0.22, 1, 0.36, 1] }}
                onViewportEnter={() => setActiveProject(index)}
                whileHover={{ y: -8, scale: 1.015 }}
              >
                <span
                  className="absolute -left-[4.55rem] top-8 hidden h-12 w-12 place-items-center rounded-full border bg-[#071016] font-mono text-sm md:grid"
                  style={{ borderColor: theme.border, color: theme.border, boxShadow: `0 0 34px ${theme.border}55` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -inset-64 opacity-0 transition duration-500 group-hover:animate-spin group-hover:opacity-100"
                  style={{
                    background: `conic-gradient(from 180deg, transparent 0deg, ${theme.border} 90deg, transparent 180deg, ${theme.border} 270deg, transparent 360deg)`,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-px border border-white/10 bg-[#0b141b] transition duration-500 group-hover:border-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${theme.border}18, rgba(7,16,22,0.98) 34%, rgba(7,16,22,0.92)), linear-gradient(90deg, rgba(255,255,255,0.06), transparent)`,
                    clipPath: "polygon(0 0, 98% 0, 100% 14%, 97% 100%, 0 100%)",
                  }}
                />
                <span className="relative z-10 grid min-h-[190px] gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_220px] lg:items-center">
                  <span>
                    <span className="font-mono text-xs uppercase tracking-wide" style={{ color: theme.border }}>{project.type} / {project.year}</span>
                    <span className="mt-4 block text-3xl font-semibold text-white sm:text-4xl">{project.name}</span>
                    <span className="mt-5 block max-w-2xl text-base leading-7 text-white/68">{project.summary}</span>
                  </span>
                  <span className="flex items-end justify-between gap-4 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:py-3 lg:pl-7">
                    <span className="font-mono text-xs leading-6 text-white/58">{project.stack}</span>
                    <ArrowUpRight
                      className="h-7 w-7 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: theme.border }}
                    />
                  </span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PortfolioExperience() {
  useLenis();

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  const stats = useMemo(
    () => [
      ["10+", "years shipping websites and applications"],
      ["16+", "years of Full-Stack development experience"],
      ["2026", "AI automation and Full-Stack product systems"],
    ],
    [],
  );

  return (
    <main ref={container} className="relative isolate overflow-hidden bg-[#071016] text-white">
      <MagneticField />
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-teal-300" style={{ scaleX: progress }} />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#071016]/72 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4">
          <a href="#" className="font-mono text-sm uppercase text-white">ES / 2026</a>
          <div className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/68 transition hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <a
            href="mailto:eric_sangcap_19@yahoo.com"
            className="inline-flex h-10 items-center gap-2 border border-white/14 px-4 text-sm text-white transition hover:border-teal-300 hover:text-teal-200"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Start a build</span>
          </a>
          <button aria-label="Open navigation" className="grid h-10 w-10 place-items-center border border-white/14 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute bottom-0 left-0 h-36 w-full bg-[#071016]" style={{ clipPath: "polygon(0 66%, 100% 15%, 100% 100%, 0 100%)" }} />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-[1180px] items-center gap-12 px-4 py-16 lg:grid-cols-[1.02fr_.98fr]">
          <div className="min-w-0">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
              Eric Sangcap
            </h1>
            <p className="mt-8 max-w-[320px] whitespace-normal text-xl leading-8 text-white/82 sm:max-w-2xl sm:text-2xl sm:leading-9">
              Full-Stack Engineer and AI Automation Specialist building Shopify, WordPress, React, Next.js, and AI Automation systems that turn business ideas into working products.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex h-[52px] items-center justify-center gap-2 bg-teal-300 px-6 text-sm font-semibold text-[#071016] transition hover:bg-white" href="/downloads/eric-sangcap-cv.pdf" download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <a className="inline-flex h-[52px] items-center justify-center gap-2 border border-white/18 px-6 text-sm font-semibold text-white transition hover:border-amber-300 hover:text-amber-200" href="/downloads/eric-sangcap-cv.docx" download>
                <FileText className="h-4 w-4" />
                Download DOC
              </a>
            </div>
            <div className="mt-11 grid max-w-2xl grid-cols-1 border-y border-white/12 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={value} className="border-b border-white/12 py-5 pr-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="font-mono text-2xl text-teal-200">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-white/58">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] min-w-0">
            <motion.div
              className="absolute inset-7 border border-teal-300/35"
              animate={{ rotate: [0, 2, -1, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-0 top-14 hidden h-32 w-32 border border-amber-300/70 sm:block lg:-right-8"
              animate={{ y: [0, 26, 0], rotate: [12, -8, 12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute bottom-10 left-0 z-20 max-w-[260px] border border-white/16 bg-[#071016]/80 p-4 backdrop-blur">
              <p className="font-mono text-xs uppercase text-amber-200">Current edge</p>
              <p className="mt-2 text-sm leading-6 text-white/72">Full Stack Engineer and AI automation specialist</p>
            </div>
            <div className="relative ml-auto h-[620px] w-full max-w-[540px] overflow-visible">
              <Image
                src="/images/main-es-hero.png"
                alt="Eric Sangcap portrait"
                fill
                priority
                sizes="(min-width: 1024px) 500px, 90vw"
                className="object-contain object-bottom drop-shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071016] to-transparent" />
            </div>
          </div>
        </div>
        <a href="#work" className="absolute bottom-8 left-1/2 z-20 grid h-12 w-12 -translate-x-1/2 place-items-center border border-white/18 text-white/70 transition hover:text-white">
          <ArrowDown className="h-5 w-5" />
        </a>
      </section>

      <ScrollTheater />

      <section id="stack" className="relative overflow-hidden bg-[#071016] py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1180px] px-4">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase text-teal-200">Stack</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">One developer across storefronts, apps, automations, and cloud glue.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <Reveal key={skill.title} delay={index * 0.05} className="border border-white/12 bg-white/[0.035] p-6">
                <skill.icon className="h-7 w-7 text-amber-200" />
                <h3 className="mt-8 text-xl font-semibold text-white">{skill.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/62">{skill.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            {websiteWork.map((site) => (
              <span key={site} className="border border-white/12 px-4 py-2 font-mono text-xs text-white/68">
                {site}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="proof" className="relative bg-[#f7faf7] py-24 text-[#0b1220] sm:py-32">
        <div className="mx-auto w-full max-w-[1180px] px-4">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase text-amber-700">Client Proof</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Trusted when the build has to work and keep moving.</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-teal-700" />
              +639611045475
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.06} className="bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <Quote className="h-7 w-7 text-teal-700" />
                <p className="mt-8 text-xl leading-8 text-slate-800">{item.quote}</p>
                <p className="mt-8 font-semibold text-[#0b1220]">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">{item.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="relative overflow-hidden bg-[#071016] py-24 sm:py-32">
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/12 lg:block" />
        <div className="mx-auto w-full max-w-[1180px] px-4">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase text-teal-200">Timeline</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">From enterprise web systems to fast-moving AI-enabled products.</h2>
          </Reveal>
          <div className="mt-14 space-y-4">
            {timeline.map(([year, title, detail], index) => (
              <Reveal key={year} delay={index * 0.04}>
                <div className="grid gap-4 border border-white/12 bg-white/[0.035] p-5 md:grid-cols-[160px_1fr] md:items-center">
                  <p className="font-mono text-2xl text-amber-200">{year}</p>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">{detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-teal-300 py-24 text-[#071016] sm:py-32">
        <motion.div
          aria-hidden="true"
          className="absolute inset-8 border border-[#071016]/18"
          animate={{ clipPath: ["polygon(0 0, 100% 8%, 96% 100%, 4% 92%)", "polygon(3% 10%, 96% 0, 100% 91%, 0 100%)", "polygon(0 0, 100% 8%, 96% 100%, 4% 92%)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto grid w-full max-w-[1180px] gap-10 px-4 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <Reveal>
            <h2 className="text-5xl font-semibold leading-[1.02] sm:text-7xl">Let&apos;s build the next one.</h2>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-[#071016]/72">
              Available for full-stack web builds, Shopify and WordPress systems, AI automation, React product demos, and high-conversion client work.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-3">
            <a href="mailto:eric_sangcap_19@yahoo.com" className="flex items-center justify-between border border-[#071016]/20 bg-[#071016] px-5 py-4 text-white transition hover:bg-white hover:text-[#071016]">
              <span className="inline-flex items-center gap-3"><Mail className="h-5 w-5" /> eric_sangcap_19@yahoo.com</span>
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="https://github.com/esangcap" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-[#071016]/20 bg-white px-5 py-4 text-[#071016] transition hover:bg-[#071016] hover:text-white">
              <span className="inline-flex items-center gap-3"><GitBranch className="h-5 w-5" /> github.com/esangcap</span>
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="#work" className="flex items-center justify-between border border-[#071016]/20 bg-white/50 px-5 py-4 text-[#071016] transition hover:bg-white">
              <span className="inline-flex items-center gap-3"><Workflow className="h-5 w-5" /> Review selected systems</span>
              <Sparkles className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#071016] py-8">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Eric Sangcap / Full-Stack Engineer</p>
          <p>Next.js, Tailwind CSS, motion, Lenis</p>
        </div>
      </footer>
    </main>
  );
}

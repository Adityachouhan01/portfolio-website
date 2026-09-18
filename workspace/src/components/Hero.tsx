import { ArrowDown, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { lazy, Suspense } from "react"
import { site } from "../data/site"
import { scrollToId } from "../lib/scroll"
import { SocialLinks } from "./ui/SocialLinks"

const ThreeScene = lazy(() =>
  import("./ThreeScene").then((m) => ({ default: m.ThreeScene })),
)

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative isolate min-h-dvh overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(5,8,20,0.72),transparent_58%)]" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-7rem)] w-full max-w-6xl items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            <span className="font-mono text-[11px] tracking-wide text-mist">
              {site.statusLabel}
            </span>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 font-mono text-[12px] tracking-[0.22em] text-cyan uppercase"
          >
            {site.supportingHeadline}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[2.15rem] leading-[1.12] font-semibold tracking-tight text-fog sm:text-5xl lg:text-[3.4rem]"
          >
            Engineering scalable systems{" "}
            <span className="text-gradient">from frontend to cloud.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-sm text-dim"
          >
            {site.currentRole}{" "}
            <span className="text-fog">@ {site.currentCompany}</span>
            <span className="mx-2 text-line-strong">/</span>
            {site.freelanceLabel}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("projects")}
              className="group inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-fog px-6 text-sm font-medium text-void transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(232,237,245,0.18)]"
            >
              View My Work
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex min-h-12 cursor-pointer items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fog transition-all duration-200 hover:border-cyan/40 hover:text-cyan"
            >
              Let's Talk
            </button>
          </motion.div>

          <motion.a
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href={site.resumePath}
            download
            className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm text-mist transition-colors hover:text-cyan"
          >
            Download Resume
            <ArrowDown size={14} />
          </motion.a>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-8"
          >
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[320px] sm:h-[420px] lg:h-[560px]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-line bg-ink/25 shadow-[0_0_80px_rgba(100,210,255,0.06)] backdrop-blur-[2px]">
            <Suspense
              fallback={
                <div className="h-full w-full grid-bg opacity-50" />
              }
            >
              <ThreeScene />
            </Suspense>
          </div>
          <p className="pointer-events-none absolute bottom-4 left-4 hidden font-mono text-[10px] tracking-[0.2em] text-dim uppercase sm:block">
            Frontend → API → Containers → Kubernetes → Cloud
          </p>
        </motion.div>
      </div>
    </section>
  )
}

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  eyebrow?: string
  title?: string
  subtitle?: string
}

export function Section({
  id,
  children,
  className = "",
  eyebrow,
  title,
  subtitle,
}: SectionProps) {
  const reduce = useReducedMotion()

  return (
    <section
      id={id}
      className={`relative scroll-mt-28 px-5 py-24 sm:px-8 lg:px-12 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <motion.header
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 max-w-3xl lg:mb-16"
          >
            {eyebrow && (
              <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-fog sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
                {subtitle}
              </p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  )
}

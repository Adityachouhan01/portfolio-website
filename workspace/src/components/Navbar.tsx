import { Menu, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { navItems, site } from "../data/site"
import { useActiveSection } from "../hooks/useActiveSection"
import { scrollToId } from "../lib/scroll"

export function Navbar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-line bg-[rgba(7,9,15,0.78)] shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <button
          type="button"
          onClick={() => go("home")}
          className="cursor-pointer text-left"
        >
          <span className="block font-display text-sm font-semibold tracking-[0.18em] text-fog">
            {site.name.toUpperCase()}
          </span>
          <span className="mt-0.5 hidden font-mono text-[10px] tracking-[0.22em] text-dim sm:block">
            {site.navSubtitle}
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className={`relative cursor-pointer rounded-full px-3 py-2 font-sans text-[13px] transition-colors duration-200 ${
                    isActive ? "text-fog" : "text-mist hover:text-fog"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-pill"}
                      className="absolute inset-0 -z-10 rounded-full bg-cyan-dim"
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go("contact")}
            className="hidden cursor-pointer rounded-full border border-cyan/30 bg-cyan-dim px-4 py-2 text-sm font-medium text-cyan transition-all duration-200 hover:border-cyan/60 hover:shadow-[0_0_20px_rgba(100,210,255,0.18)] sm:inline-flex"
          >
            Let's Connect
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-fog lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-line bg-[rgba(7,9,15,0.94)] backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col p-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className={`flex min-h-12 w-full cursor-pointer items-center rounded-xl px-4 text-left text-base ${
                      active === item.id ? "text-cyan" : "text-fog"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="min-h-12 w-full cursor-pointer rounded-xl border border-cyan/30 bg-cyan-dim px-4 text-cyan"
                >
                  Let's Connect
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

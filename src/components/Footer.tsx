import { site, navItems } from "../data/site"
import { scrollToId } from "../lib/scroll"
import { SocialLinks } from "./ui/SocialLinks"

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg tracking-[0.12em] text-fog">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-mist">{site.role}</p>
            {site.openToFreelance && (
              <p className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                {site.footerStatus}
              </p>
            )}
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="min-h-11 cursor-pointer text-sm text-mist hover:text-fog"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <SocialLinks />
          <p className="text-xs text-dim">
            © 2026 {site.name}. Built with React, Tailwind & Three.js.
          </p>
        </div>
      </div>
    </footer>
  )
}

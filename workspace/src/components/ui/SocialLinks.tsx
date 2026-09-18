import { Github, Linkedin, Mail } from "lucide-react"
import { site } from "../../data/site"

const links = [
  { href: site.github, label: "GitHub", Icon: Github, external: true },
  { href: site.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
] as const

type SocialLinksProps = {
  className?: string
  size?: number
}

export function SocialLinks({ className = "", size = 18 }: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-mist transition-all duration-200 hover:border-cyan/40 hover:text-cyan hover:shadow-[0_0_18px_rgba(100,210,255,0.18)] hover:scale-105"
          >
            <Icon size={size} strokeWidth={1.6} />
            <span className="pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-panel px-2 py-1 font-mono text-[10px] tracking-wide text-fog opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

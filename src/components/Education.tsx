import { education } from "../data/experience"
import { Section } from "./ui/Section"

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Foundations.">
      <article className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-display text-xl text-fog sm:text-2xl">
            {education.degree}
          </h3>
          <p className="font-mono text-xs tracking-wide text-dim">
            {education.period}
          </p>
        </div>
        <p className="mt-2 text-sm text-mist">{education.school}</p>
        <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">
          Relevant coursework
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {education.coursework.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-3 py-1.5 text-sm text-mist"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Section>
  )
}

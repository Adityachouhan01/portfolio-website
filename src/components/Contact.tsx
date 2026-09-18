import { Github, Linkedin, Mail, Send } from "lucide-react"
import { useState, type FormEvent } from "react"
import { site } from "../data/site"
import { Section } from "./ui/Section"

type FormState = {
  name: string
  email: string
  message: string
}

const empty: FormState = { name: "", email: "", message: "" }

export function Contact() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const next: Partial<FormState> = {}
    if (!form.name.trim()) next.name = "Name is required."
    if (!form.email.trim()) next.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email."
    if (!form.message.trim()) next.message = "Message is required."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something useful."
      subtitle="Have a project, idea, or technical challenge? Let's talk."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <a
            href={`mailto:${site.email}`}
            className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-panel/40 px-4 text-sm text-fog transition-colors hover:border-cyan/30 hover:text-cyan"
          >
            <Mail size={18} />
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-panel/40 px-4 text-sm text-fog transition-colors hover:border-cyan/30 hover:text-cyan"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-panel/40 px-4 text-sm text-fog transition-colors hover:border-cyan/30 hover:text-cyan"
          >
            <Github size={18} />
            GitHub
          </a>
          <p className="pt-3 text-sm text-dim">
            Prefer email? Reach me directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-mist underline decoration-line underline-offset-4 hover:text-cyan"
            >
              {site.email}
            </a>
            .
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-3xl border border-line bg-panel/40 p-5 sm:p-7"
        >
          {submitted ? (
            <div role="status" className="py-8 text-center">
              <p className="font-display text-xl text-fog">Form captured locally.</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                No email backend is connected yet. Copy your message and send it
                directly to{" "}
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${form.name}`)}&body=${encodeURIComponent(form.message)}`}
                  className="text-cyan underline underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setForm(empty)
                }}
                className="mt-6 cursor-pointer text-sm text-mist hover:text-fog"
              >
                Write another message
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  value={form.name}
                  error={errors.name}
                  autoComplete="name"
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  autoComplete="email"
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="mb-2 block text-sm text-mist">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full resize-y rounded-xl border border-line bg-ink px-4 py-3 text-sm text-fog outline-none transition-colors focus:border-cyan/40"
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-fog px-6 text-sm font-medium text-void transition-transform duration-200 hover:scale-[1.02]"
              >
                Send Message
                <Send size={14} />
              </button>
              <p className="mt-3 text-xs text-dim">
                Frontend-ready. Connect an email service later — this form does
                not send mail on its own.
              </p>
            </>
          )}
        </form>
      </div>
    </Section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-mist">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-12 w-full rounded-xl border border-line bg-ink px-4 text-sm text-fog outline-none transition-colors focus:border-cyan/40"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

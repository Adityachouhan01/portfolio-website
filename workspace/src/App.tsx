import { lazy, Suspense } from "react"
import { About } from "./components/About"
import { Architecture } from "./components/Architecture"
import { Certifications } from "./components/Certifications"
import { Contact } from "./components/Contact"
import { Education } from "./components/Education"
import { Experience } from "./components/Experience"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { Navbar } from "./components/Navbar"
import { Projects } from "./components/Projects"
import { Services } from "./components/Services"
import { Skills } from "./components/Skills"

const SpaceBackground = lazy(() =>
  import("./components/SpaceBackground").then((m) => ({
    default: m.SpaceBackground,
  })),
)

export default function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fog focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Architecture />
        <Projects />
        <Services />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import { navItems, type NavId } from "../data/site"

export function useActiveSection() {
  const [active, setActive] = useState<NavId>("home")

  useEffect(() => {
    const ids = navItems.map((item) => item.id)
    const observers: IntersectionObserver[] = []

    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) {
        setActive(visible.target.id as NavId)
      }
    }

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(callback, {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5],
      })
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}

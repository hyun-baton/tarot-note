"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV = [
  { href: "/new", label: "기록하기" },
  { href: "/", label: "모아보기" },
  { href: "/calendar", label: "달력" },
  { href: "/cards", label: "도감" },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex max-w-2xl items-center gap-6 px-4 py-3">
        <span className="mr-auto text-sm font-bold text-foreground">타로 노트</span>
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "text-sm font-semibold text-primary border-b-2 border-primary pb-0.5"
                  : "text-sm text-muted-foreground hover:text-foreground transition-colors"
              }
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

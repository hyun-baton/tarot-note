"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/new", label: "기록하기" },
  { href: "/", label: "모아보기" },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
        <Link href="/" className="mr-auto text-sm font-bold text-foreground">
          타로 노트
        </Link>
        {TABS.map((item) => {
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
        <Link
          href="/new"
          className="ml-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          + 새 기록
        </Link>
      </div>
    </nav>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// 컴팩트 달력 — 기록 있는 날만 강조(다른 컬러). 클릭하면 그 날 기록으로 이동.
type Props = { marks: Record<string, string> } // "YYYY-MM-DD" → readingId

const DAYS = ["일", "월", "화", "수", "목", "금", "토"]

export function MiniCalendar({ marks }: Props) {
  const router = useRouter()
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="이전 달"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-foreground">{year}.{String(month + 1).padStart(2, "0")}</span>
        <button
          onClick={nextMonth}
          className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-center">
        {DAYS.map((d, i) => (
          <div key={d} className={`pb-1 text-[10px] font-medium ${i === 0 ? "text-destructive/70" : "text-muted-foreground"}`}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="h-8" />
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const readingId = marks[dateStr]
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

          return (
            <div key={i} className="flex h-8 items-center justify-center">
              {readingId ? (
                <button
                  onClick={() => router.push(`/readings/${readingId}`)}
                  className={`flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground transition-transform hover:scale-110 ${
                    isToday ? "ring-2 ring-primary/40 ring-offset-1 ring-offset-card" : ""
                  }`}
                  title={`${day}일 기록 보기`}
                >
                  {day}
                </button>
              ) : (
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    isToday ? "font-bold text-primary ring-1 ring-primary/40" : "text-muted-foreground"
                  }`}
                >
                  {day}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
        기록이 있는 날
      </div>
    </div>
  )
}

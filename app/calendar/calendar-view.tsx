"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Reading } from "@/lib/types"

type Props = { readings: Pick<Reading, "id" | "reading_date" | "card_name" | "card_image_url">[] }

const DAYS = ["일", "월", "화", "수", "목", "금", "토"]
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

export function CalendarView({ readings }: Props) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  // Build a map: "YYYY-MM-DD" → reading
  const byDate: Record<string, typeof readings[0]> = {}
  readings.forEach((r) => {
    byDate[r.reading_date] = r
  })

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

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded-lg px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
          ‹ 이전
        </button>
        <span className="font-semibold">{year}년 {MONTHS[month]}</span>
        <button onClick={nextMonth} className="rounded-lg px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
          다음 ›
        </button>
      </div>

      {/* Day labels */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-xs font-medium text-muted-foreground">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const reading = byDate[dateStr]
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

          return (
            <div key={i} className="relative">
              {reading ? (
                <Link
                  href={`/readings/${reading.id}`}
                  className="flex flex-col items-center rounded-lg border border-primary/30 bg-card p-1 hover:border-primary transition-colors"
                >
                  <div className="relative h-10 w-full overflow-hidden rounded">
                    <Image src={reading.card_image_url} alt={reading.card_name} fill className="object-cover" sizes="60px" unoptimized />
                  </div>
                  <span className={`mt-0.5 text-[11px] font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
                </Link>
              ) : (
                <div className={`flex h-14 flex-col items-center justify-start rounded-lg p-1 ${isToday ? "bg-primary/10" : ""}`}>
                  <span className={`text-[11px] ${isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>{day}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CARD_BY_NAME } from "@/lib/cards"
import { Reading } from "@/lib/types"

type ReadingCell = Pick<Reading, "id" | "reading_date" | "card_name" | "card_image_url">
type Props = { readings: ReadingCell[] }

const DAYS = ["일", "월", "화", "수", "목", "금", "토"]
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

function cardImage(r: ReadingCell) {
  return CARD_BY_NAME[r.card_name.split(" / ")[0]]?.imageUrl ?? r.card_image_url
}

export function CalendarView({ readings }: Props) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  // Build a map: "YYYY-MM-DD" → reading (latest record for the day wins)
  const byDate: Record<string, ReadingCell> = {}
  readings.forEach((r) => {
    if (!byDate[r.reading_date]) byDate[r.reading_date] = r
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

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          ‹ 이전
        </button>
        <span className="text-base font-semibold text-foreground">{year}년 {MONTHS[month]}</span>
        <button
          onClick={nextMonth}
          className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          다음 ›
        </button>
      </div>

      {/* Day labels */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`py-1.5 text-xs font-medium ${i === 0 ? "text-destructive/70" : "text-muted-foreground"}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const reading = byDate[dateStr]
          const isToday =
            day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

          if (reading) {
            return (
              <Link
                key={i}
                href={`/readings/${reading.id}`}
                className="group flex aspect-[3/4] flex-col items-center overflow-hidden rounded-lg border border-primary/40 bg-muted/40 p-1 transition-all hover:border-primary hover:shadow-sm"
                title={`${day}일 · ${reading.card_name}`}
              >
                <div className="relative w-full flex-1 overflow-hidden rounded">
                  <Image
                    src={cardImage(reading)}
                    alt={reading.card_name}
                    fill
                    className="object-cover scale-[1.08]"
                    sizes="60px"
                    unoptimized
                  />
                </div>
                <span className={`mt-0.5 text-[11px] font-semibold ${isToday ? "text-primary" : "text-foreground"}`}>
                  {day}
                </span>
              </Link>
            )
          }

          return (
            <div
              key={i}
              className={`flex aspect-[3/4] items-start justify-center rounded-lg p-1 ${isToday ? "bg-primary/10" : ""}`}
            >
              <span className={`text-[11px] ${isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

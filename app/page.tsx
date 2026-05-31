import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { CARD_BY_NAME } from "@/lib/cards"
import { Reading } from "@/lib/types"
import { MiniCalendar } from "@/components/mini-calendar"

export const revalidate = 0

function formatDate(dateStr: string) {
  return dateStr.replace(/-/g, ".")
}

type Row = Pick<
  Reading,
  "id" | "reading_date" | "card_name" | "card_image_url" | "question" | "spread_name" | "cards"
>

function coverImage(r: Row) {
  return CARD_BY_NAME[r.card_name.split(" / ")[0]]?.imageUrl ?? r.card_image_url
}

export default async function Page() {
  const { data, error } = await supabase
    .from("readings")
    .select("id, reading_date, card_name, card_image_url, question, spread_name, cards")
    .order("reading_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="py-12 text-center text-sm text-destructive">
        기록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </div>
    )
  }

  const list = (data as Row[]) ?? []

  // 달력 표시용: 날짜 → 그 날의 (가장 최근) 기록 id
  const marks: Record<string, string> = {}
  list.forEach((r) => {
    if (!marks[r.reading_date]) marks[r.reading_date] = r.id
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">나의 성찰 기록</h1>
        <p className="mt-1 text-sm text-muted-foreground">카드를 통해 마음의 울림을 기록해보세요.</p>
      </div>

      <div className="md:flex md:gap-6 md:items-start">
        {/* 사이드: 작은 달력 (모바일은 위, 데스크탑은 오른쪽) */}
        <aside className="order-first mb-6 md:order-last md:mb-0 md:w-64 md:shrink-0">
          <MiniCalendar marks={marks} />
        </aside>

        {/* 메인: 리스트 */}
        <div className="flex-1">
          {list.length === 0 ? (
            <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              아직 기록이 없어요.{" "}
              <Link href="/new" className="font-medium text-primary hover:underline">
                첫 기록
              </Link>
              을 남겨보세요.
            </p>
          ) : (
            <ul className="space-y-3">
              {list.map((r) => {
                const count = Array.isArray(r.cards) ? r.cards.length : 0
                const isSpread = count > 1
                const title = isSpread
                  ? `${r.spread_name ?? "스프레드"} · ${count}장`
                  : r.card_name
                return (
                  <li key={r.id}>
                    <Link
                      href={`/readings/${r.id}`}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={coverImage(r)}
                          alt={r.card_name}
                          fill
                          className="object-cover scale-[1.08]"
                          sizes="56px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">{formatDate(r.reading_date)}</p>
                        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
                        {r.question && (
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.question}</p>
                        )}
                      </div>
                      <span className="shrink-0 text-muted-foreground">›</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

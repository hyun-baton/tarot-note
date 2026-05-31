import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { CARD_BY_NAME } from "@/lib/cards"
import { Reading, Review } from "@/lib/types"
import { SpreadView } from "@/components/spread-view"
import { ReviewForm } from "./review-form"
import { DeleteButton } from "./delete-button"

export const revalidate = 0

function formatDate(dateStr: string) {
  return dateStr.replace(/-/g, ".")
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [{ data: reading, error: rErr }, { data: reviews }] = await Promise.all([
    supabase.from("readings").select("*").eq("id", id).single(),
    supabase.from("reviews").select("*").eq("reading_id", id).order("reviewed_at", { ascending: true }),
  ])

  if (rErr || !reading) return notFound()

  const r = reading as Reading
  const revList = (reviews as Review[]) ?? []
  const cardImageUrl = CARD_BY_NAME[r.card_name.split(" / ")[0]]?.imageUrl ?? r.card_image_url
  const spreadCards = Array.isArray(r.cards) ? r.cards : []
  const isSpread = spreadCards.length > 1

  const content = (
    <>
      {/* 질문 / 상황 */}
      {r.question && (
        <section className="mb-4 rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-sm font-semibold text-foreground">🔮 질문 / 상황</p>
          <p className="whitespace-pre-wrap text-sm text-foreground/80">{r.question}</p>
        </section>
      )}

      {/* 해석 및 메모 */}
      {r.interpretation && (
        <section className="mb-4 rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-sm font-semibold text-foreground">📖 해석 및 메모</p>
          <p className="whitespace-pre-wrap text-sm text-foreground/80">{r.interpretation}</p>
        </section>
      )}

      {/* 리뷰 */}
      <section className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">💬 리뷰</p>

        {revList.length === 0 ? (
          <p className="mb-3 text-sm text-muted-foreground">
            지금 되돌아보고 코멘트를 남겨보세요.
          </p>
        ) : (
          <ul className="mb-4 space-y-3">
            {revList.map((rev) => (
              <li key={rev.id} className="rounded-lg bg-muted/60 p-3">
                <p className="whitespace-pre-wrap text-sm text-foreground">{rev.review_text}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(rev.reviewed_at).toLocaleDateString("ko-KR")}
                </p>
              </li>
            ))}
          </ul>
        )}

        <ReviewForm readingId={id} />
      </section>
    </>
  )

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← 성찰 기록
        </Link>
        <DeleteButton readingId={id} />
      </div>

      {/* 스프레드(여러 장)는 상단 전체폭 캔버스, 단일 카드는 좌우 2단 */}
      {isSpread ? (
        <>
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
              <h1 className="text-base font-bold text-foreground">
                {r.spread_name ?? "스프레드"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {formatDate(r.reading_date)} · {spreadCards.length}장
              </p>
            </div>
            <SpreadView cards={spreadCards} />
          </div>
          {content}
        </>
      ) : (
        <div className="md:flex md:gap-10 md:items-start">
          {/* 왼쪽: 카드 이미지 + 이름 */}
          <div className="mb-6 md:mb-0 md:w-48 md:shrink-0">
            <div className="relative mx-auto aspect-[2/3] w-48 md:w-full overflow-hidden rounded-xl shadow-md">
              {cardImageUrl ? (
                <Image
                  src={cardImageUrl}
                  alt={r.card_name}
                  fill
                  className="object-cover scale-[1.08]"
                  sizes="(max-width: 768px) 192px, 200px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                  이미지 없음
                </div>
              )}
            </div>
            <div className="mt-3 text-center md:text-left">
              <p className="text-xs text-muted-foreground">{formatDate(r.reading_date)}</p>
              <h1 className="mt-0.5 text-base font-bold text-foreground">{r.card_name}</h1>
            </div>
          </div>

          {/* 오른쪽: 내용 */}
          <div className="flex-1">{content}</div>
        </div>
      )}
    </div>
  )
}

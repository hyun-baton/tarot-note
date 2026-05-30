import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Reading, Review } from "@/lib/types"
import { ReviewForm } from "./review-form"

export const revalidate = 0

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [{ data: reading, error: rErr }, { data: reviews, error: revErr }] = await Promise.all([
    supabase.from("readings").select("*").eq("id", id).single(),
    supabase.from("reviews").select("*").eq("reading_id", id).order("reviewed_at", { ascending: true }),
  ])

  if (rErr || !reading) return notFound()

  const r = reading as Reading
  const revList = (reviews as Review[]) ?? []

  return (
    <div>
      {/* 뒤로가기 */}
      <Link href="/" className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← 목록으로
      </Link>

      {/* 카드 이미지 (1순위) */}
      <div className="relative mx-auto mb-5 h-72 w-48">
        {r.card_image_url ? (
          <Image
            src={r.card_image_url}
            alt={r.card_name}
            fill
            className="rounded-xl object-cover shadow-md"
            sizes="192px"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
            이미지 없음
          </div>
        )}
      </div>

      {/* 카드 이름 + 날짜 */}
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold">{r.card_name}</h1>
        <p className="text-sm text-muted-foreground">{r.reading_date}</p>
      </div>

      {/* 질문 */}
      {r.question && (
        <section className="mb-4 rounded-xl border border-border bg-card p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">질문 / 상황</p>
          <p className="whitespace-pre-wrap text-sm text-foreground">{r.question}</p>
        </section>
      )}

      {/* 해석 */}
      {r.interpretation && (
        <section className="mb-6 rounded-xl border border-border bg-card p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">해석 / 메모</p>
          <p className="whitespace-pre-wrap text-sm text-foreground">{r.interpretation}</p>
        </section>
      )}

      {/* 리뷰 */}
      <section className="border-t border-border pt-5">
        <h2 className="mb-3 text-sm font-semibold">리뷰</h2>
        {revList.length === 0 ? (
          <p className="mb-3 text-sm text-muted-foreground">지금 되돌아보고 코멘트를 남겨보세요.</p>
        ) : (
          <ul className="mb-4 space-y-3">
            {revList.map((rev) => (
              <li key={rev.id} className="rounded-xl border border-border bg-card p-3">
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
    </div>
  )
}

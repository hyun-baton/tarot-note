import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Reading } from "@/lib/types"

export const revalidate = 0

export default async function Page() {
  const { data: readings, error } = await supabase
    .from("readings")
    .select("*")
    .order("reading_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="py-12 text-center text-sm text-destructive">
        기록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </div>
    )
  }

  if (!readings || readings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg font-medium text-foreground">첫 기록을 남겨볼까요?</p>
        <p className="text-sm text-muted-foreground">오늘 뽑은 타로 카드와 생각을 기록해 보세요.</p>
        <Link href="/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors">
          기록하기
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">나의 성찰 기록</h1>
        <Link href="/new" className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors">
          + 새 기록
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(readings as Reading[]).map((r) => (
          <Link
            key={r.id}
            href={`/readings/${r.id}`}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[2/3] w-full bg-muted">
              {r.card_image_url ? (
                <Image
                  src={r.card_image_url}
                  alt={r.card_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  이미지 없음
                </div>
              )}
            </div>
            <div className="p-2">
              <p className="truncate text-sm font-medium text-foreground">{r.card_name}</p>
              <p className="text-xs text-muted-foreground">{r.reading_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

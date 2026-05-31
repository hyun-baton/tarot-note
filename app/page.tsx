import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Reading } from "@/lib/types"
import { CalendarView } from "@/components/calendar-view"

export const revalidate = 0

export default async function Page() {
  const { data: readings, error } = await supabase
    .from("readings")
    .select("id, reading_date, card_name, card_image_url")
    .order("reading_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="py-12 text-center text-sm text-destructive">
        기록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </div>
    )
  }

  const list =
    (readings as Pick<Reading, "id" | "reading_date" | "card_name" | "card_image_url">[]) ?? []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">나의 성찰 기록</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          카드를 통해 마음의 울림을 기록해보세요. 기록한 날엔 카드가 표시됩니다.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {list.length === 0 && (
          <p className="mb-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            아직 기록이 없어요.{" "}
            <Link href="/new" className="font-medium text-primary hover:underline">
              첫 기록
            </Link>
            을 남기면 달력에 카드가 표시됩니다.
          </p>
        )}

        <CalendarView readings={list} />
      </div>
    </div>
  )
}

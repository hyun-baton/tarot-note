import { supabase } from "@/lib/supabase"
import { Reading } from "@/lib/types"
import { CalendarView } from "./calendar-view"

export const revalidate = 0

export default async function Page() {
  const { data: readings, error } = await supabase
    .from("readings")
    .select("id, reading_date, card_name, card_image_url")
    .order("reading_date", { ascending: false })

  if (error) {
    return (
      <div className="py-12 text-center text-sm text-destructive">
        기록을 불러오지 못했어요.
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold">달력</h1>
      <CalendarView readings={(readings as Pick<Reading, "id" | "reading_date" | "card_name" | "card_image_url">[]) ?? []} />
    </div>
  )
}

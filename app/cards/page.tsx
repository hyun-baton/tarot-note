import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { TAROT_CARDS } from "@/lib/cards"
import { Reading } from "@/lib/types"

export const revalidate = 0

export default async function Page() {
  const { data: readings } = await supabase
    .from("readings")
    .select("id, card_name")

  // Extract base card names (before " / ")
  const recordedNames = new Set(
    (readings as Pick<Reading, "id" | "card_name">[] ?? []).map((r) => r.card_name.split(" / ")[0])
  )

  const SUITS: Record<string, string> = {
    ar: "메이저 아르카나", wa: "완드", cu: "컵", sw: "소드", pe: "펜타클",
  }
  const suits = ["ar", "wa", "cu", "sw", "pe"]

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold">카드 도감</h1>
      <p className="mb-6 text-sm text-muted-foreground">기록한 카드는 강조 표시됩니다.</p>

      {suits.map((suit) => {
        const cards = TAROT_CARDS.filter((c) => c.id.startsWith(suit))
        return (
          <section key={suit} className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{SUITS[suit]}</h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {cards.map((card) => {
                const recorded = recordedNames.has(card.name)
                const reading = (readings as any[] ?? []).find((r: any) => r.card_name.startsWith(card.name))
                const content = (
                  <div
                    className={`overflow-hidden rounded-xl border transition-all ${
                      recorded ? "border-primary shadow-sm" : "border-border opacity-60"
                    }`}
                  >
                    <div className="relative aspect-[2/3] w-full bg-muted">
                      <Image src={card.imageUrl} alt={card.name} fill className="object-cover" sizes="80px" unoptimized />
                    </div>
                    <div className="p-1.5">
                      <p className="truncate text-center text-[10px] font-medium text-foreground">{card.nameKo}</p>
                      {recorded && <p className="text-center text-[9px] text-primary">기록 있음</p>}
                    </div>
                  </div>
                )
                return recorded && reading ? (
                  <Link key={card.id} href={`/readings/${reading.id}`}>{content}</Link>
                ) : (
                  <div key={card.id}>{content}</div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

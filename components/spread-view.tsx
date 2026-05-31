import Image from "next/image"
import { CARD_BY_NAME } from "@/lib/cards"
import { SpreadCard } from "@/lib/types"

// 읽기 전용 스프레드 표시 — 저장된 x/y 위치 그대로 카드를 배치한다.
export function SpreadView({ cards }: { cards: SpreadCard[] }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-border bg-muted/40"
      style={{ aspectRatio: "4 / 3" }}
    >
      {cards.map((c, i) => {
        const src = CARD_BY_NAME[c.name]?.imageUrl ?? c.imageUrl
        return (
          <div
            key={i}
            className="absolute"
            style={{ left: `${c.x}%`, top: `${c.y}%`, width: "10%", transform: "translate(-50%, -50%)" }}
            title={`${i + 1}. ${c.nameKo}`}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: "2 / 3" }}>
              <Image src={src} alt={c.name} fill className="object-cover" sizes="80px" unoptimized />
              <span className="absolute left-0.5 top-0.5 rounded bg-foreground/70 px-1 text-[10px] font-bold text-background">
                {i + 1}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

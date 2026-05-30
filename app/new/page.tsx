"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { TAROT_CARDS, TarotCard } from "@/lib/cards"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const SUITS = ["메이저 아르카나", "완드", "컵", "소드", "펜타클"]

function getSuit(card: TarotCard): string {
  if (card.id.startsWith("ar")) return "메이저 아르카나"
  if (card.id.startsWith("wa")) return "완드"
  if (card.id.startsWith("cu")) return "컵"
  if (card.id.startsWith("sw")) return "소드"
  return "펜타클"
}

export default function NewPage() {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const [question, setQuestion] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [filterSuit, setFilterSuit] = useState("전체")

  const filtered = filterSuit === "전체" ? TAROT_CARDS : TAROT_CARDS.filter((c) => getSuit(c) === filterSuit)

  async function handleSave() {
    if (!selectedCard) {
      setError("카드를 선택해주세요.")
      return
    }
    setSaving(true)
    setError("")
    const { error: err } = await supabase.from("readings").insert({
      card_name: `${selectedCard.name} / ${selectedCard.nameKo}`,
      card_image_url: selectedCard.imageUrl,
      reading_date: date,
      question: question || null,
      interpretation: interpretation || null,
    })
    setSaving(false)
    if (err) {
      setError("저장에 실패했어요. 다시 시도해주세요.")
      return
    }
    router.push("/")
    router.refresh()
  }

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold">오늘의 기록</h1>

      {/* 카드 선택 */}
      <div className="mb-4">
        <Label className="mb-2 block text-sm font-medium">카드 선택</Label>

        {/* suit filter */}
        <div className="mb-3 flex flex-wrap gap-2">
          {["전체", ...SUITS].map((s) => (
            <button
              key={s}
              onClick={() => setFilterSuit(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filterSuit === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* selected card preview */}
        {selectedCard && (
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-primary bg-card p-3">
            <div className="relative h-16 w-10 shrink-0">
              <Image src={selectedCard.imageUrl} alt={selectedCard.name} fill className="rounded object-cover" sizes="40px" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{selectedCard.name}</p>
              <p className="text-xs text-muted-foreground">{selectedCard.nameKo}</p>
            </div>
          </div>
        )}

        {/* card grid */}
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {filtered.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`overflow-hidden rounded-lg border transition-all ${
                selectedCard?.id === card.id
                  ? "border-primary ring-2 ring-primary"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="relative aspect-[2/3] w-full bg-muted">
                <Image src={card.imageUrl} alt={card.name} fill className="object-cover" sizes="80px" unoptimized />
              </div>
              <p className="truncate px-1 py-0.5 text-center text-[10px] text-muted-foreground">{card.nameKo}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 날짜 */}
      <div className="mb-4">
        <Label htmlFor="date" className="mb-1 block text-sm font-medium">날짜</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full" />
      </div>

      {/* 질문 */}
      <div className="mb-4">
        <Label htmlFor="question" className="mb-1 block text-sm font-medium">오늘의 질문 또는 상황</Label>
        <Textarea
          id="question"
          placeholder="어떤 마음으로 카드를 뽑았나요?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
        />
      </div>

      {/* 해석 */}
      <div className="mb-6">
        <Label htmlFor="interpretation" className="mb-1 block text-sm font-medium">해석 / 메모</Label>
        <Textarea
          id="interpretation"
          placeholder="카드가 어떤 메시지를 전했나요?"
          value={interpretation}
          onChange={(e) => setInterpretation(e.target.value)}
          rows={4}
        />
      </div>

      {error && <p className="mb-3 text-sm text-destructive">{error}</p>}

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? "저장 중..." : "저장하기"}
      </Button>
    </div>
  )
}

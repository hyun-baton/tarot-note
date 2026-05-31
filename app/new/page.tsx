"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { SpreadCard } from "@/lib/types"
import { SpreadEditor } from "@/components/spread-editor"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function NewPage() {
  const router = useRouter()
  const [cards, setCards] = useState<SpreadCard[]>([])
  const [spreadName, setSpreadName] = useState("데일리")
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const [question, setQuestion] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleEditorChange = useCallback(
    (v: { cards: SpreadCard[]; templateId: string; spreadName: string }) => {
      setCards(v.cards)
      setSpreadName(v.spreadName)
    },
    []
  )

  async function handleSave() {
    if (cards.length === 0) {
      setError("카드를 한 장 이상 추가해주세요.")
      return
    }
    setSaving(true)
    setError("")
    const cover = cards[0]
    const { error: err } = await supabase.from("readings").insert({
      card_name: `${cover.name} / ${cover.nameKo}`,
      card_image_url: cover.imageUrl,
      reading_date: date,
      question: question || null,
      interpretation: interpretation || null,
      cards,
      spread_name: spreadName,
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
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">오늘의 기록</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          스프레드를 고르고 카드를 배치한 뒤, 오늘의 생각을 남겨보세요.
        </p>
      </div>

      {/* 카드 스프레드 */}
      <div className="mb-6">
        <Label className="mb-2 block text-sm font-medium">카드 배치</Label>
        <SpreadEditor onChange={handleEditorChange} />
      </div>

      {/* 날짜 */}
      <div className="mb-4">
        <Label htmlFor="date" className="mb-1.5 block text-sm font-medium">날짜</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full" />
      </div>

      {/* 질문 */}
      <div className="mb-4">
        <Label htmlFor="question" className="mb-1.5 block text-sm font-medium">오늘의 질문 또는 상황</Label>
        <Textarea
          id="question"
          placeholder="어떤 고민이 있으신가요?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
        />
      </div>

      {/* 해석 (스프레드 전체) */}
      <div className="mb-6">
        <Label htmlFor="interpretation" className="mb-1.5 block text-sm font-medium">해석 / 메모</Label>
        <Textarea
          id="interpretation"
          placeholder="스프레드 전체를 종합한 메시지를 자유롭게 기록해 보세요."
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

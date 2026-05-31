"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { TAROT_CARDS, TarotCard } from "@/lib/cards"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function NewPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const [question, setQuestion] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const matches = query.trim()
    ? TAROT_CARDS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.nameKo.includes(query)
      ).slice(0, 8)
    : []

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setShowDropdown(true)
    if (!e.target.value.trim()) setSelectedCard(null)
  }

  function selectCard(card: TarotCard) {
    setSelectedCard(card)
    setQuery(`${card.name} / ${card.nameKo}`)
    setShowDropdown(false)
    setError("")
  }

  function clearCard() {
    setSelectedCard(null)
    setQuery("")
    inputRef.current?.focus()
  }

  async function handleSave() {
    if (!selectedCard) {
      setError("카드를 선택해주세요.")
      inputRef.current?.focus()
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
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">오늘의 기록</h1>
        <p className="mt-1 text-sm text-muted-foreground">선택한 카드와 오늘의 생각을 남겨보세요.</p>
      </div>

      {/* 카드 검색 */}
      <div className="mb-6">
        <Label className="mb-2 block text-sm font-medium">카드 선택</Label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-.889 3.697 2.853 2.853-.707.707-2.853-2.853A4.5 4.5 0 1 1 9.11 10.197Z" fill="currentColor" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => query.trim() && setShowDropdown(true)}
            placeholder="카드 이름 검색... (한글 또는 영문)"
            className="w-full rounded-xl border border-input bg-card pl-9 pr-10 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              onClick={clearCard}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="m2.197 2.197 10.606 10.607-.707.707L1.49 2.904l.707-.707Zm10.606 0-.707-.707L7.5 6.793 2.904 2.197l-.707.707L6.793 7.5 2.197 12.096l.707.707L7.5 8.207l4.596 4.596.707-.707L8.207 7.5l4.596-4.596Z" fill="currentColor" />
              </svg>
            </button>
          )}

          {/* 드롭다운 */}
          {showDropdown && matches.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden"
            >
              {matches.map((card) => (
                <button
                  key={card.id}
                  onClick={() => selectCard(card)}
                  className="flex w-full items-center gap-3 px-3 py-2 hover:bg-muted transition-colors text-left"
                >
                  <div className="relative h-12 w-8 shrink-0 rounded overflow-hidden bg-muted">
                    <Image
                      src={card.imageUrl}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{card.nameKo}</p>
                    <p className="text-xs text-muted-foreground">{card.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showDropdown && query.trim() && matches.length === 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 shadow-lg text-sm text-muted-foreground"
            >
              일치하는 카드가 없어요.
            </div>
          )}
        </div>

        {/* 선택된 카드 프리뷰 */}
        {selectedCard && (
          <div className="mt-4 flex items-center gap-4 rounded-xl border border-primary/30 bg-muted/40 p-4">
            <div className="relative h-24 w-16 shrink-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">{selectedCard.nameKo}</p>
              <p className="text-sm text-muted-foreground">{selectedCard.name}</p>
            </div>
          </div>
        )}
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

      {/* 해석 */}
      <div className="mb-6">
        <Label htmlFor="interpretation" className="mb-1.5 block text-sm font-medium">해석 / 메모</Label>
        <Textarea
          id="interpretation"
          placeholder="카드의 메시지를 자유롭게 기록해 보세요."
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

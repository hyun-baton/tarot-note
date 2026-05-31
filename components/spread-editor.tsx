"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { TAROT_CARDS, TarotCard } from "@/lib/cards"
import { SpreadCard } from "@/lib/types"
import { SPREAD_TEMPLATES, SPREAD_BY_ID } from "@/lib/spreads"

const MAX_CARDS = 20
const CARD_W = "10%" // 캔버스 대비 카드 너비 — 전체 배치 시 균형

type EditorValue = { cards: SpreadCard[]; templateId: string; spreadName: string }
type Props = { onChange: (value: EditorValue) => void }

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

export function SpreadEditor({ onChange }: Props) {
  const [templateId, setTemplateId] = useState("daily")
  const [cards, setCards] = useState<SpreadCard[]>([])
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ index: number; moved: boolean } | null>(null)

  const template = SPREAD_BY_ID[templateId]
  const slots = template.slots
  const isFree = templateId === "free"
  const slotLimit = isFree ? MAX_CARDS : slots.length
  const canAdd = cards.length < slotLimit

  useEffect(() => {
    onChange({ cards, templateId, spreadName: template.name })
  }, [cards, templateId, template.name, onChange])

  const matches = query.trim()
    ? TAROT_CARDS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) || c.nameKo.includes(query)
      ).slice(0, 8)
    : []

  function switchTemplate(id: string) {
    const next = SPREAD_BY_ID[id]
    setTemplateId(id)
    setSelected(null)
    // 기존 카드를 새 템플릿 자리로 재배치 (자유 배치면 위치 유지)
    if (id === "free") return
    setCards((prev) =>
      prev.slice(0, next.slots.length).map((c, i) => ({ ...c, x: next.slots[i].x, y: next.slots[i].y }))
    )
  }

  function addCard(card: TarotCard) {
    setCards((prev) => {
      if (prev.length >= slotLimit) return prev
      const idx = prev.length
      let x = 50
      let y = 50
      if (!isFree && slots[idx]) {
        x = slots[idx].x
        y = slots[idx].y
      } else {
        // 자유 배치: 가운데부터 살짝 어긋나게 쌓기
        x = clamp(30 + (idx % 5) * 10, 6, 94)
        y = clamp(28 + Math.floor(idx / 5) * 22, 8, 92)
      }
      return [...prev, { name: card.name, nameKo: card.nameKo, imageUrl: card.imageUrl, x, y }]
    })
    setQuery("")
    setShowDropdown(false)
  }

  function removeCard(index: number) {
    setCards((prev) => prev.filter((_, i) => i !== index))
    setSelected(null)
  }

  // --- 드래그 (포인터 이벤트: 마우스 + 터치) ---
  function onPointerDown(e: React.PointerEvent, index: number) {
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragState.current = { index, moved: false }
    setSelected(index)
  }

  function onPointerMove(e: React.PointerEvent) {
    const drag = dragState.current
    const canvas = canvasRef.current
    if (!drag || !canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 6, 94)
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 8, 92)
    drag.moved = true
    setCards((prev) => prev.map((c, i) => (i === drag.index ? { ...c, x, y } : c)))
  }

  function onPointerUp(e: React.PointerEvent) {
    if (dragState.current) {
      try {
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {}
    }
    dragState.current = null
  }

  return (
    <div>
      {/* 템플릿 선택 */}
      <div className="mb-3 flex flex-wrap gap-2">
        {SPREAD_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTemplate(t.id)}
            title={t.desc}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              templateId === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        {template.desc} · 카드를 검색해 추가하고, 캔버스에서 끌어 위치를 옮기세요.
      </p>

      {/* 카드 검색 */}
      <div className="relative mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => query.trim() && setShowDropdown(true)}
          disabled={!canAdd}
          placeholder={canAdd ? "카드 이름 검색해서 추가... (한글 또는 영문)" : `최대 ${slotLimit}장까지 추가됨`}
          className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
        {showDropdown && matches.length > 0 && canAdd && (
          <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {matches.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => addCard(card)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-muted"
              >
                <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded bg-muted">
                  <Image src={card.imageUrl} alt={card.name} fill className="object-cover" sizes="32px" unoptimized />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{card.nameKo}</p>
                  <p className="text-xs text-muted-foreground">{card.name}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 캔버스 */}
      <div
        ref={canvasRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative w-full overflow-hidden rounded-xl border border-border bg-muted/40"
        style={{ aspectRatio: "4 / 3", touchAction: "none" }}
      >
        {/* 빈 자리 표시 (템플릿) */}
        {!isFree &&
          slots.map((s, i) =>
            i >= cards.length ? (
              <div
                key={`slot-${i}`}
                className="absolute flex items-center justify-center rounded-lg border-2 border-dashed border-border text-xs text-muted-foreground"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: CARD_W,
                  aspectRatio: "2 / 3",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {i + 1}
              </div>
            ) : null
          )}

        {/* 빈 자유 캔버스 안내 */}
        {isFree && cards.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            카드를 검색해 추가하세요
          </div>
        )}

        {/* 배치된 카드 */}
        {cards.map((c, i) => (
          <div
            key={i}
            onPointerDown={(e) => onPointerDown(e, i)}
            className={`group absolute cursor-grab touch-none select-none active:cursor-grabbing ${
              selected === i ? "z-10" : ""
            }`}
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: CARD_W,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`relative overflow-hidden rounded-lg shadow-md ring-2 ${
                selected === i ? "ring-primary" : "ring-transparent"
              }`}
              style={{ aspectRatio: "2 / 3" }}
            >
              <Image
                src={c.imageUrl}
                alt={c.name}
                fill
                className="pointer-events-none object-cover"
                sizes="80px"
                unoptimized
              />
              {/* 순서 번호 */}
              <span className="absolute left-0.5 top-0.5 rounded bg-foreground/70 px-1 text-[10px] font-bold text-background">
                {i + 1}
              </span>
            </div>
            {/* 삭제 버튼 (선택 시) */}
            {selected === i && (
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => removeCard(i)}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground shadow"
                aria-label="카드 삭제"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 요약 */}
      <p className="mt-2 text-xs text-muted-foreground">
        {cards.length}장 배치됨{!isFree && ` / ${slots.length}자리`}
        {selected !== null && cards[selected] && ` · 선택: ${cards[selected].nameKo}`}
      </p>
    </div>
  )
}

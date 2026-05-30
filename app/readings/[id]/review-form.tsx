"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReviewForm({ readingId }: { readingId: string }) {
  const router = useRouter()
  const [text, setText] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleAdd() {
    if (!text.trim()) return
    setSaving(true)
    setError("")
    const { error: err } = await supabase.from("reviews").insert({
      reading_id: readingId,
      review_text: text.trim(),
    })
    setSaving(false)
    if (err) {
      setError("저장에 실패했어요.")
      return
    }
    setText("")
    router.refresh()
  }

  return (
    <div>
      <Textarea
        placeholder="지금 다시 보니 어떤 생각이 드나요?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mb-2"
      />
      {error && <p className="mb-2 text-xs text-destructive">{error}</p>}
      <Button onClick={handleAdd} disabled={saving || !text.trim()} size="sm">
        {saving ? "추가 중..." : "리뷰 추가"}
      </Button>
    </div>
  )
}

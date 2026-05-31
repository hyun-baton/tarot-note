"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function DeleteButton({ readingId }: { readingId: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    await supabase.from("reviews").delete().eq("reading_id", readingId)
    await supabase.from("readings").delete().eq("id", readingId)
    router.push("/")
    router.refresh()
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">정말 삭제할까요?</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs font-medium text-destructive hover:underline disabled:opacity-50"
        >
          {deleting ? "삭제 중..." : "삭제"}
        </button>
        <button onClick={() => setConfirm(false)} className="text-xs text-muted-foreground hover:underline">
          취소
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="text-xs text-muted-foreground hover:text-destructive transition-colors"
    >
      기록 삭제
    </button>
  )
}

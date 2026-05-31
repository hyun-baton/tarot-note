export interface SpreadCard {
  name: string
  nameKo: string
  imageUrl: string
  x: number // 캔버스 기준 카드 중심 X 백분율 (0~100)
  y: number // 캔버스 기준 카드 중심 Y 백분율 (0~100)
}

export interface Reading {
  id: string
  card_name: string
  card_image_url: string
  reading_date: string
  question: string | null
  interpretation: string | null
  created_at: string
  cards: SpreadCard[]
  spread_name: string | null
}

export interface Review {
  id: string
  reading_id: string
  review_text: string
  reviewed_at: string
}

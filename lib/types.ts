export interface Reading {
  id: string
  card_name: string
  card_image_url: string
  reading_date: string
  question: string | null
  interpretation: string | null
  created_at: string
}

export interface Review {
  id: string
  reading_id: string
  review_text: string
  reviewed_at: string
}

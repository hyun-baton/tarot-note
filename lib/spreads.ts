// 스프레드 템플릿 — 각 자리는 캔버스 기준 카드 중심의 백분율 좌표(x,y).
// 캔버스 비율은 4:3(가로:세로) 기준으로 좌표를 잡는다.
export interface SpreadSlot {
  x: number
  y: number
}

export interface SpreadTemplate {
  id: string
  name: string
  desc: string
  slots: SpreadSlot[] // 빈 배열이면 자유 배치
}

export const SPREAD_TEMPLATES: SpreadTemplate[] = [
  {
    id: "daily",
    name: "데일리",
    desc: "오늘의 카드 1장",
    slots: [{ x: 50, y: 50 }],
  },
  {
    id: "three",
    name: "쓰리 카드",
    desc: "과거·현재·미래 3장",
    slots: [
      { x: 22, y: 50 },
      { x: 50, y: 50 },
      { x: 78, y: 50 },
    ],
  },
  {
    id: "cross5",
    name: "파이브 카드 (십자)",
    desc: "중앙 + 상하좌우 5장",
    slots: [
      { x: 50, y: 50 },
      { x: 50, y: 18 },
      { x: 50, y: 82 },
      { x: 20, y: 50 },
      { x: 80, y: 50 },
    ],
  },
  {
    id: "celtic",
    name: "켈틱 크로스",
    desc: "전통 10장 배치",
    slots: [
      { x: 30, y: 50 },
      { x: 38, y: 50 },
      { x: 30, y: 82 },
      { x: 12, y: 50 },
      { x: 30, y: 18 },
      { x: 52, y: 50 },
      { x: 85, y: 85 },
      { x: 85, y: 62 },
      { x: 85, y: 39 },
      { x: 85, y: 16 },
    ],
  },
  {
    id: "free",
    name: "자유 배치",
    desc: "원하는 만큼 올려 자유롭게 배치",
    slots: [],
  },
]

export const SPREAD_BY_ID: Record<string, SpreadTemplate> = Object.fromEntries(
  SPREAD_TEMPLATES.map((s) => [s.id, s])
)

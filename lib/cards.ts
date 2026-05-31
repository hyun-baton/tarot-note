export interface TarotCard {
  id: string
  name: string
  nameKo: string
  imageUrl: string
}

const BASE = "https://media.githubusercontent.com/media/yunruse/tarot/gh-pages/cards/color1910"

const img = (code: string) => `${BASE}/${code}.jpg`

export const TAROT_CARDS: TarotCard[] = [
  // Major Arcana
  { id: "ar00", name: "The Fool", nameKo: "바보", imageUrl: img("0") },
  { id: "ar01", name: "The Magician", nameKo: "마법사", imageUrl: img("1") },
  { id: "ar02", name: "The High Priestess", nameKo: "여교황", imageUrl: img("2") },
  { id: "ar03", name: "The Empress", nameKo: "여황제", imageUrl: img("3") },
  { id: "ar04", name: "The Emperor", nameKo: "황제", imageUrl: img("4") },
  { id: "ar05", name: "The Hierophant", nameKo: "교황", imageUrl: img("5") },
  { id: "ar06", name: "The Lovers", nameKo: "연인", imageUrl: img("6") },
  { id: "ar07", name: "The Chariot", nameKo: "전차", imageUrl: img("7") },
  { id: "ar08", name: "Strength", nameKo: "힘", imageUrl: img("8") },
  { id: "ar09", name: "The Hermit", nameKo: "은둔자", imageUrl: img("9") },
  { id: "ar10", name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", imageUrl: img("10") },
  { id: "ar11", name: "Justice", nameKo: "정의", imageUrl: img("11") },
  { id: "ar12", name: "The Hanged Man", nameKo: "매달린 사람", imageUrl: img("12") },
  { id: "ar13", name: "Death", nameKo: "죽음", imageUrl: img("13") },
  { id: "ar14", name: "Temperance", nameKo: "절제", imageUrl: img("14") },
  { id: "ar15", name: "The Devil", nameKo: "악마", imageUrl: img("15") },
  { id: "ar16", name: "The Tower", nameKo: "탑", imageUrl: img("16") },
  { id: "ar17", name: "The Star", nameKo: "별", imageUrl: img("17") },
  { id: "ar18", name: "The Moon", nameKo: "달", imageUrl: img("18") },
  { id: "ar19", name: "The Sun", nameKo: "태양", imageUrl: img("19") },
  { id: "ar20", name: "Judgement", nameKo: "심판", imageUrl: img("20") },
  { id: "ar21", name: "The World", nameKo: "세계", imageUrl: img("21") },
  // Wands
  { id: "wa01", name: "Ace of Wands", nameKo: "완드 에이스", imageUrl: img("w1") },
  { id: "wa02", name: "Two of Wands", nameKo: "완드 2", imageUrl: img("w2") },
  { id: "wa03", name: "Three of Wands", nameKo: "완드 3", imageUrl: img("w3") },
  { id: "wa04", name: "Four of Wands", nameKo: "완드 4", imageUrl: img("w4") },
  { id: "wa05", name: "Five of Wands", nameKo: "완드 5", imageUrl: img("w5") },
  { id: "wa06", name: "Six of Wands", nameKo: "완드 6", imageUrl: img("w6") },
  { id: "wa07", name: "Seven of Wands", nameKo: "완드 7", imageUrl: img("w7") },
  { id: "wa08", name: "Eight of Wands", nameKo: "완드 8", imageUrl: img("w8") },
  { id: "wa09", name: "Nine of Wands", nameKo: "완드 9", imageUrl: img("w9") },
  { id: "wa10", name: "Ten of Wands", nameKo: "완드 10", imageUrl: img("w10") },
  { id: "wa11", name: "Page of Wands", nameKo: "완드 시종", imageUrl: img("w11") },
  { id: "wa12", name: "Knight of Wands", nameKo: "완드 기사", imageUrl: img("w12") },
  { id: "wa13", name: "Queen of Wands", nameKo: "완드 여왕", imageUrl: img("w13") },
  { id: "wa14", name: "King of Wands", nameKo: "완드 왕", imageUrl: img("w14") },
  // Cups
  { id: "cu01", name: "Ace of Cups", nameKo: "컵 에이스", imageUrl: img("c1") },
  { id: "cu02", name: "Two of Cups", nameKo: "컵 2", imageUrl: img("c2") },
  { id: "cu03", name: "Three of Cups", nameKo: "컵 3", imageUrl: img("c3") },
  { id: "cu04", name: "Four of Cups", nameKo: "컵 4", imageUrl: img("c4") },
  { id: "cu05", name: "Five of Cups", nameKo: "컵 5", imageUrl: img("c5") },
  { id: "cu06", name: "Six of Cups", nameKo: "컵 6", imageUrl: img("c6") },
  { id: "cu07", name: "Seven of Cups", nameKo: "컵 7", imageUrl: img("c7") },
  { id: "cu08", name: "Eight of Cups", nameKo: "컵 8", imageUrl: img("c8") },
  { id: "cu09", name: "Nine of Cups", nameKo: "컵 9", imageUrl: img("c9") },
  { id: "cu10", name: "Ten of Cups", nameKo: "컵 10", imageUrl: img("c10") },
  { id: "cu11", name: "Page of Cups", nameKo: "컵 시종", imageUrl: img("c11") },
  { id: "cu12", name: "Knight of Cups", nameKo: "컵 기사", imageUrl: img("c12") },
  { id: "cu13", name: "Queen of Cups", nameKo: "컵 여왕", imageUrl: img("c13") },
  { id: "cu14", name: "King of Cups", nameKo: "컵 왕", imageUrl: img("c14") },
  // Swords
  { id: "sw01", name: "Ace of Swords", nameKo: "소드 에이스", imageUrl: img("s1") },
  { id: "sw02", name: "Two of Swords", nameKo: "소드 2", imageUrl: img("s2") },
  { id: "sw03", name: "Three of Swords", nameKo: "소드 3", imageUrl: img("s3") },
  { id: "sw04", name: "Four of Swords", nameKo: "소드 4", imageUrl: img("s4") },
  { id: "sw05", name: "Five of Swords", nameKo: "소드 5", imageUrl: img("s5") },
  { id: "sw06", name: "Six of Swords", nameKo: "소드 6", imageUrl: img("s6") },
  { id: "sw07", name: "Seven of Swords", nameKo: "소드 7", imageUrl: img("s7") },
  { id: "sw08", name: "Eight of Swords", nameKo: "소드 8", imageUrl: img("s8") },
  { id: "sw09", name: "Nine of Swords", nameKo: "소드 9", imageUrl: img("s9") },
  { id: "sw10", name: "Ten of Swords", nameKo: "소드 10", imageUrl: img("s10") },
  { id: "sw11", name: "Page of Swords", nameKo: "소드 시종", imageUrl: img("s11") },
  { id: "sw12", name: "Knight of Swords", nameKo: "소드 기사", imageUrl: img("s12") },
  { id: "sw13", name: "Queen of Swords", nameKo: "소드 여왕", imageUrl: img("s13") },
  { id: "sw14", name: "King of Swords", nameKo: "소드 왕", imageUrl: img("s14") },
  // Pentacles
  { id: "pe01", name: "Ace of Pentacles", nameKo: "펜타클 에이스", imageUrl: img("p1") },
  { id: "pe02", name: "Two of Pentacles", nameKo: "펜타클 2", imageUrl: img("p2") },
  { id: "pe03", name: "Three of Pentacles", nameKo: "펜타클 3", imageUrl: img("p3") },
  { id: "pe04", name: "Four of Pentacles", nameKo: "펜타클 4", imageUrl: img("p4") },
  { id: "pe05", name: "Five of Pentacles", nameKo: "펜타클 5", imageUrl: img("p5") },
  { id: "pe06", name: "Six of Pentacles", nameKo: "펜타클 6", imageUrl: img("p6") },
  { id: "pe07", name: "Seven of Pentacles", nameKo: "펜타클 7", imageUrl: img("p7") },
  { id: "pe08", name: "Eight of Pentacles", nameKo: "펜타클 8", imageUrl: img("p8") },
  { id: "pe09", name: "Nine of Pentacles", nameKo: "펜타클 9", imageUrl: img("p9") },
  { id: "pe10", name: "Ten of Pentacles", nameKo: "펜타클 10", imageUrl: img("p10") },
  { id: "pe11", name: "Page of Pentacles", nameKo: "펜타클 시종", imageUrl: img("p11") },
  { id: "pe12", name: "Knight of Pentacles", nameKo: "펜타클 기사", imageUrl: img("p12") },
  { id: "pe13", name: "Queen of Pentacles", nameKo: "펜타클 여왕", imageUrl: img("p13") },
  { id: "pe14", name: "King of Pentacles", nameKo: "펜타클 왕", imageUrl: img("p14") },
]

export const CARD_BY_NAME: Record<string, TarotCard> = Object.fromEntries(
  TAROT_CARDS.map((c) => [c.name, c])
)

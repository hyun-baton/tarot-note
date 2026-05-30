export interface TarotCard {
  id: string
  name: string
  nameKo: string
  imageUrl: string
}

const BASE = "https://www.sacred-texts.com/tarot/pkt/img"

export const TAROT_CARDS: TarotCard[] = [
  // Major Arcana
  { id: "ar00", name: "The Fool", nameKo: "바보", imageUrl: `${BASE}/ar00.jpg` },
  { id: "ar01", name: "The Magician", nameKo: "마법사", imageUrl: `${BASE}/ar01.jpg` },
  { id: "ar02", name: "The High Priestess", nameKo: "여교황", imageUrl: `${BASE}/ar02.jpg` },
  { id: "ar03", name: "The Empress", nameKo: "여황제", imageUrl: `${BASE}/ar03.jpg` },
  { id: "ar04", name: "The Emperor", nameKo: "황제", imageUrl: `${BASE}/ar04.jpg` },
  { id: "ar05", name: "The Hierophant", nameKo: "교황", imageUrl: `${BASE}/ar05.jpg` },
  { id: "ar06", name: "The Lovers", nameKo: "연인", imageUrl: `${BASE}/ar06.jpg` },
  { id: "ar07", name: "The Chariot", nameKo: "전차", imageUrl: `${BASE}/ar07.jpg` },
  { id: "ar08", name: "Strength", nameKo: "힘", imageUrl: `${BASE}/ar08.jpg` },
  { id: "ar09", name: "The Hermit", nameKo: "은둔자", imageUrl: `${BASE}/ar09.jpg` },
  { id: "ar10", name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", imageUrl: `${BASE}/ar10.jpg` },
  { id: "ar11", name: "Justice", nameKo: "정의", imageUrl: `${BASE}/ar11.jpg` },
  { id: "ar12", name: "The Hanged Man", nameKo: "매달린 사람", imageUrl: `${BASE}/ar12.jpg` },
  { id: "ar13", name: "Death", nameKo: "죽음", imageUrl: `${BASE}/ar13.jpg` },
  { id: "ar14", name: "Temperance", nameKo: "절제", imageUrl: `${BASE}/ar14.jpg` },
  { id: "ar15", name: "The Devil", nameKo: "악마", imageUrl: `${BASE}/ar15.jpg` },
  { id: "ar16", name: "The Tower", nameKo: "탑", imageUrl: `${BASE}/ar16.jpg` },
  { id: "ar17", name: "The Star", nameKo: "별", imageUrl: `${BASE}/ar17.jpg` },
  { id: "ar18", name: "The Moon", nameKo: "달", imageUrl: `${BASE}/ar18.jpg` },
  { id: "ar19", name: "The Sun", nameKo: "태양", imageUrl: `${BASE}/ar19.jpg` },
  { id: "ar20", name: "Judgement", nameKo: "심판", imageUrl: `${BASE}/ar20.jpg` },
  { id: "ar21", name: "The World", nameKo: "세계", imageUrl: `${BASE}/ar21.jpg` },
  // Wands
  { id: "wa01", name: "Ace of Wands", nameKo: "완드 에이스", imageUrl: `${BASE}/wa01.jpg` },
  { id: "wa02", name: "Two of Wands", nameKo: "완드 2", imageUrl: `${BASE}/wa02.jpg` },
  { id: "wa03", name: "Three of Wands", nameKo: "완드 3", imageUrl: `${BASE}/wa03.jpg` },
  { id: "wa04", name: "Four of Wands", nameKo: "완드 4", imageUrl: `${BASE}/wa04.jpg` },
  { id: "wa05", name: "Five of Wands", nameKo: "완드 5", imageUrl: `${BASE}/wa05.jpg` },
  { id: "wa06", name: "Six of Wands", nameKo: "완드 6", imageUrl: `${BASE}/wa06.jpg` },
  { id: "wa07", name: "Seven of Wands", nameKo: "완드 7", imageUrl: `${BASE}/wa07.jpg` },
  { id: "wa08", name: "Eight of Wands", nameKo: "완드 8", imageUrl: `${BASE}/wa08.jpg` },
  { id: "wa09", name: "Nine of Wands", nameKo: "완드 9", imageUrl: `${BASE}/wa09.jpg` },
  { id: "wa10", name: "Ten of Wands", nameKo: "완드 10", imageUrl: `${BASE}/wa10.jpg` },
  { id: "wa11", name: "Page of Wands", nameKo: "완드 시종", imageUrl: `${BASE}/wa11.jpg` },
  { id: "wa12", name: "Knight of Wands", nameKo: "완드 기사", imageUrl: `${BASE}/wa12.jpg` },
  { id: "wa13", name: "Queen of Wands", nameKo: "완드 여왕", imageUrl: `${BASE}/wa13.jpg` },
  { id: "wa14", name: "King of Wands", nameKo: "완드 왕", imageUrl: `${BASE}/wa14.jpg` },
  // Cups
  { id: "cu01", name: "Ace of Cups", nameKo: "컵 에이스", imageUrl: `${BASE}/cu01.jpg` },
  { id: "cu02", name: "Two of Cups", nameKo: "컵 2", imageUrl: `${BASE}/cu02.jpg` },
  { id: "cu03", name: "Three of Cups", nameKo: "컵 3", imageUrl: `${BASE}/cu03.jpg` },
  { id: "cu04", name: "Four of Cups", nameKo: "컵 4", imageUrl: `${BASE}/cu04.jpg` },
  { id: "cu05", name: "Five of Cups", nameKo: "컵 5", imageUrl: `${BASE}/cu05.jpg` },
  { id: "cu06", name: "Six of Cups", nameKo: "컵 6", imageUrl: `${BASE}/cu06.jpg` },
  { id: "cu07", name: "Seven of Cups", nameKo: "컵 7", imageUrl: `${BASE}/cu07.jpg` },
  { id: "cu08", name: "Eight of Cups", nameKo: "컵 8", imageUrl: `${BASE}/cu08.jpg` },
  { id: "cu09", name: "Nine of Cups", nameKo: "컵 9", imageUrl: `${BASE}/cu09.jpg` },
  { id: "cu10", name: "Ten of Cups", nameKo: "컵 10", imageUrl: `${BASE}/cu10.jpg` },
  { id: "cu11", name: "Page of Cups", nameKo: "컵 시종", imageUrl: `${BASE}/cu11.jpg` },
  { id: "cu12", name: "Knight of Cups", nameKo: "컵 기사", imageUrl: `${BASE}/cu12.jpg` },
  { id: "cu13", name: "Queen of Cups", nameKo: "컵 여왕", imageUrl: `${BASE}/cu13.jpg` },
  { id: "cu14", name: "King of Cups", nameKo: "컵 왕", imageUrl: `${BASE}/cu14.jpg` },
  // Swords
  { id: "sw01", name: "Ace of Swords", nameKo: "소드 에이스", imageUrl: `${BASE}/sw01.jpg` },
  { id: "sw02", name: "Two of Swords", nameKo: "소드 2", imageUrl: `${BASE}/sw02.jpg` },
  { id: "sw03", name: "Three of Swords", nameKo: "소드 3", imageUrl: `${BASE}/sw03.jpg` },
  { id: "sw04", name: "Four of Swords", nameKo: "소드 4", imageUrl: `${BASE}/sw04.jpg` },
  { id: "sw05", name: "Five of Swords", nameKo: "소드 5", imageUrl: `${BASE}/sw05.jpg` },
  { id: "sw06", name: "Six of Swords", nameKo: "소드 6", imageUrl: `${BASE}/sw06.jpg` },
  { id: "sw07", name: "Seven of Swords", nameKo: "소드 7", imageUrl: `${BASE}/sw07.jpg` },
  { id: "sw08", name: "Eight of Swords", nameKo: "소드 8", imageUrl: `${BASE}/sw08.jpg` },
  { id: "sw09", name: "Nine of Swords", nameKo: "소드 9", imageUrl: `${BASE}/sw09.jpg` },
  { id: "sw10", name: "Ten of Swords", nameKo: "소드 10", imageUrl: `${BASE}/sw10.jpg` },
  { id: "sw11", name: "Page of Swords", nameKo: "소드 시종", imageUrl: `${BASE}/sw11.jpg` },
  { id: "sw12", name: "Knight of Swords", nameKo: "소드 기사", imageUrl: `${BASE}/sw12.jpg` },
  { id: "sw13", name: "Queen of Swords", nameKo: "소드 여왕", imageUrl: `${BASE}/sw13.jpg` },
  { id: "sw14", name: "King of Swords", nameKo: "소드 왕", imageUrl: `${BASE}/sw14.jpg` },
  // Pentacles
  { id: "pe01", name: "Ace of Pentacles", nameKo: "펜타클 에이스", imageUrl: `${BASE}/pe01.jpg` },
  { id: "pe02", name: "Two of Pentacles", nameKo: "펜타클 2", imageUrl: `${BASE}/pe02.jpg` },
  { id: "pe03", name: "Three of Pentacles", nameKo: "펜타클 3", imageUrl: `${BASE}/pe03.jpg` },
  { id: "pe04", name: "Four of Pentacles", nameKo: "펜타클 4", imageUrl: `${BASE}/pe04.jpg` },
  { id: "pe05", name: "Five of Pentacles", nameKo: "펜타클 5", imageUrl: `${BASE}/pe05.jpg` },
  { id: "pe06", name: "Six of Pentacles", nameKo: "펜타클 6", imageUrl: `${BASE}/pe06.jpg` },
  { id: "pe07", name: "Seven of Pentacles", nameKo: "펜타클 7", imageUrl: `${BASE}/pe07.jpg` },
  { id: "pe08", name: "Eight of Pentacles", nameKo: "펜타클 8", imageUrl: `${BASE}/pe08.jpg` },
  { id: "pe09", name: "Nine of Pentacles", nameKo: "펜타클 9", imageUrl: `${BASE}/pe09.jpg` },
  { id: "pe10", name: "Ten of Pentacles", nameKo: "펜타클 10", imageUrl: `${BASE}/pe10.jpg` },
  { id: "pe11", name: "Page of Pentacles", nameKo: "펜타클 시종", imageUrl: `${BASE}/pe11.jpg` },
  { id: "pe12", name: "Knight of Pentacles", nameKo: "펜타클 기사", imageUrl: `${BASE}/pe12.jpg` },
  { id: "pe13", name: "Queen of Pentacles", nameKo: "펜타클 여왕", imageUrl: `${BASE}/pe13.jpg` },
  { id: "pe14", name: "King of Pentacles", nameKo: "펜타클 왕", imageUrl: `${BASE}/pe14.jpg` },
]

export const CARD_BY_NAME: Record<string, TarotCard> = Object.fromEntries(
  TAROT_CARDS.map((c) => [c.name, c])
)

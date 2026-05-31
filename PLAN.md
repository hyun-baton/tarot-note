# 타로 노트

기술 이름(slug): `tarot-note`

## 한 줄 소개
매일 뽑은 타로 카드를 이미지와 함께 기록하고 되돌아보는 나만의 디지털 타로 일지

## 핵심 흐름
1. 78장 중 카드를 고른다 — 날짜·질문·해석을 적어 저장
2. 기록 목록에서 카드 이미지로 과거 기록을 한눈에 본다
3. 상세 화면에서 그 당시 해석을 다시 읽고, 새로운 코멘트(리뷰)를 덧붙인다

## 참고 앱/사이트
없음

## 설정
- 로그인: 필요 없음 (나 혼자 쓰는 도구)
- LLM API: 불필요
- 외부 연동: 없음

## 디자인
- 강조색: `#004ac6` (Stitch primary) — 버튼·링크·강조. 보라색 그라데이션은 쓰지 않는다.
- 배경: `#faf8ff` · 글자: `#131b2e` · 카드: `#ffffff` · 테두리: `#c3c6d7`
- 보조 표면: surface-container `#eaedff` · surface-container-low `#f2f3ff`
- 상태색: 성공 `#16A34A` · 오류 `#ba1a1a`
- 폰트: Noto Sans KR
- 모서리(radius): 12px (`rounded-xl`) · 그림자: 옅게 카드에만 · 간격: 넉넉하게
- 레이아웃 원칙: 모아보기는 월별 달력, 입력·상세는 중앙 1단
- 네비게이션: 상단 탭바 — 기록하기·모아보기 (통계·설정은 다음에)
- 카드 이름 표기: "영어이름 / 한글이름" 병기 (예: "The Magician / 마법사")
- 카드 이미지: Smith-Waite 보더리스 (yunruse/tarot color1910) — 흰 테두리는 `scale-[1.08]`로 잘라 보더리스 표현

## 화면
1. **모아보기** ("나의 성찰 기록") — `/`
   - 보임: 기록 리스트(1순위, 표지 카드+날짜+제목+질문 미리보기) + 작은 달력(사이드) — 기록 있는 날은 강조색 원으로 표시, 오늘은 테두리
   - 동작: 리스트/달력의 기록 클릭 → 상세 이동 · 달력 월 앞뒤 이동 (데스크탑은 리스트 옆 달력, 모바일은 달력 위·리스트 아래)
   - 데이터: 읽음: readings (reading_date 기준)
   - 상태: 0건이면 "아직 기록이 없어요" 안내 · 오류 메시지

2. **새 기록** ("오늘의 기록") — `/new`
   - 보임: 스프레드 편집기(1순위) — 템플릿 선택(데일리·쓰리·십자·켈틱·자유) + 캔버스 + 카드 검색 → 날짜·질문·해석 입력폼
   - 동작: 템플릿 선택 → 카드 검색해 추가(자리 채움) → 캔버스에서 드래그로 위치 조정 → 텍스트 입력 → 저장
   - 데이터: 씀: readings (cards 배열 + spread_name, 표지 카드 = cards[0])
   - 상태: 저장 중 비활성화 · 저장 완료 → 모아보기 이동 · 카드 0장이면 오류 · 자유 배치 최대 20장

3. **기록 상세** — `/readings/[id]`
   - 보임: 스프레드(2장↑)는 상단 전체폭 캔버스에 배치 그대로 / 단일 카드는 좌우 2단 → 질문·해석·리뷰
   - 동작: 리뷰 텍스트 작성 후 추가 · 기록 삭제(확인 후)
   - 데이터: 읽음: readings, reviews · 씀: reviews · 지움: readings+reviews
   - 상태: 로딩 · 리뷰 없을 때 "지금 되돌아보고 코멘트를 남겨보세요" 안내

## 데이터 (Supabase 테이블)
- **readings**
  - `id` uuid — 기본 키
  - `card_name` text — 카드 이름 (78장 중 하나)
  - `card_image_url` text — 카드 이미지 URL
  - `reading_date` date — 카드를 뽑은 날짜
  - `question` text — 그날의 질문 또는 상황
  - `interpretation` text — 해석 / 메모 (스프레드 전체 하나)
  - `created_at` timestamptz
  - `cards` jsonb — 스프레드 카드 배열 `[{ name, nameKo, imageUrl, x, y }]` (x,y=캔버스 백분율 위치). 단일 카드 옛 기록은 `[]`
  - `spread_name` text — 스프레드 템플릿 이름 (예: 쓰리 카드)
  - 표지: cards[0] 또는 card_name/card_image_url (달력 썸네일용)
  - 관계: 없음

- **reviews**
  - `id` uuid — 기본 키
  - `reading_id` uuid — readings.id 참조
  - `review_text` text — 리뷰 내용
  - `reviewed_at` timestamptz
  - 관계: reading_id → readings.id

## 기술 스택
Next.js (App Router, TypeScript) · Tailwind CSS · shadcn/ui · Supabase · Vercel

## MVP 범위
- 포함: 모아보기(달력) · 새 기록(스프레드 배치) · 기록 상세(리뷰 포함)
- 제외 — 다음에: 사진 업로드 → AI 카드 인식 · 자리별 개별 주제/해석 · 통계/분석 · 설정 화면 · 덱 선택 화면 · 카드 도감

## 진행 상황
- [x] 기획 완료
- [x] Stitch 프로토타입
- [x] 연결 (GitHub · Vercel · Supabase)
- [x] 구현: 모아보기(달력)
- [x] 구현: 새 기록(카드 검색)
- [x] 구현: 기록 상세
- [x] 메뉴 개편: 달력·도감 페이지 제거, 달력을 모아보기에 통합
- [x] 카드 이미지: Smith-Waite 보더리스로 통일
- [x] 스프레드: 여러 장 카드 + 자유 배치(템플릿 + 드래그), 단일 카드 통합
- [x] 배포 확인

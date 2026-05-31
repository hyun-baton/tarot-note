-- 스프레드: 한 기록에 여러 장의 카드 + 각 카드의 배치 위치를 담는다.
-- cards = jsonb 배열, 각 원소: { name, nameKo, imageUrl, x, y }
--   x, y: 캔버스 기준 카드 중심의 백분율 좌표(0~100)
--   순서: 배열 인덱스. 카드 1장이면 길이 1인 스프레드.
-- 기존 단일 카드 기록은 cards가 비어 있고, card_name/card_image_url(표지)로 표시된다.
alter table public.readings
  add column if not exists cards jsonb not null default '[]'::jsonb;

-- 스프레드 종류(템플릿) 이름 — 표시용. 예: '데일리', '쓰리 카드', '자유 배치'
alter table public.readings
  add column if not exists spread_name text;

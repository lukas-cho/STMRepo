# 📂 Database Schema

본 프로젝트는 교회 선교 바자회의 효율적인 관리를 위한 데이터베이스 설계입니다.

---

## 1. `userroles`

| 컬럼명     | 타입     | 필수 | 기본값             | 설명                  |
|------------|----------|------|--------------------|-----------------------|
| id         | uuid     | 예   | gen_random_uuid()  | 기본 키               |
| role_name  | text     | 예   | 없음               | 역할 이름 (예: Admin) |
| created_at | timestamp | 예   | now()              | 생성일                |

```sql
create table public.userroles (
  id uuid primary key default gen_random_uuid(),
  role_name text not null unique,
  created_at timestamp with time zone not null default now()
);

insert into public.userroles (role_name) values
('Admin'), ('User'), ('Guest');
```

---

## 2. `users`

| 컬럼명       | 타입     | 필수 | 기본값             | 설명                       |
|--------------|----------|------|--------------------|----------------------------|
| id           | uuid     | 예   | gen_random_uuid()  | 기본 키                    |
| email        | text     | 예   | 없음               | 사용자 이메일 (유니크)     |
| password     | text     | 예   | 없음               | 비밀번호 (해시 권장)       |
| userrole_id  | uuid     | 예   | 없음               | 역할 ID (FK)               |
| created_at   | timestamp | 예   | now()              | 생성일                     |

```sql
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  userrole_id uuid not null references public.userroles(id),
  created_at timestamp with time zone not null default now()
);

insert into public.users (email, password, userrole_id) values
('test@example.com', 'hashed_password_here', (select id from public.userroles where role_name = 'User'));
```

---

## 3. `menu_categories`

| 컬럼명       | 타입     | 필수 | 기본값             | 설명         |
|--------------|----------|------|--------------------|--------------|
| id           | uuid     | 예   | gen_random_uuid()  | 기본 키      |
| category_name| text     | 예   | 없음               | 메뉴 카테고리명 |
| created_at   | timestamp | 예   | now()              | 생성일       |

```sql
create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  category_name text not null unique,
  created_at timestamp with time zone not null default now()
);

insert into public.menu_categories (category_name) values
('한식'), ('중식'), ('일식');
```

---

## 4. `menus`

| 컬럼명           | 타입     | 필수 | 기본값             | 설명             |
|------------------|----------|------|--------------------|------------------|
| id               | uuid     | 예   | gen_random_uuid()  | 기본 키          |
| menu_name        | text     | 예   | 없음               | 메뉴 이름        |
| menu_category_id | uuid     | 예   | 없음               | 카테고리 ID (FK) |
| created_at       | timestamp | 예   | now()              | 생성일           |

```sql
create table public.menus (
  id uuid primary key default gen_random_uuid(),
  menu_name text not null,
  menu_category_id uuid not null references public.menu_categories(id),
  created_at timestamp with time zone not null default now()
);

insert into public.menus (menu_name, menu_category_id) values
('떡볶이', (select id from public.menu_categories where category_name = '한식')),
('짜장면', (select id from public.menu_categories where category_name = '중식')),
('라멘', (select id from public.menu_categories where category_name = '일식'));
```

---

## 5. `mission_teams`

| 컬럼명             | 타입     | 필수 | 기본값             | 설명                    |
|--------------------|----------|------|--------------------|-------------------------|
| id                 | uuid     | 예   | gen_random_uuid()  | 기본 키                 |
| country            | text     | 예   | 없음               | 나라                    |
| year               | integer  | 예   | 없음               | 연도                    |
| member_count       | integer  | 예   | 없음               | 멤버 수                 |
| period             | text     | 예   | 없음               | 기간                    |
| team_contact_email | text     | 아니오| 없음               | 담당자 이메일           |
| description        | text     | 아니오| 없음               | 설명                    |
| created_at         | timestamp | 예   | now()              | 생성일                  |

```sql
create table public.mission_teams (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  year integer not null,
  member_count integer not null,
  period text not null,
  team_contact_email text,
  description text,
  created_at timestamp with time zone not null default now()
);

insert into public.mission_teams (country, year, member_count, period, team_contact_email, description) values
('필리핀', 2025, 12, '2025-07-01 ~ 2025-07-10', 'abc@kcpc.org', '청년부 필리핀 단기선교'),
('일본', 2024, 8, '5일', 'ccc@kcpc.org', '일본 오사카 선교팀'),
('몽골', 2023, 10, '2023-08-10 ~ 2023-08-20', 'ddd@kcpc.org', '몽골 지역 마을 봉사 및 전도');
```

---

## 6. `mission_team_menus`

| 컬럼명                | 타입         | 필수 | 기본값             | 설명                          |
|------------------------|--------------|------|--------------------|-------------------------------|
| id                     | uuid         | 예   | gen_random_uuid()  | 기본 키                       |
| mission_team_id        | uuid         | 예   | 없음               | 선교팀 ID (FK)                |
| menu_id                | uuid         | 예   | 없음               | 메뉴 ID (FK)                  |
| unit_price             | decimal(10,2)| 예   | 없음               | 단가                          |
| quantity_available     | integer      | 예   | 없음               | 준비 수량                     |
| quantity_sold          | integer      | 예   | 0                  | 판매 수량                     |
| total_sales_amount     | decimal(12,2)| 예   | 0                  | 총 판매금액                   |
| ingredient_cost_amount | decimal(12,2)| 예   | 0                  | 재료비                        |
| created_at             | timestamp    | 예   | now()              | 생성일                        |

```sql
create table public.mission_team_menus (
  id uuid primary key default gen_random_uuid(),
  mission_team_id uuid not null references public.mission_teams(id),
  menu_id uuid not null references public.menus(id),
  unit_price decimal(10,2) not null,
  quantity_available integer not null,
  quantity_sold integer not null default 0,
  total_sales_amount decimal(12,2) not null default 0,
  ingredient_cost_amount decimal(12,2) not null default 0,
  created_at timestamp with time zone not null default now()
);

insert into public.mission_team_menus (
  mission_team_id, menu_id, unit_price, quantity_available, ingredient_cost_amount
) values
(
  (select id from public.mission_teams where country = '필리핀'),
  (select id from public.menus where menu_name = '떡볶이'),
  6000, 30, 30000
),
(
  (select id from public.mission_teams where country = '필리핀'),
  (select id from public.menus where menu_name = '짜장면'),
  8000, 20, 40000
);
```
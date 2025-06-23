# 📦 단기선교 바자회 노하우 레포지토리 (Short Term Mission Fundraising KnowHow Repository)

이 프로젝트는 교회에서 진행했던 **과거 단기선교 후원 바자회 음식/간식 데이터를 기록**하고,  
차후 바자회를 기획할 때 **아이디어를 효율적으로 참고**할 수 있도록 돕는 웹 애플리케이션입니다.

---

## 🧭 프로젝트 개요

- 교회 바자회에서 판매했던 음식, 간식 등의 정보를 정리
- 과거 판매 실적, 성도 반응, 준비 방법 등을 확인 가능
- 새로운 바자회를 기획할 때 참고 가능한 **노하우 저장소** 역할

---

## ✨ 주요 기능

### 📋 음식 목록 보기

- 카드형 UI로 바자회 음식들을 썸네일과 함께 표시
- 검색, 필터링 기능 지원

### 📄 음식 상세 페이지

- 준비 재료 / 조리법 / 영상 자료
- 과거 판매 실적, 성도 반응(좋아요, 댓글 등)

### ❤️ 즐겨찾기(Favorite)

- 좋아하는 음식 저장 가능
- 나중에 즐겨찾은 음식만 필터링해서 볼 수 있음

### 📊 판매 이력 및 통계

- 이전 행사별 판매 금액, 수량, 반응 요약 확인
- 향후 바자회 기획 시 참고

---

## 🛠️ 기술 스택

| 기술                              | 설명                               |
| --------------------------------- | ---------------------------------- |
| **Next.js**                       | React 기반 웹 프레임워크 (SSR/ISR) |
| **Supabase**                      | 인증, DB, Storage 전반             |
| **Prisma**                        | ORM (PostgreSQL과 연결)            |
| **Vercel**                        | 배포 및 서버리스 실행 환경         |
| **Tailwind CSS** or **Shadcn/UI** | UI 스타일링                        |

---

## 🖼️ 데모 및 자료

- 🎯 **개발 동기 및 프로젝트 목적 설명 (Prezi 프레젠테이션)**  
  [https://prezi.com/view/2Z1j0ilEhHubk9F67ntx/](https://prezi.com/view/2Z1j0ilEhHubk9F67ntx/)

- 💻 **Mock Up Website (Framer)**  
  [https://relevant-companies-503754.framer.app/](https://relevant-companies-503754.framer.app/)

---

## ⚙️ 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/lukas-cho/STMRepo.git

# 2. 의존성 설치
cd STMRepo
npm install

# 3. 환경변수 설정 (.env)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. 개발 서버 실행
npm run dev
```

---

## 👨‍💻 데이터베이스 스키마 보기

자세한 DB 설계는 [SCHEMA.md](./SCHEMA.md)를 참고하세요.
![Database ERD](/assets/images/bf5cc61d-d9c5-403c-8509-814885233653.png)

---

## 👨‍💻 개발 팀원

- 이사명
- 송유경
- 박종우
- 조한진

---

## 📌 향후 발전 방향

- AI 기반 음식 추천 기능
- 사용자가 직접 레시피/사진 업로드 가능
- 바자회 준비를 위한 AI 플래너(예상 판매량/재료 계산)
- 반응형 디자인 및 모바일 최적화

---

## 🕊️ 라이선스

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

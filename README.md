# 🥕 돌봄당근 (Dolbom Carrot)

우리 동네 아동 돌봄 선생님 매칭 플랫폼

## 📱 주요 기능

### 👩‍🏫 선생님 기능
- **실시간 상태 관리**: 지금 가능(🟢), 예약 가능(🟡), 불가(⚫) 상태 설정
- **활동 반경 설정**: 500m, 1km, 2km 중 선택
- **대시보드**: 요청 관리, 일정 확인, 수익 관리
- **프로필 관리**: 경력, 자격증, 시급 설정

### 👨‍👩‍👧 부모님 기능
- **지도 기반 검색**: 내 주변 선생님 실시간 확인
- **거리별 정렬**: 가까운 선생님 우선 표시
- **상세 필터**: 연령대, 시급, 평점별 검색
- **직접 연락**: 선생님과 1:1 채팅

## 🛠 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Deployment**: Vercel
- **Architecture**: Clean Architecture

## 🚀 시작하기

### 개발 환경 실행
```bash
npm install
npm run dev
```

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm run start
```

## 📂 프로젝트 구조

```
src/
├── app/                    # Next.js 14 app router
├── features/              # 도메인별 기능 모듈
│   ├── teacher/          # 선생님 관련
│   ├── parent/           # 부모 관련
│   └── chat/             # 채팅 기능
├── components/            # 공통 컴포넌트
├── stores/               # Zustand 상태 관리
├── types/                # TypeScript 타입 정의
└── services/             # API 및 서비스 로직
```

## 🎯 핵심 차별점

1. **당근마켓 스타일**: 동네 기반 매칭으로 신뢰도 향상
2. **실시간 상태**: 선생님의 현재 가능 여부 즉시 확인
3. **활동 반경**: 선생님이 직접 설정하는 활동 범위
4. **직관적 UI**: 지도 기반으로 한눈에 파악 가능

## 📝 라이선스

MIT License

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다!

---

**돌봄당근** - 우리 동네 믿을 수 있는 아동 돌봄 서비스 🥕
# Changelog

## 2025-01-14 (Side Projects Complete)

### Added
- Side Projects 모달 팝업 완성
  - 3개 프로젝트 전체 상세 내용 작성
    - Newspeace - AI 기반 뉴스 감성 분석 서비스 (KT AIVLE School)
    - Monte Carlo 시뮬레이션 기반 자산 수익률 분석 (경희대학교)
    - 개인 포트폴리오 웹사이트
  - GitHub 링크 및 발표자료 PDF 링크 추가
  - 발표자료 추가:
    - `assets/papers/AI_프로젝트 소개_정솔.pdf` (Newspeace)
    - `assets/papers/금데분 프로젝트 ppt(음성x)_2017100923_정솔.pdf` (Monte Carlo)
- 모달 팝업 인터랙션 개선
  - 호버 시 "클릭하여 자세히 보기" 메시지 표시
  - 카드 호버 시 확대 및 빨간색 글로우 그림자 효과
  - 클릭 시 눌리는 효과 추가
- 배경 스크롤 위치 유지 기능
  - 모달 열릴 때 현재 스크롤 위치 저장
  - 모달 닫을 때 원래 위치로 복원

### Changed
- `_data/side_projects.yml` 완전 개편
  - 필드 추가: `detailedDescription`, `features`, `presentation`
  - 모든 프로젝트에 상세 설명 및 주요 기능 작성
- `_includes/section-side-projects.html` 업데이트
  - 프로젝트 링크 제거 (모달로만 표시)
  - `presentation` 필드 JavaScript 데이터에 추가
- `_js/side-projects-modal.js` 개선
  - 발표자료 PDF 링크 표시 기능 추가
  - 스크롤 위치 저장 및 복원 로직 추가
  - GitHub 링크와 발표자료 링크를 나란히 표시
- `_sass/main.scss` 스타일 개선
  - 카드 호버 효과 강화 (transform, box-shadow, background)
  - 모달 링크 영역을 flex 레이아웃으로 변경 (여러 링크 나란히 표시)
  - 모바일 반응형 스타일 추가
- `gulpfile.js` 빌드 설정
  - `scriptsModal` 태스크 추가
  - `build` 태스크 추가 (서버 없이 빌드만 수행)

## 2025-01-13 (Side Projects Modal)

### Added
- Side Projects 섹션에 모달 팝업 기능 추가
  - 프로젝트 제목 클릭 시 상세 정보가 모달로 표시
  - 파일: `assets/js/side-projects-modal.js` (새로 생성)
  - 모달 CSS 스타일 추가: `_sass/main.scss`
  - JavaScript 로드: `_layouts/default.html`
- Side Projects 데이터 확장 (`_data/side_projects.yml`)
  - Monte Carlo 시뮬레이션 기반 자산 수익률 분석 프로젝트 추가
  - 개인 포트폴리오 사이트 프로젝트 추가
  - 새 필드: description, pdf_link, github, link
- 모달 기능
  - 제목, 기간, 기관, 상세 설명, 태그, 링크(PDF, GitHub, 외부) 표시
  - 오버레이 클릭, X 버튼 클릭, ESC 키로 닫기
  - Fade-in 및 slide-up 애니메이션

### Changed
- `_includes/section-side-projects.html` 업데이트
  - 모든 프로젝트 제목을 클릭 가능한 링크로 변경
  - 모달 HTML 구조 추가
  - JSON 데이터 임베딩 (JavaScript 용)

## 2025-01-13

### Added
- CV(이력서) PDF 링크 연결
  - 파일: `assets/cv_sol_jeong.pdf`
  - 수정 파일: `_config.yml`, `_includes/section-timeline.html`

### Changed
- Timeline 섹션 업데이트 (`_data/timeline.yml`)
  - IAI Lab 기간 수정: Mar. 2023 - Feb. 2026
  - 링크 URL 수정 (title-url, subtitle-url)
- Research Projects 섹션 업데이트 (`_data/projects.yml`)
  - 생성형 AI 프로젝트 기간/기관명 수정
  - 해상환경 프로젝트 기간/기관명 수정
- Publications 섹션 업데이트 (`_data/publications.yml`)
  - 국제 저널: LLM-based QA Framework 논문 추가 (in preparation)
  - 국내 학회: Text-to-SQL 논문 추가 (우수논문상 수상)
  - 기존 논문 정보 CV 기준으로 수정
  - 논문 제목에 PDF 링크 연결
- PDF 파일 정리
  - `assets/papers/` 폴더 생성 및 PDF 파일 이동
  - CV, 논문 PDF 경로 업데이트 (`_config.yml`, `_data/publications.yml`)
- Contact 섹션 설명 업데이트 (`_config.yml`)
  - 영어/한국어 이중 언어로 변경
  - 이메일 주소 추가: bohomi1995j@gmail.com

### Fixed
- CSS/JS 파일에 cache busting 적용 (`?v=timestamp`)
  - 배포 시 방문자가 항상 최신 버전을 받도록 개선
  - 수정 파일: `_layouts/default.html`

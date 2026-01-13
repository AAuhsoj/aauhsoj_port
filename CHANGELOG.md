# Changelog

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

### Fixed
- CSS/JS 파일에 cache busting 적용 (`?v=timestamp`)
  - 배포 시 방문자가 항상 최신 버전을 받도록 개선
  - 수정 파일: `_layouts/default.html`

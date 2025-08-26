# 수정된 파일들 백업

## 파일 목록

### 1. 수정된 기존 파일들
- **default.html**: 메인 레이아웃 파일 (프로젝트 섹션 구조 변경)
- **main.scss**: CSS 스타일 파일 (좌우 분할 스타일 추가)
- **_config.yml**: Jekyll 설정 파일 (Side Projects 설정 추가)

### 2. 새로 생성된 파일들
- **section-side-projects.html**: Side Projects 섹션 템플릿
- **side_projects.yml**: Side Projects 데이터 파일

## 적용 방법
1. 해당 파일들을 원본 위치에 덮어쓰기
2. Jekyll 서버 재시작
3. Gulp로 CSS 컴파일: `gulp styles`

## 원본 파일 위치
- `_layouts/default.html`
- `_sass/main.scss` 
- `_config.yml`
- `_includes/section-side-projects.html`
- `_data/side_projects.yml`
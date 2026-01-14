// Side Projects Modal Popup Functionality

(function() {
  'use strict';

  // 모달 요소들
  let modal = null;
  let modalOverlay = null;
  let modalContent = null;
  let modalClose = null;
  let modalDetails = null;

  // DOM이 로드된 후 초기화
  function initModal() {
    // 모달 요소 선택
    modal = document.getElementById('side-project-modal');
    if (!modal) return; // 모달이 없으면 종료

    modalOverlay = modal.querySelector('.modal-overlay');
    modalContent = modal.querySelector('.modal-content');
    modalClose = modal.querySelector('.modal-close');
    modalDetails = document.getElementById('modal-details');

    // 프로젝트 카드에 클릭 이벤트 추가
    const projectCards = document.querySelectorAll('.side-project-card');
    projectCards.forEach(function(card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        const projectIndex = parseInt(this.getAttribute('data-project-index'));
        openModal(projectIndex);
      });
    });

    // 닫기 버튼 클릭
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // 오버레이 클릭
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // 모달 열기
  function openModal(projectIndex) {
    if (!window.sideProjectsData || !window.sideProjectsData[projectIndex]) {
      console.error('Project data not found');
      return;
    }

    const project = window.sideProjectsData[projectIndex];

    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // 모달 내용 구성
    let html = '<h2 class="modal-title">' + escapeHtml(project.title) + '</h2>';

    // 기간 및 기관
    if (project.period || project.organization) {
      html += '<div class="modal-meta">';
      if (project.period) {
        html += '<span class="modal-period">' + escapeHtml(project.period) + '</span>';
      }
      if (project.period && project.organization) {
        html += ' <span class="modal-separator">&bull;</span> ';
      }
      if (project.organization) {
        html += '<span class="modal-organization">' + escapeHtml(project.organization) + '</span>';
      }
      html += '</div>';
    }

    // 키워드
    if (project.keywords && project.keywords.length > 0) {
      html += '<div class="modal-keywords">';
      html += project.keywords.map(function(keyword) {
        return '<span class="modal-keyword">' + escapeHtml(keyword) + '</span>';
      }).join('');
      html += '</div>';
    }

    // 상세 설명
    if (project.detailedDescription) {
      html += '<div class="modal-description">';
      html += '<h3>프로젝트 소개</h3>';
      html += '<p>' + escapeHtml(project.detailedDescription).replace(/\n/g, '<br>') + '</p>';
      html += '</div>';
    }

    // 주요 기능
    if (project.features && project.features.length > 0) {
      html += '<div class="modal-features">';
      html += '<h3>주요 기능 및 특징</h3>';
      html += '<ul>';
      project.features.forEach(function(feature) {
        html += '<li>' + escapeHtml(feature) + '</li>';
      });
      html += '</ul>';
      html += '</div>';
    }

    // 기술 스택
    if (project.tags && project.tags.length > 0) {
      html += '<div class="modal-tech-stack">';
      html += '<h3>기술 스택</h3>';
      html += '<div class="modal-tags">';
      project.tags.forEach(function(tag) {
        html += '<span class="modal-tag neumorphism-card">' + escapeHtml(tag) + '</span>';
      });
      html += '</div>';
      html += '</div>';
    }

    // GitHub 링크 및 발표자료
    if (project.link || project.presentation) {
      html += '<div class="modal-link">';

      if (project.link) {
        html += '<a href="' + escapeHtml(project.link) + '" target="_blank" rel="noreferrer" class="modal-github-link">';
        html += '<svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">';
        html += '<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>';
        html += '</svg>';
        html += ' GitHub Repository';
        html += '</a>';
      }

      if (project.presentation) {
        html += '<a href="' + escapeHtml(project.presentation) + '" target="_blank" rel="noreferrer" class="modal-presentation-link">';
        html += '<svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">';
        html += '<path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>';
        html += '<path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>';
        html += '</svg>';
        html += ' 발표자료 (PDF)';
        html += '</a>';
      }

      html += '</div>';
    }

    modalDetails.innerHTML = html;

    // 모달 표시
    modal.classList.add('show');
  }

  // 모달 닫기
  function closeModal() {
    if (modal) {
      modal.classList.remove('show');

      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  // HTML 이스케이프 (XSS 방지)
  function escapeHtml(text) {
    if (!text) return '';
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  // DOMContentLoaded 이벤트에서 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
  } else {
    initModal();
  }

})();

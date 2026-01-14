/**
 * Side Projects Modal Handler
 * Displays project details in a modal popup when title is clicked
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('sideProjectModal');
    if (!modal) return;

    const projectCards = document.querySelectorAll('.side-project-card');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');

    // Load project data from embedded JSON
    const projectDataElement = document.getElementById('sideProjectsData');
    if (!projectDataElement) return;

    let projectsData = [];
    try {
      projectsData = JSON.parse(projectDataElement.textContent);
    } catch (e) {
      console.error('Failed to parse project data:', e);
      return;
    }

    // Store scroll position to prevent page jump
    let scrollPosition = 0;

    // Open modal with project data
    function openModal(projectIndex) {
      const project = projectsData[projectIndex];
      if (!project) return;

      // Populate modal content
      document.getElementById('modalTitle').textContent = project.title;

      // Period and Organization
      let periodOrgHTML = '';
      if (project.period) periodOrgHTML += `<span class="period">${project.period}</span>`;
      if (project.period && project.organization) periodOrgHTML += ' &bull; ';
      if (project.organization) periodOrgHTML += `<span class="organization">${project.organization}</span>`;
      document.getElementById('modalPeriodOrg').innerHTML = periodOrgHTML;

      // Description
      const descriptionEl = document.getElementById('modalDescription');
      if (project.description) {
        let descHTML = project.description
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');
        descriptionEl.innerHTML = descHTML;
        descriptionEl.style.display = 'block';
      } else {
        descriptionEl.style.display = 'none';
      }

      // Tags
      const tagsEl = document.getElementById('modalTags');
      if (project.tags && project.tags.length > 0) {
        tagsEl.innerHTML = project.tags
          .map(tag => `<span class="tag neumorphism-card">${tag}</span>`)
          .join('');
        tagsEl.style.display = 'block';
      } else {
        tagsEl.style.display = 'none';
      }

      // Links (PDF, GitHub, External link)
      const linksEl = document.getElementById('modalLinks');
      let linksHTML = '';
      if (project.pdf_link) {
        linksHTML += `<a href="${project.pdf_link}" target="_blank" rel="noreferrer" class="modal-link-btn neumorphism-card">📄 View PDF</a>`;
      }
      if (project.github) {
        linksHTML += `<a href="${project.github}" target="_blank" rel="noreferrer" class="modal-link-btn neumorphism-card">💻 GitHub</a>`;
      }
      if (project.link) {
        linksHTML += `<a href="${project.link}" target="_blank" rel="noreferrer" class="modal-link-btn neumorphism-card">🔗 Visit</a>`;
      }
      if (linksHTML) {
        linksEl.innerHTML = linksHTML;
        linksEl.style.display = 'flex';
      } else {
        linksEl.style.display = 'none';
      }

      // Save current scroll position
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Prevent body scroll while preserving position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';

      // Show modal
      modal.classList.add('show');
    }

    // Close modal
    function closeModal() {
      modal.classList.remove('show');

      // Restore body scroll and position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    // Event listeners for project titles
    projectCards.forEach(function(card) {
      const titleEl = card.querySelector('.project-title');
      if (titleEl) {
        titleEl.addEventListener('click', function() {
          const projectIndex = parseInt(card.getAttribute('data-project-index'));
          openModal(projectIndex);
        });
      }
    });

    // Close modal on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on close button click
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  });
})();

// Side Projects Modal Popup Handler
(function() {
  'use strict';

  // Current language state (default: English)
  let currentLanguage = 'en';
  let currentProject = null;
  let scrollPosition = 0;

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Get project data from embedded JSON
    const projectDataElement = document.getElementById('side-projects-data');
    if (!projectDataElement) {
      console.warn('Side projects data not found');
      return;
    }

    let projectsData;
    try {
      projectsData = JSON.parse(projectDataElement.textContent);
    } catch (error) {
      console.error('Error parsing side projects data:', error);
      return;
    }

    // Get modal elements
    const popup = document.getElementById('side-project-popup');
    const popupDetails = document.getElementById('side-project-popup-details');
    const closeBtn = document.querySelector('.side-project-close-btn');

    if (!popup || !popupDetails || !closeBtn) {
      console.warn('Modal elements not found');
      return;
    }

    // Add click event listeners to all project cards
    const projectCards = document.querySelectorAll('.side-project-card');
    projectCards.forEach(function(card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        // Don't open modal if clicking on a link
        if (e.target.tagName === 'A') {
          return;
        }

        const projectId = parseInt(card.getAttribute('data-project-id'));
        currentProject = projectsData[projectId];
        currentLanguage = 'en'; // Reset to English on open
        openPopup(currentProject);
      });
    });

    // Close button click handler
    closeBtn.addEventListener('click', closePopup);

    // Close when clicking outside the popup content
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        closePopup();
      }
    });

    // Close on ESC key press
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('show')) {
        closePopup();
      }
    });

    // Language toggle handler (delegate event)
    popupDetails.addEventListener('click', function(e) {
      if (e.target.classList.contains('lang-toggle-btn')) {
        e.preventDefault();
        currentLanguage = currentLanguage === 'en' ? 'ko' : 'en';
        renderPopupContent(currentProject);
      }
    });

    // Open popup function
    function openPopup(project) {
      // Save current scroll position
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      renderPopupContent(project);
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPosition + 'px';
      document.body.style.width = '100%';
    }

    // Close popup function
    function closePopup() {
      popup.classList.remove('show');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }

    // Render popup content based on current language
    function renderPopupContent(project) {
      const isKorean = currentLanguage === 'ko';

      // Language toggle button
      const langButtonText = isKorean ? 'English' : '한국어';
      let htmlContent = '<button class="lang-toggle-btn">' + langButtonText + '</button>';

      // Title
      const title = isKorean && project.titleKo ? project.titleKo : project.title;
      htmlContent += '<h2>' + escapeHtml(title) + '</h2>';

      // Add image if exists
      if (project.image) {
        htmlContent += '<img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(title) + '">';
      }

      // Add period and organization
      const period = isKorean && project.periodKo ? project.periodKo : project.period;
      const organization = isKorean && project.organizationKo ? project.organizationKo : project.organization;

      if (period || organization) {
        htmlContent += '<div class="popup-meta">';
        if (period) {
          htmlContent += '<span class="popup-period">' + escapeHtml(period) + '</span>';
        }
        if (period && organization) {
          htmlContent += ' &bull; ';
        }
        if (organization) {
          htmlContent += '<span class="popup-organization">' + escapeHtml(organization) + '</span>';
        }
        htmlContent += '</div>';
      }

      // Add detailed description
      const description = isKorean && project.detailedDescriptionKo ?
                         project.detailedDescriptionKo :
                         project.detailedDescription;

      if (description) {
        // Convert newlines to <br> tags
        const formattedDescription = description.replace(/\n/g, '<br>');
        htmlContent += '<div class="popup-description">' + formattedDescription + '</div>';
      }

      // Add tags/technologies
      if (project.tags && project.tags.length > 0) {
        htmlContent += '<ul class="tech-stack">';
        project.tags.forEach(function(tag) {
          htmlContent += '<li>' + escapeHtml(tag) + '</li>';
        });
        htmlContent += '</ul>';
      }

      // Add GitHub link if exists
      if (project.link) {
        htmlContent += '<a href="' + escapeHtml(project.link) + '" target="_blank" rel="noreferrer" class="github-link">';
        htmlContent += '<i class="fab fa-github"></i> View on GitHub';
        htmlContent += '</a>';
      }

      popupDetails.innerHTML = htmlContent;
    }

    // Utility function to escape HTML
    function escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  });
})();

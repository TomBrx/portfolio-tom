function toggleSection(element) {
            // Fermer toutes les autres sections
            const allSections = document.querySelectorAll('.section-button');
            allSections.forEach(section => {
                if (section !== element) {
                    section.classList.remove('expanded');
                }
            });

            // Toggle la section cliquée
            element.classList.toggle('expanded');
        }

        // Empêcher la propagation du clic sur les liens
        document.addEventListener('click', function(e) {
            if (e.target.closest('.project-link') || e.target.closest('.download-link')) {
                e.stopPropagation();
            }
        });
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Function to handle section switching
    function switchSection(targetId) {
        // Remove active class from all sections and links
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to target section and corresponding link
        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);

        if (targetSection && targetLink) {
            targetSection.classList.add('active');
            targetLink.classList.add('active');
            
            // Update document title for better context
            document.title = `My Hub | ${targetLink.querySelector('span:not(.material-symbols-outlined)').textContent}`;
        } else {
            // Default to home if not found
            document.getElementById('home').classList.add('active');
            document.querySelector('.nav-link[data-target="home"]').classList.add('active');
        }

        // Close sidebar on mobile after clicking a link
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    }

    // Handle hash changes in URL
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchSection(hash);
        } else {
            switchSection('home');
        }
    }

    // Initial check on load
    handleHashChange();

    // Listen for hash changes (e.g. user clicking back/forward in browser)
    window.addEventListener('hashchange', handleHashChange);

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Add smooth hover effects for cards (optional JS enhancements)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Can add dynamic glowing effects based on mouse position here
        });
    });
});

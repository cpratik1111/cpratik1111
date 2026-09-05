document.addEventListener('DOMContentLoaded', async () => {
    const navList = document.getElementById('nav-list');
    const contentContainer = document.getElementById('content-container');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        const isLightTheme = theme !== 'dark';
        document.documentElement.dataset.theme = isLightTheme ? 'light' : 'dark';

        if (themeToggle) {
            themeToggle.setAttribute('aria-label', isLightTheme ? 'Switch to dark theme' : 'Switch to light theme');
            themeToggle.querySelector('.material-symbols-outlined').textContent = isLightTheme ? 'dark_mode' : 'light_mode';
        }
    }

    setTheme(localStorage.getItem('theme') || 'light');

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    });

    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    try {
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error('Content data could not be loaded.');
        }

        const data = await response.json();
        renderNavigation(data.sections);
        renderContent(data);
        setupNavigation();
    } catch (error) {
        contentContainer.innerHTML = '<p class="loading-message">Content could not be loaded.</p>';
    }

    function renderNavigation(sections) {
        navList.innerHTML = `
            <li>
                <a href="#home" class="nav-link" data-target="home">
                    <span class="material-symbols-outlined">home</span>
                    <span>Home</span>
                </a>
            </li>
            ${sections.map(section => `
                <li>
                    <a href="#${section.id}" class="nav-link" data-target="${section.id}">
                        <span class="material-symbols-outlined">${section.icon}</span>
                        <span>${section.title}</span>
                    </a>
                </li>
            `).join('')}
        `;
    }

    function renderContent(data) {
        contentContainer.innerHTML = `
            <section id="home" class="content-section">
                <div class="hero">
                    <h2 class="gradient-text">${data.home.title}</h2>
                    <p class="subtitle">${data.home.description}</p>
                </div>
                <div class="cards-grid">
                    ${data.sections.map(section => `
                        <div class="card" onclick="location.hash='${section.id}'">
                            <span class="material-symbols-outlined card-icon">${section.icon}</span>
                            <h3>${section.title}</h3>
                            <p>${section.description}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            ${data.sections.map(renderSection).join('')}
        `;
    }

    function renderSection(section) {
        const sectionTitle = section.markdown
            ? `<a href="${markdownUrl(section.markdown)}" class="markdown-title">${section.title}</a>`
            : section.title;

        return `
            <section id="${section.id}" class="content-section">
                <div class="section-header">
                    <span class="material-symbols-outlined section-icon">${section.icon}</span>
                    <h2>${sectionTitle}</h2>
                </div>
                <p class="section-desc">${section.description}</p>
                <div class="list-container">
                    ${section.articles.map(article => `
                        <div class="list-item">
                            <div class="item-content">
                                <h4><a href="${articleUrl(article)}" class="markdown-title"${externalAttributes(article)}>${article.title}</a></h4>
                                <p>${article.description}</p>
                            </div>
                            <a href="${articleUrl(article)}" class="item-link"${externalAttributes(article)}>${article.markdown ? 'Read' : 'Visit'}</a>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    function articleUrl(article) {
        return article.markdown ? markdownUrl(article.markdown) : article.url || '#';
    }

    function markdownUrl(path) {
        return `markdown.html?file=${encodeURIComponent(path)}`;
    }

    function externalAttributes(article) {
        return article.url ? ' target="_blank" rel="noopener"' : '';
    }

    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');

        function switchSection(targetId) {
            const targetSection = document.getElementById(targetId) || document.getElementById('home');
            const activeId = targetSection.id;

            sections.forEach(section => {
                section.classList.toggle('active', section.id === activeId);
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.target === activeId);
            });

            document.title = activeId === 'home'
                ? 'My Hub | Home'
                : `My Hub | ${targetSection.querySelector('h2').textContent}`;

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        }

        function handleHashChange() {
            switchSection(window.location.hash.substring(1) || 'home');
        }

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
    }
});
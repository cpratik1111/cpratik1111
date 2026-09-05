document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('markdown-content');
    const filePath = new URLSearchParams(window.location.search).get('file');

    function setTheme(theme) {
        document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    }

    setTheme(localStorage.getItem('theme') || 'light');

    if (!filePath || !filePath.startsWith('docs/') || filePath.includes('..')) {
        content.innerHTML = '<p class="error">This documentation page could not be found.</p>';
        return;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Unable to load ${filePath}`);
        }

        const markdown = await response.text();
        content.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
        document.title = `My Hub | ${content.querySelector('h1')?.textContent || 'Documentation'}`;

        const directory = filePath.slice(0, filePath.lastIndexOf('/') + 1);
        content.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.md') && !href.startsWith('http')) {
                const targetPath = `${directory}${href}`;
                link.href = `markdown.html?file=${encodeURIComponent(targetPath)}`;
            }
        });
    } catch (error) {
        content.innerHTML = '<p class="error">This documentation page could not be loaded.</p>';
    }
});

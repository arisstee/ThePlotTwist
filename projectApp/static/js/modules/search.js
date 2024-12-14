// Search functionality
export const initSearch = () => {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    const performSearch = (query) => {
        // Mock search results - replace with actual search logic
        const results = [
            { title: 'The Catfather', author: 'Mario Purrzo' },
            { title: 'A Catwork Orange', author: 'Anthony Burghiss' },
            { title: 'The Catcher in the Rye', author: 'J.C. Salinger' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.author.toLowerCase().includes(query.toLowerCase())
        );

        return results;
    };

    const displayResults = (results) => {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        const html = results.map(result => `
            <div class="search-result-item">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-author">${result.author}</div>
            </div>
        `).join('');

        searchResults.innerHTML = html;
    };

    // Handle search input
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();
        
        if (query.length === 0) {
            searchResults.classList.remove('active');
            return;
        }

        debounceTimer = setTimeout(() => {
            const results = performSearch(query);
            displayResults(results);
            searchResults.classList.add('active');
        }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            const results = performSearch(query);
            displayResults(results);
            searchResults.classList.add('active');
        }
    });
};
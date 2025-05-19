// 搜索功能
function setupSearch() {
    const searchInput = document.getElementById('guess-id');
    const searchResults = document.getElementById('search-results');
    let timeoutId;

    searchInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        const query = this.value.trim();
        
        if (query.length === 0) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        timeoutId = setTimeout(() => {
            const results = window.songList.filter(song => 
                song.id < 100000 && (
                    song.id.toString().includes(query) || 
                    song.name.toLowerCase().includes(query.toLowerCase())
                )
            ).slice(0, 10);

            if (results.length > 0) {
                searchResults.innerHTML = results.map(song => `
                    <div class="search-result-item" data-id="${song.id}">
                        <div class="song-id">#${song.id}</div>
                        <div class="song-name">${song.name}</div>
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item">没有找到匹配的歌曲</div>';
                searchResults.classList.add('active');
            }
        }, 300);
    });

    searchResults.addEventListener('click', function(e) {
        const resultItem = e.target.closest('.search-result-item');
        if (resultItem && resultItem.dataset.id) {
            searchInput.value = resultItem.dataset.id;
            searchResults.classList.remove('active');
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}
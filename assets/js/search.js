// DOM元素
let searchInput;
let resultsContainer;

// 在DOM加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    searchInput = document.getElementById('guess-id');
    resultsContainer = document.getElementById('search-results');
    
    // 添加输入事件监听器
    searchInput.addEventListener('input', searchMatches);
    
    // 点击筛选框外部时隐藏筛选框
    document.addEventListener('click', (event) => {
        if (!resultsContainer.contains(event.target) && event.target !== searchInput) {
            resultsContainer.style.display = 'none';
        }
    });
});

// 搜索匹配项
function searchMatches() {
    const input = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";
    
    if (!input) {
        resultsContainer.style.display = "none";
        return;
    }

    const matches = Object.keys(musicInfo).filter(key => {
        const music = musicInfo[key];
        const musicAlias = music_alias[key];
        return (
            key.toLowerCase().includes(input) ||
            music.title.toLowerCase().includes(input) ||
            (Array.isArray(musicAlias) && musicAlias.some(alias => alias.toLowerCase().includes(input)))
        );
    }).map(key => {
        const music = musicInfo[key];
        return `<div class="search-result" onclick="selectMatch('${key}')">${music.title} (ID: ${key})</div>`;
    });

    if (matches.length > 0) {
        resultsContainer.innerHTML = matches.join("");
        resultsContainer.style.display = "block";
    } else {
        resultsContainer.style.display = "none";
    }
}

// 选择匹配项
function selectMatch(id) {
    searchInput.value = id;
    resultsContainer.style.display = "none";
}
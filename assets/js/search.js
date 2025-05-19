// 搜索匹配项
function searchMatches() {
    const input = document.getElementById("guess-id").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // 清空之前的搜索结果

    if (!input) {
        resultsContainer.style.display = "none";
        return;
    }

    const matches = Object.keys(music_alias)
    .filter(key => {
        const music = music_alias[key];
        const aliases = music.alias || [];
        return (
            key.toLowerCase().includes(input) ||
            music.title.toLowerCase().includes(input) ||
            aliases.some(alias => alias.toLowerCase().includes(input))
        );
    })
    .map(key => {
        const music = music_alias[key];
        return `
            <div class="search-result-item" data-id="${key}" onclick="selectMatch('${key}')">
                <div class="song-id">#${key}</div>
                <div class="song-name">${music.title}</div>
            </div>
        `;
    });

    if (matches.length > 0) {
        resultsContainer.innerHTML = matches.join("");
        resultsContainer.style.display = "block";
    } else {
        resultsContainer.style.display = "none";
    }
}

// 点击筛选框外部时隐藏筛选框
document.addEventListener("click", (event) => {
    const resultsContainer = document.getElementById("search-results");
    const inputField = document.getElementById("guess-id");
    
    if (!resultsContainer.contains(event.target) && event.target !== inputField) {
        resultsContainer.style.display = "none";
    }
});

// 选择匹配项
function selectMatch(id) {
    document.getElementById("guess-id").value = id;
    document.getElementById("search-results").style.display = "none";
    // 显示猜测提示框
    document.getElementById("hints-container").style.display = "block";
}

// 初始化时隐藏猜测提示框
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("hints-container").style.display = "none";
});
// 搜索匹配项
function searchMatches() {
    const input = document.getElementById("guess-id").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // 清空之前的搜索结果

    if (!input || !music_alias) {
        resultsContainer.style.display = "none";
        return;
    }

    // 进行搜索匹配并计算相关度
    const matches = Object.keys(music_alias)
        .map(key => {
            const music = music_alias[key];
            const aliases = music.alias || [];
            let score = 0;
            
            // 计算匹配分数
            if (key.toLowerCase() === input) {
                score += 150; // ID完全一致得分最高
            } else if (key.toLowerCase().includes(input)) {
                score += 100; // ID部分匹配
            }
            
            if (music.title.toLowerCase() === input) {
                score += 120; // 标题完全一致
            } else if (music.title.toLowerCase().includes(input)) {
                score += 80; // 标题部分匹配
            }
            
            aliases.forEach(alias => {
                if (alias.toLowerCase() === input) {
                    score += 120; // 别名完全一致
                } else if (alias.toLowerCase().includes(input)) {
                    score += 60; // 别名部分匹配
                }
            });
            
            return { key, music, score };
        })
        .filter(item => item.score > 0) // 只保留有匹配结果的
        .sort((a, b) => b.score - a.score); // 按分数从高到低排序

    // 显示匹配结果
    if (matches.length > 0) {
        resultsContainer.innerHTML = matches.map(({ key, music }) => `
            <div class="search-result-item" data-id="${key}" onclick="selectMatch('${key}')">
                <div class="song-id">#${key}</div>
                <div class="song-name">${music.title}</div>
            </div>
        `).join("");
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
}
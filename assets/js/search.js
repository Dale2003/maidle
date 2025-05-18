// 搜索匹配项
function searchMatches() {
    const input = document.getElementById("guess-id").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // 清空之前的搜索结果

    if (!input) {
        resultsContainer.style.display = "none";
        return;
    }

    const matches = Object.keys(musicInfo)
        .filter(key => {
            const music = musicInfo[key];
            const musicAlias = music_alias[key]; 
            const Alias = musicAlias['Alias'] || []; // 确保别名存在
            // 打印出来musicAlias
            console.log(`musicAlias for ${key}:`, musicAlias);
            // 检查 ID、标题和别名是否包含输入
            for (const alias of Alias) {
                if (alias.toLowerCase().includes(input)) {
                    return true;
                }
            }
            return (
                key.toLowerCase().includes(input) || 
                music.title.toLowerCase().includes(input)
            );
        })
        .map(key => {
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
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
        const aliases = music_alias[key]?.Alias || []; // 使用可选链简化逻辑
        
        // 获取输入的小写形式，只计算一次
        const lowercasedInput = input.toLowerCase();
        
        // 检查ID和标题
        if (key.toLowerCase().includes(lowercasedInput) || 
            music.title.toLowerCase().includes(lowercasedInput)) {
            return true;
        }
        
        // 使用some方法检查别名，找到匹配项就立即返回
        return aliases.some(alias => alias.toLowerCase().includes(lowercasedInput));
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
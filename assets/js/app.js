// 全局变量
let musicInfo = {};  // 存储音乐信息
let alias = {};      // 存储别名信息
let music_alias = {}; // 存储音乐别名
let targetMusic = null; // 目标音乐
let isPlaying = false;  // 游戏状态
let guesses = [];       // 猜测历史
let hintsList = [];     // 提示列表
let guessedIds = [];    // 已猜测的ID

// 版本ID映射
const versionToId = {
    "maimai": 1, "maimai PLUS": 2, "maimai GreeN": 3, "maimai GreeN PLUS": 4,
    "maimai ORANGE": 5, "maimai ORANGE PLUS": 6, "maimai PiNK": 7, "maimai PiNK PLUS": 8,
    "maimai MURASAKi": 9, "maimai MURASAKi PLUS": 10, "maimai MiLK": 11, "MiLK PLUS": 12,
    "maimai FiNALE": 13, "舞萌DX": 14, "舞萌DX2021": 15, "舞萌DX2022": 16,
    "舞萌DX2023": 17, "舞萌DX2024": 18
};

// 加载游戏数据
async function loadGameData() {
    const loadingDiv = document.getElementById("loading");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    // 加载数据的分步进度
    const steps = [
        { task: "加载音乐信息", fetch: fetch("data/music_info.json") },
        { task: "加载别名信息", fetch: fetch("data/alias.json") },
        { task: "加载音乐别名", fetch: fetch("data/all_data.json") }
    ];

    let progress = 0;
    const stepIncrement = 100 / steps.length;

    for (const step of steps) {
        try {
            const response = await step.fetch;
            if (step.task === "加载音乐信息") {
                musicInfo = await response.json();
            } else if (step.task === "加载别名信息") {
                alias = await response.json();
            } else if (step.task === "加载音乐别名") {
                music_alias = await response.json();
            }
            progress += stepIncrement;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        } catch (error) {
            console.error(`${step.task}失败:`, error);
            loadingDiv.textContent = `${step.task}失败，请刷新页面重试！`;
            throw error;
        }
    }
    document.getElementById("loading").style.display = "none";
    document.getElementById("game-container").style.display = "block";
}

// 修改初始化部分，确保游戏状态正确重置
window.onload = async () => {
    // 显示加载提示
    const loadingDiv = document.getElementById("loading");
    const gameContainer = document.getElementById("game-container");
    isPlaying = false; // 确保游戏状态初始化为未开始

    try {
        await loadGameData(); // 加载游戏数据
        loadingDiv.style.display = "none"; // 隐藏加载提示
        gameContainer.style.display = "block"; // 显示游戏内容
        
        // 显示初始提示信息
        document.getElementById("message").innerHTML = "<p>点击\"开始游戏\"按钮开始游戏，可以选择不同的难度范围。</p>";
    } catch (error) {
        loadingDiv.textContent = "加载失败，请刷新页面重试！";
        console.error("加载游戏数据时出错：", error);
    }

    // 添加事件监听器
    document.getElementById("start-game").addEventListener("click", startGame);
    document.getElementById("submit-guess").addEventListener("click", submitGuess);
    document.getElementById("quit-game").addEventListener("click", quitGame);
    
    // 初始化搜索功能
    document.getElementById("guess-id").addEventListener("input", searchMatches);
    
    // 初始化关于模态框
    const aboutButton = document.getElementById("about-button");
    const aboutModal = document.getElementById("about-modal");
    const modalOverlay = document.getElementById("modal-overlay");
    const closeAbout = document.getElementById("close-about");

    aboutButton.addEventListener("click", () => {
        aboutModal.style.display = "block";
        modalOverlay.style.display = "block";
    });

    closeAbout.addEventListener("click", () => {
        aboutModal.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalOverlay.addEventListener("click", () => {
        aboutModal.style.display = "none";
        modalOverlay.style.display = "none";
    });
};
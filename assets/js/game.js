// 开始游戏
function startGame() {
    // 如果游戏正在进行，先确认是否要重新开始
    if (isPlaying) {
        if (confirm("游戏正在进行中，确定要开始新游戏吗？")) {
            resetGame(); // 重置游戏状态
        } else {
            return; // 用户取消，继续当前游戏
        }
    }

    const range = document.getElementById("difficulty-range").value;
    const keys = Object.keys(musicInfo).filter(key => {
        const music = musicInfo[key];
        if (range === "13") {
            return music.charts.expert.level >= 13.0;
        } else if (range === "13+") {
            return music.charts.expert.level >= 13.7;
        } else if (range === "14") {
            return music.charts.expert.level >= 14.0;
        } else if (range === "14+") {
            return music.charts.expert.level >= 14.7;
        }
        return true; // 无限制
    });

    if (keys.length === 0) {
        document.getElementById("message").innerHTML = "<p>没有符合条件的曲目，请选择其他范围！</p>";
        return;
    }

    const randomIndex = Math.floor(Math.random() * keys.length);
    targetMusic = musicInfo[keys[randomIndex]];
    isPlaying = true;
    guesses = [];
    hintsList = [];
    guessedIds = [];
    
    document.getElementById("message").innerHTML = "<p>游戏开始！你一共有十次机会猜曲目，每猜一次会给出提示。</p>";
    document.getElementById("hints-container").innerHTML = "";
}

// 提交猜测
function submitGuess() {
    if (!isPlaying) {
        document.getElementById("message").innerHTML = "<p>游戏未开始，请先开始游戏！</p>";
        return;
    }
    
    let guessId = document.getElementById("guess-id").value.trim();
    if (!guessId) {
        document.getElementById("message").innerHTML = "<p>请输入曲目 ID 或别名。</p>";
        return;
    }

    let guessData = musicInfo[guessId];
    if (!guessData) {
        if (alias[guessId]) {
            if (alias[guessId].length > 1) {
                const matches = alias[guessId]
                    .map(item => `ID: ${item.id}, 标题: ${item.name}`)
                    .join("<br>");
                document.getElementById("message").innerHTML = `<p>别名有多个匹配，请输入具体的曲目 ID：<br>${matches}</p>`;
                return;
            } else {
                guessId = alias[guessId][0].id.toString();
                guessData = musicInfo[guessId];
                if (!guessData) {
                    document.getElementById("message").innerHTML = "<p>曲目不存在，请重新输入。</p>";
                    return;
                }
            }
        } else {
            document.getElementById("message").innerHTML = "<p>曲目不存在，请重新输入。</p>";
            return;
        }
    }

    if (guessedIds.includes(guessId)) {
        document.getElementById("message").innerHTML = "<p>你已经猜过这个曲目了，请重新输入。</p>";
        return;
    }

    guessedIds.push(guessId);
    guesses.push(`ID: ${guessId}, 标题: ${guessData.title}`);
    
    const hints = getHint(targetMusic, guessData);
    hintsList.push(hints);

    // 清空输入框
    document.getElementById("guess-id").value = "";

    if (targetMusic.id === guessData.id) {
        isPlaying = false;
        document.getElementById("message").innerHTML = "<p>🎉 恭喜你，猜对了！🎉</p>";
        renderHints();
        return;
    }

    if (guesses.length >= 10) {
        isPlaying = false;
        document.getElementById("message").innerHTML = `<p>你已经猜错10次，游戏结束！正确答案是 ${targetMusic.id}：${targetMusic.title}</p>`;
        renderHints();
        return;
    }

    document.getElementById("message").innerHTML = "<p>继续猜测！</p>";
    renderHints();
}

// 获取提示信息
function getHint(target, guess) {
    const hints = [];
    
    // 基本信息提示
    hints.push(`ID: ${target.id === guess.id ? "√ " : ""}${guess.id}`);
    hints.push(`类型: ${target.type === guess.type ? "√ " : ""}${guess.type}`);
    hints.push(`标题: ${target.title === guess.title ? "√ " : ""}${guess.title}`);
    hints.push(`艺术家: ${target.artist === guess.artist ? "√ " : ""}${guess.artist}`);
    hints.push(`流派: ${target.genre === guess.genre ? "√ " : ""}${guess.genre}`);
    hints.push(`版本: ${target.version === guess.version ? "√ " : versionToId[target.version] > versionToId[guess.version] ? "→ 早了 " : "← 晚了 "}${guess.version}`);
    hints.push(`BPM: ${target.bpm === guess.bpm ? "√ " : target.bpm > guess.bpm ? "↑ 低了 " : "↓ 高了 "}${guess.bpm}`);

    // 红谱定数提示
    let expflag = 0;
    if (target.charts.master && guess.charts.master) {
        if (target.charts.master.level === guess.charts.master.level) {
            expflag = 1;
        }
        
        if (target.charts.master.level === guess.charts.master.level) {
            hints.push(`红谱等级: ${expflag ? "↕ " : "√ "}${guess.charts.master.level}`);
        } else if (target.charts.master.level > guess.charts.master.level) {
            hints.push(`红谱等级: ${expflag ? "↑ ↕低了 " : "↑ 低了 "}${guess.charts.master.level}`);
        } else {
            hints.push(`红谱等级: ${expflag ? "↓ ↕高了 " : "↓ 高了 "}${guess.charts.master.level}`);
        }
    } else {
        if (target.charts.master && !guess.charts.master) {
            hints.push(`红谱等级: ↑ 没有红谱`);
        } else if (!target.charts.master && guess.charts.master) {
            hints.push(`红谱等级: ↓ ${guess.charts.master.level}`);
        } else {
            hints.push(`红谱等级: √ 没有红谱`);
        }
    }

    // 紫谱定数提示
    let lvflag = 0;
    if (target.charts.expert.level === guess.charts.expert.level) {
        lvflag = 1;
    }
    
    if (target.charts.expert.level === guess.charts.expert.level) {
        hints.push(`紫谱等级: ${lvflag ? "↕ " : "√ "}${guess.charts.expert.level}`);
    } else if (target.charts.expert.level > guess.charts.expert.level) {
        hints.push(`紫谱等级: ${lvflag ? "↑ ↕低了 " : "↑ 低了 "}${guess.charts.expert.level}`);
    } else {
        hints.push(`紫谱等级: ${lvflag ? "↓ ↕高了 " : "↓ 高了 "}${guess.charts.expert.level}`);
    }

    // 紫谱谱师提示
    if (target.charts.expert.charter === guess.charts.expert.charter) {
        hints.push(`紫谱谱师: √ ${guess.charts.expert.charter}`);
    } else {
        hints.push(`紫谱谱师: ${guess.charts.expert.charter}`);
    }

    // 紫谱绝赞数量提示
    if (target.charts.expert.silverCount === guess.charts.expert.silverCount) {
        hints.push(`紫谱绝赞数量: √ ${guess.charts.expert.silverCount}`);
    } else if (target.charts.expert.silverCount > guess.charts.expert.silverCount) {
        hints.push(`紫谱绝赞数量: ↑ 少了 ${guess.charts.expert.silverCount}`);
    } else {
        hints.push(`紫谱绝赞数量: ↓ 多了 ${guess.charts.expert.silverCount}`);
    }

    return hints;
}

// 渲染提示
function renderHints() {
    const hintsContainer = document.getElementById("hints-container");
    hintsContainer.innerHTML = "";
    
    hintsList.forEach((hintSet, index) => {
        const guessBlock = document.createElement("div");
        guessBlock.className = "guess-block";

        // 上方部分：左侧（猜测标题和第一条提示）和右侧（曲绘）
        const topBlock = document.createElement("div");
        topBlock.className = "guess-top";

        // 左侧部分：猜测标题和第一条提示
        const leftBlock = document.createElement("div");
        leftBlock.className = "guess-left";

        const guessTitle = document.createElement("strong");
        guessTitle.className = "guess-title";
        guessTitle.textContent = `猜测 ${index + 1}:`;
        leftBlock.appendChild(guessTitle);

        [0, 1].forEach(i => {
            if (hintSet[i]) {  // 确保提示存在
                const hint = document.createElement("p");
                hint.className = hintSet[i].includes("√") ? "hint-line hint-correct" : 
                                hintSet[i].includes("↕") ? "hint-line hint-partial" : 
                                "hint-line hint-incorrect";
                hint.textContent = hintSet[i].replace("√ ", "").replace("↕ ", "");
                leftBlock.appendChild(hint);
            }
        });

        // 右侧部分：曲绘
        const jacketImg = document.createElement("img");
        jacketImg.className = "jacket-img";
        const guessId = guessedIds[index];
        const jacketId = guessId % 10000; // 计算曲绘 ID
        jacketImg.src = `https://assets2.lxns.net/maimai/jacket/${jacketId}.png`;
        jacketImg.alt = "曲绘";
        jacketImg.onerror = function() {
            this.src = "assets/img/default-jacket.png"; // 添加默认图片用于加载失败情况
        };

        // 将左侧和右侧部分组合到上方部分
        topBlock.appendChild(leftBlock);
        topBlock.appendChild(jacketImg);

        // 下方部分：剩余的提示内容
        const bottomBlock = document.createElement("div");
        bottomBlock.className = "guess-bottom";
        
        if (hintSet.length > 2) {  // 确保有更多提示
            hintSet.slice(2).forEach(hint => {
                if (hint) {  // 确保提示存在
                    const hintLine = document.createElement("p");
                    hintLine.className = hint.includes("√ ") ? "hint-line hint-correct" : 
                                        hint.includes("↕") ? "hint-line hint-partial" : 
                                        "hint-line hint-incorrect";
                    hintLine.textContent = hint.replace("√ ", "").replace("↕ ", "");
                    bottomBlock.appendChild(hintLine);
                }
            });
        }

        // 将上方部分和下方部分组合到整个块
        guessBlock.appendChild(topBlock);
        guessBlock.appendChild(bottomBlock);

        hintsContainer.appendChild(guessBlock);
    });
}

// 退出游戏
function quitGame() {
    if (!isPlaying) {
        document.getElementById("message").innerHTML = "<p>当前没有正在进行的游戏。</p>";
        return;
    }
    
    isPlaying = false;
    document.getElementById("message").innerHTML = `<p>游戏结束，正确答案是 ${targetMusic.id}：${targetMusic.title}</p>`;
}

// 重置游戏状态
function resetGame() {
    isPlaying = false;
    targetMusic = null;
    guesses = [];
    hintsList = [];
    guessedIds = [];
    document.getElementById("hints-container").innerHTML = "";
    document.getElementById("message").innerHTML = "<p>游戏已重置，点击\"开始游戏\"按钮开始新游戏。</p>";
}
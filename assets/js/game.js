// 开始游戏
function startGame() {
    if (isPlaying) {
        alert("游戏正在进行中，请先结束游戏！");
        return;
    }

    isPlaying = true;
    const difficultyRange = document.getElementById("difficulty-range").value;
    let validMusicIds = Object.keys(musicInfo);

    // 根据选择的难度范围筛选曲目
    if (difficultyRange !== "unlimited") {
        if (difficultyRange === "13") {
            validMusicIds = validMusicIds.filter(id => musicInfo[id].charts.expert.level >= 13.0);
        } else if (difficultyRange === "13+") {
            validMusicIds = validMusicIds.filter(id => musicInfo[id].charts.expert.level >= 13.7);
        } else if (difficultyRange === "14") {
            validMusicIds = validMusicIds.filter(id => musicInfo[id].charts.expert.level >= 14.0);
        } else if (difficultyRange === "14+") {
            validMusicIds = validMusicIds.filter(id => musicInfo[id].charts.expert.level >= 14.7);
        }
    }

    // 随机选择一个有效曲目
    const randomIndex = Math.floor(Math.random() * validMusicIds.length);
    const targetId = validMusicIds[randomIndex];
    targetMusic = musicInfo[targetId];
    guesses = [];
    hintsList = [];
    guessedIds = [];
    document.getElementById("message").innerText = "游戏开始！你一共有十次机会猜曲目，每猜一次会给出提示，提示包括标题、类型、艺术家、流派、版本、BPM、红紫谱定数、紫谱谱师、紫谱绝赞数量。绿色代表正确，定数黄色代表等级正确。";
    document.getElementById("hints-container").innerHTML = "";
}

// 提交猜测
function submitGuess() {
    if (!isPlaying) {
        document.getElementById("message").innerText = "请先点击"开始游戏"按钮开始游戏。";
        return;
    }

    if (guesses.length >= 10) {
        document.getElementById("message").innerText = "你已经用完了所有10次猜测机会。";
        return;
    }

    let guessId = document.getElementById("guess-id").value.trim();
    let guessData = musicInfo[guessId];

    // 检查是否存在这个曲目ID
    if (!guessData) {
        // 尝试通过别名查找
        if (guessId in alias) {
            if (alias[guessId].length > 1) {
                const matches = alias[guessId]
                    .map(item => `ID: ${item.id}, 标题: ${item.name}`)
                    .join("<br>");
                document.getElementById("message").innerHTML = `别名有多个匹配，请输入具体的曲目 ID：<br>${matches}`;
                return;
            } else {
                guessId = alias[guessId][0].id.toString();
                guessData = musicInfo[guessId];
                if (!guessData) {
                    document.getElementById("message").innerText = "曲目不存在，请重新输入。";
                    return;
                }
            }
        } else {
            document.getElementById("message").innerText = "曲目不存在，请重新输入。";
            return;
        }
    }

    if (guessedIds.includes(guessId)) {
        document.getElementById("message").innerText = "你已经猜过这个曲目了，请重新输入。";
        return;
    }

    guessedIds.push(guessId);
    guesses.push(guessData);

    const hints = getHint(targetMusic, guessData);
    hintsList.push(hints);

    renderHints();
    document.getElementById("guess-id").value = "";

    if (targetMusic.id === guessData.id) {
        isPlaying = false;
        document.getElementById("message").innerText = `恭喜你猜对了！正确答案是 ${targetMusic.id}：${targetMusic.title}`;
        return;
    }

    if (guesses.length >= 10) {
        isPlaying = false;
        document.getElementById("message").innerText = `游戏结束，正确答案是 ${targetMusic.id}：${targetMusic.title}`;
    }
}

// 获取提示
function getHint(target, guess) {
    const hints = [];
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
            hints.push(`红谱等级: ↕ ${guess.charts.master.level}`);
            expflag = 1;
        } else {
            hints.push(`红谱等级: ${target.charts.master.level > guess.charts.master.level ? "↑ 低了 " : "↓ 高了 "}${guess.charts.master.level}`);
        }
    } else {
        if (target.charts.master && !guess.charts.master) {
            hints.push(`红谱等级: ↑ 没有红谱`);
        } else if (!target.charts.master && guess.charts.master) {
            hints.push(`红谱等级: ↓ ${guess.charts.master.level}`);
        } else {
            hints.push(`红谱等级: √ 没有红谱`);
            expflag = 1;
        }
    }

    // 紫谱定数提示
    if (target.charts.expert.level === guess.charts.expert.level) {
        hints.push(`紫谱等级: ↕ ${guess.charts.expert.level}`);
    } else {
        hints.push(`紫谱等级: ${target.charts.expert.level > guess.charts.expert.level ? "↑ 低了 " : "↓ 高了 "}${guess.charts.expert.level}`);
    }

    // 紫谱谱师
    hints.push(`紫谱谱师: ${target.charts.expert.charter === guess.charts.expert.charter ? "√ " : ""}${guess.charts.expert.charter}`);

    // 紫谱绝赞数量
    if (target.charts.expert.silverCount === guess.charts.expert.silverCount) {
        hints.push(`紫谱绝赞数: √ ${guess.charts.expert.silverCount}`);
    } else {
        hints.push(`紫谱绝赞数: ${target.charts.expert.silverCount > guess.charts.expert.silverCount ? "↑ 少了 " : "↓ 多了 "}${guess.charts.expert.silverCount}`);
    }

    return hints;
}

// 渲染提示
function renderHints() {
    const hintsContainer = document.getElementById("hints-container");
    hintsContainer.innerHTML = "";
    hintsList.forEach((hintSet, index) => {
        const guessBlock = document.createElement("div");
        guessBlock.style.display = "flex";
        guessBlock.style.flexDirection = "column";
        guessBlock.style.marginBottom = "20px";

        // 上方部分：左侧（猜测标题和第一条提示）和右侧（曲绘）
        const topBlock = document.createElement("div");
        topBlock.style.display = "flex";
        topBlock.style.alignItems = "flex-start";

        // 左侧部分：猜测标题和第一条提示
        const leftBlock = document.createElement("div");
        leftBlock.style.display = "flex";
        leftBlock.style.flexDirection = "column";

        const guessTitle = document.createElement("strong");
        guessTitle.textContent = `猜测 ${index + 1}:`;
        guessTitle.style.margin = "8px 0 5px 0";
        leftBlock.appendChild(guessTitle);

        [0, 1].forEach(i => {
            const hint = document.createElement("p");
            hint.style.color = hintSet[i].includes("√") ? "green" : hintSet[i].includes("↕") ? "orange" : "grey";
            hint.style.margin = "14px 0 0 0"; 
            hint.textContent = hintSet[i].replace("√", "").replace("↕", "");
            leftBlock.appendChild(hint);
        });

        // 右侧部分：曲绘
        const jacketImg = document.createElement("img");
        const guessId = guessedIds[index];
        const jacketId = guessId % 10000; // 计算曲绘 ID
        jacketImg.src = `https://assets2.lxns.net/maimai/jacket/${jacketId}.png`;
        jacketImg.alt = "曲绘";
        jacketImg.style.width = "80px";
        jacketImg.style.height = "80px";
        jacketImg.style.marginLeft = "10px";

        // 将左侧和右侧部分组合到上方部分
        topBlock.appendChild(leftBlock);
        topBlock.appendChild(jacketImg);

        // 下方部分：剩余的提示内容
        const bottomBlock = document.createElement("div");
        hintSet.slice(2).forEach(hint => {
            const hintLine = document.createElement("p");
            hintLine.style.color = hint.includes("√") ? "green" : hint.includes("↕") ? "orange" : "grey";
            hintLine.textContent = hint.replace("√", "").replace("↕", "");
            bottomBlock.appendChild(hintLine);
        });

        // 将上方部分和下方部分组合到整个块
        guessBlock.appendChild(topBlock);
        guessBlock.appendChild(bottomBlock);

        hintsContainer.appendChild(guessBlock);
    });
}

// 退出游戏
function quitGame() {
    if (!isPlaying) {
        document.getElementById("message").innerText = "游戏尚未开始，无需退出。";
        return;
    }
    isPlaying = false;
    document.getElementById("message").innerText = `游戏结束，正确答案是 ${targetMusic.id}：${targetMusic.title}`;
}
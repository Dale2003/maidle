# Maidle 项目

## 项目概述
Maidle 是一个互动音乐猜谜游戏，基于音游 maimai 制作。玩家需要根据提供的各种提示来猜测正确的 maimai 曲目。游戏设计简洁直观，提供了丰富的提示系统，让玩家能够通过艺术家、流派、BPM、谱面定数等线索逐步缩小范围。

## 特点
- **音乐猜谜游戏**：玩家有10次机会猜测正确的音乐曲目
- **智能提示系统**：每次猜测后会提供详细提示，包括标题、类型、艺术家、流派、版本、BPM、红紫谱定数等信息
- **曲目搜索功能**：可通过ID、曲名或别名搜索，支持实时显示搜索建议
- **难度选择**：支持选择不同的出题范围，包括全部曲目或仅限高难度曲目
- **响应式设计**：适配各种设备屏幕尺寸

## 项目结构
```
maidle
├── assets
│   ├── css
│   │   ├── main.css          # 主要样式
│   │   └── responsive.css    # 响应式设计样式
│   ├── js
│   │   ├── app.js            # 主要JavaScript入口
│   │   ├── game.js           # 游戏逻辑
│   │   └── search.js         # 搜索功能
│   └── img
│       ├── favicon.ico       # 网站图标
│       └── logo.svg          # 网站Logo
├── data
│   ├── alias.json            # 曲目别名数据
│   ├── all_alias.json        # 所有别名列表
│   ├── music_alias.json      # 音乐别名信息
│   └── music_info.json       # 曲目详细信息
├── scripts
│   └── filter.py             # 处理音乐别名数据的Python脚本
├── index.html                # 主HTML文件
└── README.md                 # 项目文档
```

## 安装说明
1. **克隆仓库**： 
   ```bash
   git clone https://github.com/Dale2003/maidle.git
   ```
2. **进入项目目录**：
   ```bash
   cd maidle
   ```
3. **在浏览器中打开**：直接用浏览器打开 `index.html` 文件即可开始游戏。

## 使用方法
1. 点击"开始游戏"按钮开始新游戏
2. 可选择不同的出题范围（无限制、13级以上、13+级以上等）
3. 在搜索框中输入曲目ID或别名进行猜测
4. 系统会提供提示信息，绿色表示完全正确，黄色表示部分正确
5. 在10次尝试内猜出正确曲目即为胜利

## 游戏规则
- 每次游戏随机选取一首曲目作为目标
- 玩家最多有10次猜测机会
- 每次猜测后会提供各种提示：
  - 标题、类型、艺术家、流派、版本
  - BPM（高了/低了）
  - 红谱定数、紫谱定数（高了/低了）
  - 紫谱谱师、紫谱绝赞数量

## 数据来源
- 谱面数据来源：[水鱼查分器](https://www.diving-fish.com/maimaidx/prober/)
- 曲绘数据来源：[落雪查分器](https://maimai.lxns.net)
- 别名数据来源：[Yuri-YuzuChaN](https://github.com/Yuri-YuzuChaN/maimaiDX)

## 贡献
欢迎任何形式的贡献！如有功能增强或bug修复，请fork本仓库并提交pull request。

## 许可证
本项目采用MIT许可证。详情请参阅LICENSE文件。

## 作者
由 宇航员Dale 开发

## 在线体验
访问 [Maidle 在线版本](https://maidle.dale2003.cn) 开始游戏！
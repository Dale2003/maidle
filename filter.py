import json

with open('static/music_alias.json', 'r', encoding='utf-8') as f:
    music_alias = json.load(f)

# 遍历，把id大于100000的音乐删除
for music in music_alias:
    if int(music["SongID"]) > 100000:
        music_alias.remove(music)
    
print(music_alias)
# 保存
with open('static/music_alias.json', 'w', encoding='utf-8') as f:
    json.dump(music_alias, f, ensure_ascii=False, indent=4)
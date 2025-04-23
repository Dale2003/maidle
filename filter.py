import json

with open('static/music_alias.json', 'r', encoding='utf-8') as f:
    music_alias = json.load(f)

# 遍历，把id大于100000的音乐删除
for music in music_alias:
    if int(music["SongID"]) > 100000:
        music_alias.remove(music)
    
# 遍历，添加key为SongID的值

all_alias = {}

for music in music_alias:
    if music["SongID"] not in all_alias:
        all_alias[music["SongID"]] = music["Alias"]

print(all_alias)
# 保存
with open('static/all_alias.json', 'w', encoding='utf-8') as f:
    json.dump(all_alias, f, ensure_ascii=False, indent=4)
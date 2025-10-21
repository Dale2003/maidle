import json

with open('data/new_music_alias.json', 'r', encoding='utf-8') as f:
    music_alias = json.load(f)

with open('data/all_data.json', 'r', encoding='utf-8') as f:
    all_data = json.load(f)

for id in all_data:
    music = all_data[id]
    # print(music)
    for alias in music_alias:
        if id == str(alias['SongID']):
            music['alias'] = alias['Alias']

print(f"Added aliases to {len(music_alias)} items.")

with open('data/all_data_with_alias.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=4)
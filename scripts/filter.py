import json

def load_music_alias(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def filter_music_alias(music_alias):
    return [music for music in music_alias if int(music["SongID"]) <= 100000]

def create_alias_dict(music_alias):
    all_alias = {}
    for music in music_alias:
        if music["SongID"] not in all_alias:
            all_alias[music["SongID"]] = music["Alias"]
    return all_alias

def save_alias_dict(all_alias, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(all_alias, f, ensure_ascii=False, indent=4)

def main():
    music_alias = load_music_alias('data/music_alias.json')
    filtered_music_alias = filter_music_alias(music_alias)
    all_alias = create_alias_dict(filtered_music_alias)
    save_alias_dict(all_alias, 'data/all_alias.json')

if __name__ == "__main__":
    main()
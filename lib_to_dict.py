import json

def load_music_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_music_data(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# /Users/dale/Documents/maidle/data/all_data.json 的列表改成字典，key为id，value为对应的字典
def list_to_dict(data):
    return {item['id']: item for item in data}

def dict_to_list(data):
    return list(data.values())

def main():
    # 读取数据
    data = load_music_data('/Users/dale/Documents/maidle/data/all_data.json')
    
    # 列表转字典
    data_dict = list_to_dict(data)

    print(f"Converted {len(data)} items to dictionary with {len(data_dict)} keys.")
    
    # 保存字典数据
    save_music_data('/Users/dale/Documents/maidle/data/all_data_dict.json', data_dict)

if __name__ == "__main__":
    main()
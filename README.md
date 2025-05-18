# Maidle Project

## Overview
Maidle is an interactive music guessing game that challenges players to identify music tracks based on various hints and clues. The game utilizes a rich dataset of music information, aliases, and gameplay mechanics to provide an engaging experience.

## Features
- **Music Guessing Game**: Players have a limited number of attempts to guess the correct music track based on hints provided after each guess.
- **Search Functionality**: Users can search for music tracks using IDs or aliases, with suggestions displayed in real-time.
- **Responsive Design**: The application is designed to work seamlessly across different devices and screen sizes.

## Project Structure
```
maidle
├── assets
│   ├── css
│   │   ├── main.css          # Main styles for the application
│   │   └── responsive.css     # Styles for responsive design
│   ├── js
│   │   ├── app.js            # Main JavaScript entry point
│   │   ├── game.js           # Game logic and functionality
│   │   └── search.js         # Search functionality
│   └── img
│       ├── favicon.ico       # Favicon for the application
│       └── logo.svg          # Logo for the application
├── data
│   ├── alias.json            # Alias data for music tracks
│   ├── all_alias.json        # Comprehensive list of all music aliases
│   ├── music_alias.json      # Music alias information
│   └── music_info.json       # Detailed information about music tracks
├── scripts
│   └── filter.py             # Python script for processing music alias data
├── .gitignore                 # Git ignore file
├── CNAME                      # Custom domain settings for GitHub Pages
├── index.html                 # Main HTML file for the application
└── README.md                  # Documentation for the project
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone https://github.com/yourusername/maidle.git
   ```
2. **Navigate to the Project Directory**:
   ```
   cd maidle
   ```
3. **Open `index.html`** in your web browser to start the game.

## Usage
- Start the game by clicking the "开始游戏" button.
- Enter a music track ID or alias in the search box to receive hints.
- Use the hints to guess the correct track within the allowed attempts.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
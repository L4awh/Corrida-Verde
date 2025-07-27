# Board Game - Sustainable Energy

## Overview

This is a Portuguese-language educational board game focused on sustainable energy concepts. The application is a browser-based game built with vanilla HTML, CSS, and JavaScript, featuring a complete game experience with player movement, dice rolling, questions system, and audio controls.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Web Technologies**: Built entirely with vanilla HTML5, CSS3, and JavaScript ES6+
- **Single Page Application**: All game functionality contained within a single HTML file
- **Component-Based Structure**: JavaScript classes organize game logic and state management
- **Responsive Design**: CSS flexbox and grid layouts with mobile-first approach

### Game Engine Architecture
- **State Management**: Centralized game state through the `BoardGame` class
- **Event-Driven System**: DOM events handle user interactions (dice rolling, question answering)
- **Modular Question System**: Comprehensive question bank with difficulty levels and tracking
- **Audio Integration**: Background music and sound effects with user controls

## Key Components

### Core Game Logic (`script.js`)
- **BoardGame Class**: Main game controller managing player state, positions, and game flow
- **Question System**: Multi-difficulty question bank with hint and explanation features
- **Player Management**: Turn-based system supporting up to 3 players
- **Movement System**: Animated player piece movement across board squares

### User Interface (`index.html`)
- **Game Board**: Dynamic grid-based board with 30+ squares
- **Control Panel**: Dice rolling interface and player status display
- **Question Modal**: Interactive quiz interface with multiple choice questions
- **Audio Controls**: Music toggle and volume slider

### Styling (`style.css`)
- **Modern CSS**: Gradient backgrounds, shadows, and transitions
- **Font Integration**: Google Fonts (Poppins) and Font Awesome icons
- **Responsive Layout**: Flexible grid system adapting to different screen sizes
- **Visual Feedback**: Hover effects, animations, and player indicators

## Data Flow

1. **Game Initialization**: Board setup, player positioning, and audio system initialization
2. **Turn Management**: Sequential player turns with dice rolling mechanics
3. **Movement Processing**: Calculate new positions, animate piece movement, check for special squares
4. **Question Handling**: Display questions based on board position, track answers, provide feedback
5. **State Updates**: Update player positions, current turn, and game progress

## External Dependencies

### CDN Resources
- **Google Fonts**: Poppins font family for typography
- **Font Awesome**: Icon library for UI elements and visual indicators
- **No Framework Dependencies**: Pure vanilla JavaScript implementation

### Audio Resources
- Background music file referenced but not included in repository
- Audio controls implemented for future sound integration

## Deployment Strategy

### Static Hosting
- **Simple Deployment**: Can be hosted on any static file server
- **No Build Process**: Direct file serving without compilation steps
- **CDN Dependencies**: Relies on external CDNs for fonts and icons

### Browser Compatibility
- **Modern Browser Support**: Uses ES6+ features requiring recent browser versions
- **Progressive Enhancement**: Core game functionality works without audio
- **Mobile Responsive**: Touch-friendly interface for mobile devices

### Potential Enhancements
- Database integration for score tracking and player progress
- Multiplayer networking capabilities
- Additional question content management system
- Server-side question randomization and validation
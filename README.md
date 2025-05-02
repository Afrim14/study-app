# Study App

A comprehensive study application that helps students manage their learning effectively.

## Features

- **Subject Management**: Create and organize subjects
- **Note Taking**: Create, edit, and organize study notes
- **Lecture Viewing**: Watch and take notes on lecture videos
- **Quiz Generation**: Create and take quizzes to test knowledge
- **Focus Mode**: Stay focused with a built-in study timer
- **Statistics**: Track study progress and performance
- **Admin Panel**: View comprehensive statistics and history

## Project Structure

```
study-app/
  ├── public/
  │   ├── favicon.ico
  │   ├── index.html
  │   └── assets/
  │       ├── icons/
  │       └── images/
  ├── src/
  │   ├── index.js
  │   ├── App.js
  │   ├── App.css
  │   ├── components/
  │   │   ├── common/
  │   │   ├── Dashboard/
  │   │   ├── Notes/
  │   │   ├── Lectures/
  │   │   ├── Quiz/
  │   │   ├── FocusMode/
  │   │   └── Admin/
  │   ├── pages/
  │   ├── context/
  │   ├── services/
  │   ├── utils/
  │   └── styles/
  └── package.json
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/study-app.git
cd study-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
netlify dev
```

## Usage

1. **Subject Selection**: Start by creating subjects you're studying
2. **Note Taking**: Create notes for each subject as you learn
3. **Focus Mode**: Use the timer to track your study sessions
4. **Quiz**: Test your knowledge with quizzes
5. **Statistics**: Monitor your progress and study patterns

## Technologies Used

- React.js
- React Router
- Chart.js (for statistics visualization)
- Local Storage (for data persistence)

## Future Enhancements

- User authentication and profiles
- Cloud synchronization
- Collaborative note sharing
- Advanced quiz features with AI-generated questions
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Answerly 🎯

A modern AI-powered quiz generation platform that leverages Google's Gemini AI to create intelligent, customizable quizzes on any topic. Built with React, Node.js, Express, and MongoDB.

## 🌟 Live Demo

**Deployed Application:** [https://answerly-five.vercel.app/](https://answerly-five.vercel.app/)

### Demo Credentials
- **Email:** `test@email.com`
- **Password:** `answerlypass`

## 📋 Project Description

Answerly is a full-stack web application that enables users to generate custom quizzes using AI. The platform uses Google's Gemini 2.0 Flash model to create contextually relevant multiple-choice questions based on user-specified parameters such as topic, difficulty level, and number of questions.

### Key Features
- 🤖 **AI-Powered Quiz Generation** - Leverages Google Gemini AI to create intelligent quizzes
- 🎨 **Modern UI/UX** - Built with React and Tailwind CSS for a responsive, beautiful interface
- 🔐 **User Authentication** - Secure authentication powered by Clerk
- 📊 **Dashboard** - Track your quiz history and performance
- 💾 **Persistent Storage** - MongoDB database for saving quizzes and submissions
- 🌐 **Real-time Quiz Taking** - Interactive quiz interface with instant feedback
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express 5.1** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **Google GenAI SDK** - AI integration for quiz generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/PR3MM/Answerly.git
cd Answerly
```

### 2. Backend Setup

#### Navigate to the backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string
DB_NAME=quizapp

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

**How to get your credentials:**
- **MongoDB URI**: 
  - For local MongoDB: `mongodb://localhost:27017`
  - For MongoDB Atlas: Get it from your cluster's "Connect" option
- **Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

#### Start the backend server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal window/tab and navigate to the frontend directory:

```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
Create a `.env` file in the `frontend` directory with the following variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend API URL
VITE_API_URL=http://localhost:3000
```

**How to get your Clerk API key:**
- Sign up at [Clerk](https://clerk.com/)
- Create a new application
- Copy the Publishable Key from your dashboard

#### Start the frontend development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📝 Running Test Cases

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

**Note:** The current project uses the default test configuration. Test cases display: `"Error: no test specified"`. To implement tests, consider adding:
- **Jest** or **Vitest** for unit testing
- **Supertest** for API endpoint testing
- **React Testing Library** for component testing

### Manual Testing Checklist

#### Backend API Endpoints
Test the following endpoints using tools like Postman or cURL:

1. **Generate Quiz**
   ```bash
   POST http://localhost:3000/api/quiz/generate
   Body: {
     "topic": "JavaScript",
     "difficulty": "medium",
     "numberOfQuestions": 5
   }
   ```

2. **Get Quiz**
   ```bash
   GET http://localhost:3000/api/quiz/:quizId
   ```

3. **Submit Quiz**
   ```bash
   POST http://localhost:3000/api/quiz/submit
   Body: {
     "quizId": "your_quiz_id",
     "answers": [...],
     "userId": "user_id"
   }
   ```

4. **Dashboard**
   ```bash
   GET http://localhost:3000/api/dashboard/:userId
   ```

#### Frontend Features
- Landing page loads correctly
- User can sign in/sign up via Clerk
- Dashboard displays user's quizzes
- Quiz generation form works
- Quiz taking interface functions properly
- Results are displayed after quiz submission

## 🎨 Project Structure

```
Answerly/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── dashboard.js          # Dashboard data controller
│   │   ├── getQuiz.js           # Get quiz by ID
│   │   ├── quizzes.js           # Quiz CRUD operations
│   │   ├── sampleQuiz.js        # Sample quiz data
│   │   └── submitquiz.js        # Quiz submission handler
│   ├── gemini/
│   │   └── gemini.js            # Google Gemini AI integration
│   ├── models/
│   │   ├── quiz.js              # Quiz model schema
│   │   └── SubmissionModel.js   # Quiz submission schema
│   ├── routes/
│   │   └── index.js             # API routes
│   ├── server.js                # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── dashboard.jsx     # Dashboard component
    │   │   ├── landingpage.jsx   # Landing page
    │   │   └── quiz.jsx          # Quiz taking component
    │   ├── assets/               # Static assets
    │   ├── App.jsx               # Main app component with routing
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles
    ├── public/
    ├── index.html
    └── package.json
```

## 🔧 Design Choices & Assumptions

### Architecture Decisions

1. **Monorepo Structure**
   - Kept frontend and backend in separate directories within the same repository
   - Facilitates easier development and deployment management
   - Clear separation of concerns

2. **Client-Side Routing**
   - Implemented custom routing solution in `App.jsx` using browser history API
   - Chose this over React Router initially for lightweight solution
   - Later added React Router DOM for better navigation handling

3. **AI Integration**
   - Used Google Gemini 2.0 Flash for fast, cost-effective quiz generation
   - Implemented streaming responses for better user experience
   - Added Google Search tool to enhance quiz content accuracy

4. **Authentication Strategy**
   - Integrated Clerk for hassle-free authentication
   - Avoided building custom auth to focus on core features
   - Provides social login and secure user management out of the box

5. **Database Design**
   - MongoDB for flexible schema and easy scalability
   - Separate models for Quizzes and Submissions
   - Mongoose ODM for type safety and validation

### Key Assumptions

1. **User Behavior**
   - Users will have stable internet connection for AI quiz generation
   - Quiz topics will be in English (Gemini model primarily trained on English)
   - Users understand basic quiz-taking conventions

2. **Data Management**
   - Quiz IDs are sufficient for quiz retrieval (no complex search needed initially)
   - User data from Clerk is sufficient for user identification
   - Quiz submissions are final (no edit/retake functionality initially)

3. **Performance**
   - Gemini API response time is acceptable for user experience
   - Quiz generation with 5-10 questions is optimal
   - Frontend can handle typical quiz data sizes without pagination

4. **Deployment**
   - Frontend deployed on Vercel (optimized for React/Vite)
   - Backend deployed on a Node.js-compatible platform
   - MongoDB hosted on Atlas for production

### Future Enhancements

- 📊 Analytics dashboard with detailed performance metrics
- 🏆 Leaderboard and competitive features
- 📚 Quiz categories and filtering
- 💬 Social features (sharing, comments)
- 🎓 Educational institution integrations
- 📱 Native mobile applications
- 🌐 Multi-language support
- ⚡ Quiz retakes with improvement tracking

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Verify MongoDB is running: `mongod --version`
   - Check `.env` file exists and has correct values
   - Ensure port 3000 is not in use: `lsof -i :3000`

2. **Frontend won't connect to backend**
   - Verify backend is running on port 3000
   - Check CORS configuration in `server.js`
   - Ensure `VITE_API_URL` in frontend `.env` is correct

3. **Quiz generation fails**
   - Verify Gemini API key is valid
   - Check API quota limits on Google AI Studio
   - Review backend logs for detailed error messages

4. **Authentication not working**
   - Verify Clerk publishable key is correct
   - Check Clerk dashboard for application status
   - Clear browser cache and cookies

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributors

- **Prem Veddhote** - [@PR3MM](https://github.com/PR3MM)

## 🙏 Acknowledgments

- Google Gemini AI for powering quiz generation
- Clerk for authentication services
- MongoDB for database infrastructure
- Vercel for hosting

---

**Repository:** [https://github.com/PR3MM/Answerly](https://github.com/PR3MM/Answerly)

**Live Demo:** [https://answerly-five.vercel.app/](https://answerly-five.vercel.app/)

For questions or issues, please open an issue on GitHub.

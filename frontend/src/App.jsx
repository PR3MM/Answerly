import { useEffect, useState, useCallback } from 'react'
import LandingPage from './components/landingpage'
import Dashboard from './components/dashboard'
import Quiz from './components/quiz'

function pathToRoute(path) {
  if (!path || path === '/' || path === '') return { name: 'home', params: {} }
  if (path === '/dashboard') return { name: 'dashboard', params: {} }
  
  // Match /quiz/:quizId
  const quizMatch = path.match(/^\/quiz\/([a-zA-Z0-9]+)$/)
  if (quizMatch) return { name: 'quiz', params: { quizId: quizMatch[1] } }
  
  return { name: 'home', params: {} }
}

export default function App() {
  const [route, setRoute] = useState(() => pathToRoute(window.location.pathname))
  const [quizData, setQuizData] = useState(null)

  const navigate = useCallback((to, options = {}) => {
    let path = '/'
    
    if (to === 'dashboard') {
      path = '/dashboard'
    } else if (to === 'home') {
      path = '/'
    } else if (to.startsWith('/quiz/')) {
      path = to
      // Store quiz data from state if provided
      if (options.state?.questions) {
        setQuizData({ questions: options.state.questions })
      }
    } else {
      path = to
    }
    
    if (window.location.pathname !== path) {
      window.history.pushState(options.state || {}, '', path)
    }
    setRoute(pathToRoute(path))
  }, [])

  useEffect(() => {
    const onPop = (e) => {
      const newRoute = pathToRoute(window.location.pathname)
      setRoute(newRoute)
      
      // Restore quiz data from history state if available
      if (newRoute.name === 'quiz' && e.state?.questions) {
        setQuizData({ questions: e.state.questions })
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div className="fade-in">
      {route.name === 'home' && <LandingPage onNavigate={navigate} />}
      {route.name === 'dashboard' && <Dashboard onNavigate={navigate} />}
      {route.name === 'quiz' && (
        <Quiz 
          quizId={route.params.quizId} 
          questions={quizData?.questions} 
          onNavigate={navigate} 
        />
      )}
    </div>
  )
}
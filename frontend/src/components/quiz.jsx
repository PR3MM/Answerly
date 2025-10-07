import React, { useState, useEffect } from 'react'
import { useAuth, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'

// Read backend base URL from Vite env
const BACKEND_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL
  ? String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, '')
  : ''

function apiUrl(path) {
  if (!path) return path
  if (BACKEND_BASE) return `${BACKEND_BASE}${path.startsWith('/') ? path : `/${path}`}`
  return path
}

export default function Quiz({ quizId, questions: initialQuestions, onNavigate } = {}) {
  const { user } = useUser()
  const { getToken } = useAuth()

  const [questions, setQuestions] = useState(initialQuestions || [])
  const [loading, setLoading] = useState(!initialQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)

  // Fetch quiz data if not provided
  useEffect(() => {
    if (!initialQuestions && quizId) {
      setLoading(true)
      fetch(apiUrl(`/api/quizzes/${quizId}`))
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch quiz')
          return res.json()
        })
        .then((data) => {
          setQuestions(data.questions || [])
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error fetching quiz:', err)
          setLoading(false)
        })
    }
  }, [quizId, initialQuestions])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const selectedAnswer = answers[currentIndex]

  // Timer (optional, 30 seconds per question)
  useEffect(() => {
    if (submitted || !currentQuestion) return
    setTimeLeft(30)
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          // Auto-advance or handle timeout
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentIndex, submitted, currentQuestion])

  const handleAnswerSelect = (optionId) => {
    setAnswers({ ...answers, [currentIndex]: optionId })
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const token = await getToken().catch(() => null)
      const userId = user?.id || null

      // Build submission payload - backend expects { [questionId]: selectedOptionId }
      const answersPayload = {}
      questions.forEach((q, idx) => {
        if (answers[idx] !== undefined) {
          answersPayload[q._id] = answers[idx]
        }
      })

      const res = await fetch(apiUrl(`/api/quizzes/${quizId}/submit`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ userId, answers: answersPayload }),
      })

      if (res.ok) {
        const data = await res.json()
        setResult(data)
        setSubmitted(true)
      } else {
        alert('Failed to submit quiz')
      }
    } catch (err) {
      console.error('Submit error:', err)
      alert('Error submitting quiz')
    } finally {
      setSubmitting(false)
    }
  }

  if (!quizId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card p-8 rounded-lg shadow border border-border">
          <h2 className="text-lg font-semibold text-foreground">Quiz not found</h2>
          <p className="text-sm text-muted-foreground mt-2">Unable to load quiz questions.</p>
          <button onClick={() => onNavigate?.('dashboard')} className="mt-4 btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card p-8 rounded-lg shadow border border-border text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-foreground">Loading quiz...</h2>
        </div>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card p-8 rounded-lg shadow border border-border">
          <h2 className="text-lg font-semibold text-foreground">Quiz not found</h2>
          <p className="text-sm text-muted-foreground mt-2">Unable to load quiz questions.</p>
          <button onClick={() => onNavigate?.('dashboard')} className="mt-4 btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (submitted && result) {
    const score = result.score || 0
    const total = result.totalQuestions || totalQuestions
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="card text-center scale-in border-2 shadow-2xl">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-bold mb-3 text-foreground">Quiz Completed!</h2>
            <p className="text-muted-foreground text-lg mb-8">Great job on finishing the quiz.</p>

            <div className="card bg-gradient-to-br from-primary to-foreground text-primary-foreground p-8 mb-8 border-2 shadow-lg">
              <div className="text-7xl font-bold mb-3">{percentage}%</div>
              <div className="text-xl font-semibold opacity-90">
                You scored {score} out of {total}
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => onNavigate?.('dashboard')} className="btn-ghost text-lg px-8 py-3">
                ← Dashboard
              </button>
              <button onClick={() => window.location.reload()} className="btn text-lg px-8 py-3">
                🔄 Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background fade-in">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="glass p-5 rounded-2xl mb-6 flex items-center justify-between sticky top-4 z-10">
          <button onClick={() => onNavigate?.('dashboard')} className="text-sm font-semibold text-primary hover:underline flex items-center gap-2">
            <span>←</span> Dashboard
          </button>
          <div className="text-sm font-semibold text-foreground bg-accent px-4 py-2 rounded-full">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
          {timeLeft !== null && (
            <div className={`text-sm font-bold px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-accent text-foreground'}`}>
              ⏱️ {timeLeft}s
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="card mb-6 p-4 border-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">Progress</span>
            <span className="text-sm font-bold text-foreground">{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-foreground h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <SignedOut>
          <div className="card text-center p-12 border-2 shadow-lg scale-in">
            <span className="text-6xl mb-6 block">🔒</span>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Please sign in to take this quiz</h3>
            <p className="text-muted-foreground mb-6">Create an account to access quizzes and track your progress</p>
            <SignInButton>
              <button className="btn text-lg px-8 py-3">Sign in →</button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          {/* Question card */}
          <div className="card p-10 border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-bold mb-8 text-foreground leading-tight">{currentQuestion?.text}</h3>

            <div className="space-y-4">
              {currentQuestion?.options?.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    selectedAnswer === option.id
                      ? 'border-primary bg-gradient-to-br from-accent to-muted shadow-lg scale-[1.02]'
                      : 'border-border hover:border-foreground/20 hover:shadow-md hover:scale-[1.01] bg-card'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        selectedAnswer === option.id 
                          ? 'border-primary bg-primary shadow-md scale-110' 
                          : 'border-muted-foreground group-hover:border-foreground group-hover:scale-105'
                      }`}
                    >
                      {selectedAnswer === option.id && <div className="w-3.5 h-3.5 bg-primary-foreground rounded-full" />}
                    </div>
                    <div className="font-semibold text-lg text-foreground flex-1">{option.text}</div>
                    <div className={`text-2xl opacity-0 transition-opacity duration-300 ${selectedAnswer === option.id ? 'opacity-100' : ''}`}>
                      ✓
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between pt-8 border-t-2 border-border">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl border-2 border-border hover:bg-muted hover:border-foreground/20 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Previous
              </button>

              <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: totalQuestions }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                      idx === currentIndex
                        ? 'bg-gradient-to-br from-primary to-foreground text-primary-foreground shadow-lg scale-110'
                        : answers[idx]
                        ? 'bg-accent text-foreground hover:scale-105 shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:scale-105'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {currentIndex === totalQuestions - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || Object.keys(answers).length === 0}
                  className="btn px-8 py-3 text-lg"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : '✓ Submit Quiz'}
                </button>
              ) : (
                <button onClick={handleNext} className="btn px-8 py-3 text-lg">
                  Next →
                </button>
              )}
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

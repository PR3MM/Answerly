import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function LandingPage({ onNavigate } = {}) {
  const handleGetStarted = () => {
    onNavigate?.('dashboard')
  }

  const handleTryQuiz = () => {
    // Navigate to a sample quiz - you can replace 'sample' with an actual quiz ID
    onNavigate?.('/quiz/sample')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="glass max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between sticky top-4 mt-4 rounded-2xl z-50 fade-in">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-primary to-foreground rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">A</div>
          <h1 className="text-xl font-bold text-foreground">Answerly</h1>
        </div>

        <nav className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn">Sign in →</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate?.('dashboard')}
                className="btn-ghost"
              >
                Dashboard
              </button>
              <UserButton />
            </div>
          </SignedIn>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="slide-up">
            <div className="inline-block mb-6 px-4 py-2 bg-accent border border-border rounded-full text-sm font-semibold">
              ✨ AI-Powered Quiz Platform
            </div>
            <h2 className="text-5xl sm:text-7xl font-bold leading-[1.1] mb-6 text-foreground">
              Create and take beautiful quizzes — faster.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Answerly helps teachers, recruiters, and learners create, share, and grade quizzes quickly. Start with a template or build your own timed assessments with instant feedback.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn text-lg px-8 py-3">Get started →</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button onClick={handleGetStarted} className="btn text-lg px-8 py-3">
                  Get started →
                </button>
              </SignedIn>
              <a href="#features" className="btn-ghost text-lg px-8 py-3">See features</a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group card hover:scale-105 transition-transform duration-300">
                <div className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Fast setup
                </div>
                <div className="text-sm text-muted-foreground">Create a quiz in under a minute.</div>
              </div>
              <div className="group card hover:scale-105 transition-transform duration-300">
                <div className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Auto grading
                </div>
                <div className="text-sm text-muted-foreground">Immediate results and analytics.</div>
              </div>
            </div>
          </div>

          <div className="scale-in">
            <div className="card p-8 hover:scale-[1.02] transition-all duration-500 border-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Sample Quiz</div>
                  <div className="text-3xl font-bold">Javascript Basics</div>
                </div>
                <div className="px-5 py-2.5 bg-gradient-to-br from-accent to-muted rounded-full text-sm font-bold shadow-sm">
                  10 Questions
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-4 p-5 bg-gradient-to-br from-accent/60 to-accent/30 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-foreground text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-md group-hover:scale-110 transition-transform">1</div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1 group-hover:text-primary transition-colors">What is the type of NaN?</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>Multiple choice</span>
                      <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                      <span>30s</span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-5 bg-gradient-to-br from-accent/60 to-accent/30 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-foreground text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-md group-hover:scale-110 transition-transform">2</div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1 group-hover:text-primary transition-colors">How do you create a promise?</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>Short answer</span>
                      <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                      <span>45s</span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-5 bg-gradient-to-br from-accent/60 to-accent/30 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-foreground text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-md group-hover:scale-110 transition-transform">3</div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1 group-hover:text-primary transition-colors">Which method mutates the array?</div>
                    <div className="text-sm text-muted-foreground">Multiple choice</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex items-center justify-between pt-6 border-t-2 border-border">
                <div className="text-sm text-muted-foreground font-semibold flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  Duration: 2m
                </div>
                <div>
                  <button onClick={handleTryQuiz} className="btn">
                    Try quiz →
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="text-lg">✨</span>
              No account required to preview sample quizzes
            </div>
          </div>
        </section>

        <section id="features" className="mb-32 fade-in">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Powerful Features</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to create, manage, and analyze quizzes effectively</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card group hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">📋</div>
              <div className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">Templates</div>
              <div className="text-sm text-muted-foreground leading-relaxed">Pre-built quiz templates for interviews, exams, and practice sessions. Get started instantly.</div>
            </div>
            <div className="card group hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">❓</div>
              <div className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">Question types</div>
              <div className="text-sm text-muted-foreground leading-relaxed">MCQ, short answer, coding, file upload, and more. Build diverse assessments.</div>
            </div>
            <div className="card group hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">📊</div>
              <div className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">Analytics</div>
              <div className="text-sm text-muted-foreground leading-relaxed">Detailed reports and item analysis to improve assessments and track progress.</div>
            </div>
          </div>
        </section>

        <section className="card p-12 mb-16 bg-gradient-to-br from-primary via-primary to-foreground text-primary-foreground hover:scale-[1.02] transition-all duration-500 shadow-2xl border-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="font-bold text-3xl mb-3">Ready to create your first quiz?</div>
              <div className="text-primary-foreground/90 text-lg leading-relaxed">Sign up and start building tests that give instant, actionable feedback.</div>
            </div>
            <div className="flex gap-4 shrink-0 flex-wrap justify-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-8 py-4 bg-background text-foreground rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    Create quiz →
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button onClick={handleGetStarted} className="px-8 py-4 bg-background text-foreground rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Create quiz →
                </button>
              </SignedIn>
              <a href="#features" className="px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/20 text-primary-foreground font-bold rounded-xl hover:bg-primary-foreground/20 hover:scale-105 transition-all duration-300">
                Learn more
              </a>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
          <div className="font-medium flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Answerly — built with <span className="text-red-500">❤️</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

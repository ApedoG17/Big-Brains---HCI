import { useState } from 'react'
import './App.css'

const overviewCards = [
  { label: 'Active projects', value: '24', delta: '+12%' },
  { label: 'Tasks complete', value: '86%', delta: '+8%' },
  { label: 'Team efficiency', value: '94%', delta: '+5%' },
  { label: 'Revenue', value: '$48.2K', delta: '+19%' },
]

const projects = [
  { name: 'Brand refresh', owner: 'Design team', progress: 78, color: 'violet' },
  { name: 'App launch', owner: 'Product', progress: 64, color: 'teal' },
  { name: 'Research sprint', owner: 'UX research', progress: 52, color: 'amber' },
]

const tasks = [
  { title: 'Finalize onboarding copy', due: 'Today', status: 'In review' },
  { title: 'Approve mobile wireframes', due: 'Tomorrow', status: 'Blocked' },
  { title: 'Sync stakeholder notes', due: 'Thu', status: 'Ready' },
]

const activity = [
  'New user interviews added to the research board',
  'Marketing approved the launch schedule',
  'Sprint review moved to Friday at 2:00 PM',
]

const calendar = [
  { day: 'Mon', value: 8 },
  { day: 'Tue', value: 10 },
  { day: 'Wed', value: 12, strong: true },
  { day: 'Thu', value: 14 },
  { day: 'Fri', value: 16 },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('alex@a21.io')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-shell">
        <div className="brand-panel">
          <div className="brand-badge">A21</div>
          <p className="eyebrow">Product studio</p>
          <h1>Design with clarity. Ship with confidence.</h1>
          <p className="brand-copy">
            Turn ideas into momentum with a workspace built for product teams,
            designers, and decision-makers.
          </p>

          <div className="feature-list">
            <div>
              <span className="dot green" />
              Weekly planning overview
            </div>
            <div>
              <span className="dot blue" />
              Real-time team alignment
            </div>
            <div>
              <span className="dot violet" />
              KPI visibility for every sprint
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-card">
            <p className="eyebrow accent">Welcome back</p>
            <h2>Sign in to A21</h2>

            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </label>

              <div className="form-row">
                <label className="remember-me">
                  <input type="checkbox" defaultChecked />
                  Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="primary-button">
                Sign in
              </button>
            </form>

            <button type="button" className="secondary-button">
              Continue with Google
            </button>

            <p className="signup-copy">
              Don’t have an account? <a href="#">Create one</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="mini-logo">A21</div>
          <div>
            <strong>A21</strong>
            <span>Workspace</span>
          </div>
        </div>

        <nav className="nav">
          <button type="button" className="nav-item active">
            Overview
          </button>
          <button type="button" className="nav-item">
            Projects
          </button>
          <button type="button" className="nav-item">
            Timeline
          </button>
          <button type="button" className="nav-item">
            Insights
          </button>
          <button type="button" className="nav-item">
            Team
          </button>
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">This sprint</p>
          <h3>71% milestone</h3>
          <div className="progress-bar">
            <span style={{ width: '71%' }} />
          </div>
          <small>12 tasks left to finish</small>
        </div>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Good morning</p>
            <h1>Welcome back, Alex</h1>
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-button">
              Export report
            </button>
            <button type="button" className="primary-button compact">
              + New project
            </button>
            <div className="avatar">AR</div>
          </div>
        </header>

        <section className="stats-grid">
          {overviewCards.map((card) => (
            <article key={card.label} className="stat-card">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <em>{card.delta}</em>
            </article>
          ))}
        </section>

        <section className="main-grid">
          <div className="panel project-panel">
            <div className="panel-header">
              <h2>Projects</h2>
              <a href="#">View all</a>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <div key={project.name} className="project-item">
                  <div className="project-head">
                    <div className={`project-dot ${project.color}`} />
                    <div>
                      <h3>{project.name}</h3>
                      <small>{project.owner}</small>
                    </div>
                  </div>

                  <div className="project-meta">
                    <span>{project.progress}% complete</span>
                    <span>Updated 2h ago</span>
                  </div>

                  <div className="progress-bar">
                    <span style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel side-panel">
            <div className="panel-header">
              <h2>Schedule</h2>
              <a href="#">This week</a>
            </div>

            <div className="calendar-grid">
              {calendar.map((item) => (
                <div key={item.day} className={`day-item ${item.strong ? 'active' : ''}`}>
                  <span>{item.day}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="mini-card">
              <small>Design review</small>
              <strong>Wednesday 2:30 PM</strong>
              <button type="button" className="secondary-button small">
                Join call
              </button>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel task-panel">
            <div className="panel-header">
              <h2>Tasks</h2>
              <a href="#">Manage</a>
            </div>

            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.title}>
                  <div>
                    <strong>{task.title}</strong>
                    <small>{task.due}</small>
                  </div>
                  <span className={`task-status ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel activity-panel">
            <div className="panel-header">
              <h2>Activity</h2>
              <a href="#">Latest</a>
            </div>

            <ul className="activity-list">
              {activity.map((line) => (
                <li key={line}>
                  <span className="activity-dot" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

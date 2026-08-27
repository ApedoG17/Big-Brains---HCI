import { useState, useEffect } from 'react'
import { fetchApi, setToken, setUser } from './api'
import './AuthModal.css'
import imgHero from './assets/plain rice combo.jpeg'

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData

      const data = await fetchApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      setToken(data.token)
      setUser(data.user)
      onLoginSuccess(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`auth-modal-overlay ${isMounted ? 'show' : ''}`}>
      <div className="auth-modal">
        <button type="button" className="auth-close-btn" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="auth-modal-left">
          <img src={imgHero} alt="Delicious Ghanaian food" className="auth-modal-img" />
          <div className="auth-modal-left-content">
            <span className="logo-icon">🌶</span>
            <h2>PEPPERDEM</h2>
            <p>Hot Jollof, Waakye & Plain Rice — delivered fast.</p>
          </div>
        </div>
        
        <div className="auth-modal-right">
          <div className="auth-modal-right-inner">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
              <p>{isLogin ? 'Log in to continue ordering your favorite meals.' : 'Join us for fast delivery and loaded plates.'}</p>
            </div>
            
            {error && <div className="auth-error"><span>!</span> {error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className={`form-fields ${!isLogin ? 'is-register' : ''}`}>
                {!isLogin && (
                  <div className="form-group slide-down">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                )}
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    minLength="6"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                  />
                </div>
              </div>
              
              <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  isLogin ? 'Log In' : 'Sign Up'
                )}
              </button>
            </form>
            
            <div className="auth-toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up for free' : 'Log in here'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

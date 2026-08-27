// frontend/src/api.js
const API_BASE = 'http://localhost:3000/api'

export function getToken() {
  return localStorage.getItem('pepperdem_token')
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('pepperdem_token', token)
  } else {
    localStorage.removeItem('pepperdem_token')
  }
}

export function getUser() {
  const user = localStorage.getItem('pepperdem_user')
  return user ? JSON.parse(user) : null
}

export function setUser(user) {
  if (user) {
    localStorage.setItem('pepperdem_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('pepperdem_user')
  }
}

export async function fetchApi(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  let data
  try {
    data = await response.json()
  } catch (e) {
    data = null
  }

  if (!response.ok) {
    const error = new Error(data?.error || 'API request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

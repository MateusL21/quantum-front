import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
export const useAuth = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken, removeToken] = useSessionStorage<string | null>('token', null)

  const dummyUser = {
    email: 'admin@example.com',
    password: 'password',
    token: 'auth-token',
  }

  const login = (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      if (email === dummyUser.email && password === dummyUser.password) {
        setToken(dummyUser.token)
        navigate('/', { replace: true })
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    removeToken()
    navigate('/auth/sign-in', { replace: true })
  }

  const isAuthenticated = token

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error,
  }
}

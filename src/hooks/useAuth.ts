import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL ?? 'https://api.qg360.com.br'

type LoginCommand = {
  email: string
  password: string
  ipAddress: string
}

type AuthData = {
  accessToken: string
  refreshToken: string
  accessTokenExpiration: string
  refreshTokenExpiration: string
  tenantId: string
  user: {
    id: string
    name: string
    email: string
    tenantId: string
  }
}

type LoginResponseData = {
  requiresMfa: boolean
  email: string | null
  authData: AuthData | null
}

type ApiResponse<T> = {
  success: boolean
  message: string | null
  errors: string[] | null
  timestamp: string
  data: T | null
}

export const useAuth = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken, removeToken] = useSessionStorage<string | null>('token', null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    const ipAddress = window.location.hostname || '127.0.0.1'
    const loginPayload: LoginCommand = { email, password, ipAddress }

    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        const serverMessage = errorBody?.message || 'Login failed. Please try again.'
        throw new Error(serverMessage)
      }

      const payload = (await response.json()) as ApiResponse<LoginResponseData>
      if (!payload.success || !payload.data) {
        const serverErrors = payload.errors?.join(', ') || payload.message || 'Login failed.'
        throw new Error(serverErrors)
      }

      if (payload.data.requiresMfa) {
        throw new Error('MFA is required for this account. Complete verification to continue.')
      }

      const authData = payload.data.authData
      if (!authData?.accessToken) {
        throw new Error('No access token received from auth server.')
      }

      setToken(authData.accessToken)
      navigate('/', { replace: true })
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

  const isAuthenticated = Boolean(token)

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error,
  }
}

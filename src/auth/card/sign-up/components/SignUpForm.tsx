import PasswordInputWithStrength from './PasswordInputWithStrength'
import Icon from '../../../../components/wrappers/Icon'
import { META_DATA } from '../../../../config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from 'usehooks-ts'

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL ?? 'https://api.qg360.com.br'

type RegisterPayload = {
  name: string
  email: string
  password: string
  confirmPassword: string
  tenantName: string
  tenantCnpjCpf: string
  tenantDomain: string
}

type ApiResponse<T> = {
  success: boolean
  message: string | null
  errors: string[] | null
  timestamp: string
  data: T | null
}

type RegisterResponseData = {
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

const SignUpForm = () => {
  const navigate = useNavigate()
  const [, setToken] = useSessionStorage<string | null>('token', null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tenantName, setTenantName] = useState('')
  const [tenantCnpjCpf, setTenantCnpjCpf] = useState('')
  const [tenantDomain, setTenantDomain] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!agreeTerms) {
      setError('You must agree to the terms and policy.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const registerPayload: RegisterPayload = {
      name,
      email,
      password,
      confirmPassword,
      tenantName,
      tenantCnpjCpf,
      tenantDomain,
    }

    setLoading(true)

    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerPayload),
      })

      const body = await response.json().catch(() => null)
      if (!response.ok) {
        const message = body?.message || 'Registration failed. Please try again.'
        throw new Error(message)
      }

      const payload = body as ApiResponse<RegisterResponseData>
      if (!payload.success || !payload.data) {
        const message = payload.errors?.join(', ') || payload.message || 'Registration failed.'
        throw new Error(message)
      }

      setToken(payload.data.accessToken)
      navigate('/auth/card/sign-in', { replace: true })
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="userName" className="form-label">
          Name&nbsp;
          <span className="text-danger">*</span>
        </label>
        <div className="input-icon-group">
          <Icon icon="user" className="input-icon" />
          <input
            type="text"
            className="form-input"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={META_DATA.name}
            required
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="userEmail" className="form-label">
          Email address&nbsp;
          <span className="text-danger">*</span>
        </label>
        <div className="input-icon-group">
          <Icon icon="mail" className="input-icon" />
          <input
            type="email"
            className="form-input"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="tenantName" className="form-label">
          Company name&nbsp;
          <span className="text-danger">*</span>
        </label>
        <div className="input-icon-group">
          <Icon icon="building-skyscraper" className="input-icon" />
          <input
            type="text"
            className="form-input"
            id="tenantName"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            placeholder="Company name"
            required
          />
        </div>
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="tenantCnpjCpf" className="form-label">
            CNPJ / CPF&nbsp;
            <span className="text-danger">*</span>
          </label>
          <div className="input-icon-group">
            <Icon icon="receipt-2" className="input-icon" />
            <input
              type="text"
              className="form-input"
              id="tenantCnpjCpf"
              value={tenantCnpjCpf}
              onChange={(e) => setTenantCnpjCpf(e.target.value)}
              placeholder="12345678000195"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="tenantDomain" className="form-label">
            Tenant domain&nbsp;
            <span className="text-danger">*</span>
          </label>
          <div className="input-icon-group">
            <Icon icon="link" className="input-icon" />
            <input
              type="text"
              className="form-input"
              id="tenantDomain"
              value={tenantDomain}
              onChange={(e) => setTenantDomain(e.target.value)}
              placeholder="empresa"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-5" data-password="bar">
        <label htmlFor="userPassword" className="form-label">
          Password&nbsp;
          <span className="text-danger">*</span>
        </label>
        <PasswordInputWithStrength
          password={password}
          setPassword={setPassword}
          id="userPassword"
          name="password"
          placeholder="••••••••"
          showIcon
        />
      </div>

      <div className="mb-5">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password&nbsp;
          <span className="text-danger">*</span>
        </label>
        <div className="input-icon-group">
          <Icon icon="lock" className="input-icon" />
          <input
            type="password"
            className="form-input"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2">
          <input
            className="form-checkbox form-checkbox-light size-4.5"
            type="checkbox"
            id="termAndPolicy"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="termAndPolicy">
            Agree the Terms & Policy
          </label>
        </div>
      </div>

      {error && <p className="mb-5 text-sm text-rose-400">{error}</p>}

      <div>
        <button
          type="submit"
          className="btn bg-primary w-full py-3 font-semibold text-white hover:bg-primary-hover"
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </div>
    </form>
  )
}

export default SignUpForm

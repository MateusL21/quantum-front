import { useAuth } from '../../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

const Form = () => {
  const { login, loading, error } = useAuth()

  const [form, setForm] = useState({
    email: 'admin@example.com',
    password: 'password',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault()
    await login(form.email, form.password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="userEmail" className="block text-sm font-medium text-slate-300">
          Endereço de email <span className="text-rose-400">*</span>
        </label>
        <input
          type="email"
          id="userEmail"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div>
        <label htmlFor="userPassword" className="block text-sm font-medium text-slate-300">
          Senha <span className="text-rose-400">*</span>
        </label>
        <input
          type="password"
          id="userPassword"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" id="rememberMe" defaultChecked className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-500" />
          Me mantenha conectado
        </label>
        <Link to="/auth/reset-pass" className="text-sm text-sky-400 hover:text-sky-300">
          Esqueceu a senha?
        </Link>
      </div>

      {error && <p className="text-center text-sm text-rose-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Sign In
      </button>
    </form>
  )
}
export default Form

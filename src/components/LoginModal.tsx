import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function LoginModal() {
  const { isLoginOpen, closeLogin, login } = useApp()
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agree: false })

  if (!isLoginOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(3,7,18,0.8)] backdrop-blur-sm"
        onClick={closeLogin}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-[440px] mx-4 bg-ded-surface rounded-xl border border-ded-border p-8 md:p-10">
        <button
          onClick={closeLogin}
          className="absolute top-4 right-4 text-ded-text-muted hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="flex mb-8">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 pb-3 text-sm font-medium text-center border-b-2 transition-colors ${
              tab === 'login' ? 'border-ded-accent-blue text-white' : 'border-transparent text-ded-text-muted'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 pb-3 text-sm font-medium text-center border-b-2 transition-colors ${
              tab === 'signup' ? 'border-ded-accent-blue text-white' : 'border-transparent text-ded-text-muted'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors pr-12"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ded-text-muted hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {tab === 'signup' && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none transition-colors"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              />
              <label className="flex items-center gap-2 text-xs text-ded-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-ded-border bg-ded-bg accent-ded-accent-blue"
                  checked={form.agree}
                  onChange={e => setForm({ ...form, agree: e.target.checked })}
                />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </>
          )}

          {tab === 'login' && (
            <div className="text-right">
              <button type="button" className="text-xs text-ded-accent-blue hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-ded-accent-blue text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#3B82F6] hover:-translate-y-0.5 transition-all duration-200"
          >
            {tab === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-ded-border" />
            <span className="text-xs text-ded-text-muted">or</span>
            <div className="flex-1 h-px bg-ded-border" />
          </div>
          <button className="w-full border border-ded-border text-ded-text-secondary text-sm py-2.5 rounded-lg hover:border-ded-accent-blue hover:text-white transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

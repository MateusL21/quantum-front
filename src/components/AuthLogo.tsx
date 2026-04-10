import logoDark from '../assets/images/logo-black.png'
import logo from '../assets/images/logo-sm.png'

const AuthLogo = () => {
  return (
    <a href="/" className="inline-flex items-center justify-center rounded-full bg-slate-900 p-4 shadow-xl shadow-slate-950/40">
      <img src={logoDark} alt="logo" className="h-12 w-auto dark:hidden" />
      <img src={logo} alt="dark logo" className="hidden h-12 w-auto dark:flex" />
    </a>
  )
}

export default AuthLogo
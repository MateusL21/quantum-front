import AuthLogo from '../../../components/AuthLogo'
import { currentYear, META_DATA } from '../../../config'
import { Link } from 'react-router-dom'
import Form from './components/Form'

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-0 items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <AuthLogo />
            <h4 className="mt-5 text-3xl font-semibold text-white">Quantum</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Insira seu email e senha:
            </p>
          </div>

          <div className="mt-8 rounded-[32px] border border-slate-800 bg-slate-900/95 p-7 shadow-2xl shadow-slate-950/40">
            <Form />

            <p className="mt-7 text-center text-sm text-slate-400">
              Novo aqui?&nbsp;
              <Link to="/auth/card/sign-up" className="text-sky-400 font-semibold hover:text-sky-300">
                Criar uma conta
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            © {currentYear}&nbsp;{META_DATA.name} - by&nbsp;<span className="text-slate-300">{META_DATA.author}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page

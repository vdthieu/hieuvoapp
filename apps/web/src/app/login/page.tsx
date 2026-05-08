import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-600">Form demo cho phase auth.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            />
          </div>
          <button type="button" className="w-full rounded-md bg-slate-900 px-4 py-2 text-white">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-medium text-slate-900 underline">
            Tạo tài khoản
          </Link>
        </p>
      </div>
    </main>
  );
}

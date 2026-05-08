import Link from 'next/link';

const features = [
  {
    title: 'Web App',
    description: 'Next.js App Router với TypeScript và Tailwind.',
  },
  {
    title: 'API Service',
    description: 'NestJS API tách riêng, route chuẩn dưới /api.',
  },
  {
    title: 'Ready For Auth',
    description: 'Cấu trúc đã sẵn sàng cho phase auth và Prisma.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
        <header className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-sm font-semibold tracking-wide">HieuVo App</p>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/login" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
            >
              Register
            </Link>
          </nav>
        </header>

        <section className="rounded-2xl bg-slate-900 px-6 py-10 text-slate-100 sm:px-10">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Portfolio Project</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Basic Product Interface</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Giao diện nền tảng đã sẵn sàng để mở rộng sang auth, dashboard dữ liệu và product
            feature.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/dashboard" className="rounded-md bg-white px-4 py-2 text-slate-900">
              Open Dashboard
            </Link>
            <a
              href="/api/health"
              className="rounded-md border border-slate-600 px-4 py-2 text-slate-200"
            >
              API Health
            </a>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

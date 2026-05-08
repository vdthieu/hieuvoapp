const items = [
  { label: 'Tasks', value: '12' },
  { label: 'Completed', value: '7' },
  { label: 'Pending', value: '5' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">Trang tổng quan cơ bản cho phase bootstrap.</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Created monorepo structure with apps/web and apps/api</li>
            <li>Configured health endpoint at /api/health</li>
            <li>Prepared project for next auth implementation phase</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

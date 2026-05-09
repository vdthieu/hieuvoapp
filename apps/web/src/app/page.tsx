import Image from 'next/image';

const summaryItems = [
  '8 years of experience in mobile app development with React Native and native development.',
  'Strong understanding of JavaScript fundamentals, React Native architecture, and app lifecycles.',
  'Hands-on with Redux, Zustand, React Query, React Navigation, Reanimated, Gesture Handler, MMKV.',
  'Experienced in publishing apps to Google Play and App Store.',
  'Strong problem-solving and system design skills.',
];

const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Kotlin', 'Java', 'Objective-C', 'Dart', 'Python'],
  },
  {
    title: 'Frameworks & Platforms',
    items: ['React Native', 'React', 'Jetpack Compose', 'Kotlin Multiplatform', 'Flutter'],
  },
  {
    title: 'Mobile Expertise',
    items: ['Native Modules', 'App Lifecycle', 'CodePush', 'Expo'],
  },
  {
    title: 'State & Data',
    items: ['Redux', 'Zustand', 'React Query', 'MMKV'],
  },
  {
    title: 'Tools & Testing',
    items: ['Detox', 'Jest', 'Sentry', 'Firebase', 'GitHub Actions'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Redis', 'Celery'],
  },
];

const experiences = [
  {
    company: 'Aboutmeeting',
    period: 'Jan 2025 - Present',
    role: 'Mobile Full Stack Freelancer (Dating app startup)',
    achievements: [
      'Owned and maintained both mobile and backend systems (Flutter, FastAPI).',
      'Designed real-time chat using WebSocket, Celery, and Redis from scratch.',
      'Integrated in-app purchases and subscriptions with promotional offers.',
    ],
  },
  {
    company: 'Employment Hero',
    period: 'Sep 2024 - Present',
    role: 'Mobile Developer - Platform Team',
    achievements: [
      'Re-implemented internal CodePush solution, reducing costs by 33% vs Expo Updates.',
      'Adopted Expo development builds, reducing onboarding time to under 10 minutes.',
      'Contributed pre-review workflow with Expo Updates to shorten feature review cycles.',
      'Built a VSCode code inspector extension for direct source navigation from simulator/emulator.',
      'Led complex native issue resolution: RN upgrades, Android edge-to-edge, CI/Xcode issues, crash fixes.',
    ],
  },
  {
    company: 'M_Service JSC (MoMo)',
    period: 'Mar 2022 - Sep 2024',
    role: 'Mobile Developer - Platform Team',
    achievements: [
      'Contributed to a scalable mini-app container system for millions of users.',
      'Improved mini-app loading performance, reducing latency by 18%.',
      'Developed shared native modules (JSI, JNI, Compose Multiplatform): MMKV, View Shot, face detect camera view.',
      'Customized Sentry routing to isolate errors by mini-app team.',
      'Implemented C++/JNI-based security module for sensitive data encryption.',
      'Built on-device ML models with TensorFlow Lite to predict user behavior.',
    ],
  },
  {
    company: 'Vietnovel Corp',
    period: 'Jan 2018 - Jan 2022',
    role: 'Fullstack Mobile Developer - Reading and Writing Novel App',
    achievements: [
      'Owned and maintained two mobile applications across mobile (React Native) and backend (Django).',
      'Implemented offline reading, social/JWT auth, push notifications, and in-app purchases.',
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6">
        <section className="rounded-2xl bg-slate-900 px-6 py-8 text-slate-100 sm:px-10">
          <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
            <div className="mx-auto md:mx-0">
              <Image
                src="/profile-hieuvo-360.webp"
                alt="Hieu Vo portrait"
                width={180}
                height={270}
                className="rounded-xl border border-slate-700 bg-white/5"
                priority
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Senior Mobile Engineer</p>
              <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Hieu Vo</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                8 years of experience in React Native and cross-platform development (iOS & Android),
                with proven delivery in large-scale products including MoMo and Employment Hero.
              </p>
              <div className="mt-6 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
                <p>Ho Chi Minh City, Vietnam</p>
                <p>Phone: 0969 822 973</p>
                <p>Email: trunghieu.vodinh@gmail.com</p>
                <p>
                  LinkedIn:{' '}
                  <a
                    href="https://linkedin.com/in/hieuvo96"
                    className="underline decoration-slate-500 underline-offset-2 hover:decoration-slate-200"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/hieuvo96
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {summaryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Technical Skills</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article key={group.title} className="rounded-xl bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{group.items.join(', ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Professional Experience</h2>
          <div className="mt-5 space-y-6">
            {experiences.map((exp) => (
              <article key={`${exp.company}-${exp.period}`} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-sm text-slate-500">{exp.period}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-700">{exp.role}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
                  {exp.achievements.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Education</h2>
          <p className="mt-3 text-sm text-slate-700">
            Bachelor of Engineering - Information Technology
          </p>
          <p className="text-sm text-slate-600">
            University of Information Technology (UIT), 2019 | GPA: 7.6
          </p>
        </section>
      </div>
    </main>
  );
}

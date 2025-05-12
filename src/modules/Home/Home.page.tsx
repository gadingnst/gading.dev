'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-8 pt-24 pb-12 gap-6">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={200}
          height={42}
          className="dark:invert"
          priority
        />
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Fullstack&nbsp;Next&nbsp;Template
        </h1>
        <p className="max-w-xl text-base sm:text-lg opacity-80">
          Boilerplate Next.js + TypeScript + TailwindCSS dengan module alias,
          SVGR, ESLint, Husky, dan workflow Vercel siap pakai.
        </p>

        {/* Credit */}
        <p className="text-xs sm:text-sm opacity-60">
          by{' '}
          <Link
            href="https://gading.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Gading&nbsp;Nasution
          </Link>
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="https://github.com/gadingnst/fullstack-next-template"
            target="_blank"
            className="btn btn-primary"
          >
            ⭐ Star on GitHub
          </Link>
          <Link
            href="https://vercel.com/new/git/external?repository-url=https://github.com/gadingnst/fullstack-next-template"
            target="_blank"
            className="btn btn-outline"
          >
            🚀 Deploy
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 sm:px-20 py-16 bg-base-100">
        <h2 className="text-2xl font-semibold text-center mb-10">Key Features</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm leading-relaxed">
          <li className="p-4 rounded-lg bg-base-200">
            ⚛️ Next.js App Dir + TypeScript
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            🎨 TailwindCSS pre-setup
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            🛠️ SVGR for SVG → React
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            🚦 ESLint preset & rules
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            🔗 @/ Path Alias
          </li>
        </ul>
      </section>

      {/* Getting Started */}
      <section className="px-8 sm:px-20 py-16">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Getting Started
        </h2>
        <pre className="bg-neutral text-neutral-content text-sm rounded-lg p-6 overflow-auto whitespace-pre-line">
          git clone https://github.com/gadingnst/fullstack-next-template.git<br />
          cd fullstack-next-template<br />
          npm install<br />
          npm run dev
        </pre>
      </section>

      {/* Footer */}
      <footer className="py-8 flex flex-wrap justify-center gap-6 text-sm opacity-70">
        <Link href="https://nextjs.org/docs" target="_blank" className="link link-hover">
          📚 Next.js Docs
        </Link>
      </footer>
    </div>
  );
}

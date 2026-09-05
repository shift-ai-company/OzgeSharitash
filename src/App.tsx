import Background from "./components/Background";
import EyeMark from "./components/EyeMark";
import IdentityCard from "./components/IdentityCard";
import {
  About,
  Expertise,
  Footer,
  LinksSection,
  Schedule,
  Stats,
  Ticker,
  WhySection,
} from "./components/Sections";
import { usePointer } from "./lib/hooks";

export default function App() {
  const pointer = usePointer();

  return (
    <div className="min-h-screen font-body text-cream antialiased">
      <Background />
      <div className="noise" />

      {/* ---------- шапка ---------- */}
      <header className="sticky top-0 z-40 border-b border-cream/8 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <EyeMark pointer={pointer} width={44} className="transition-transform duration-500 group-hover:scale-110" />
            <span className="leading-tight">
              <span className="block font-display text-[13px] font-bold text-cream">
                dr_ozgesaritas
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.25em] text-sage uppercase">
                офтальмолог · Анкара
              </span>
            </span>
          </a>

          <nav className="flex items-center gap-2 sm:gap-3">
            <a
              href="#links"
              className="hidden rounded-full border border-cream/12 px-4 py-2 text-[12px] font-semibold text-sage transition-all duration-300 hover:border-jade/50 hover:text-mint sm:inline-flex"
            >
              все ссылки
            </a>
            <a
              href="https://ig.me/m/dr_ozgesaritas"
              target="_blank"
              rel="noopener noreferrer"
              className="sweep relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber to-honey px-4 py-2 font-display text-[11px] font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(237,166,89,0.6)] active:translate-y-0"
            >
              записаться
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </nav>
        </div>
        {/* тонкая живая линия под шапкой */}
        <div className="gradient-line h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(237,166,89,0.6), rgba(47,174,125,0.6), transparent)", backgroundSize: "200% 100%" }} />
      </header>

      <div id="top" />

      {/* ---------- бегущая строка ---------- */}
      <Ticker />

      {/* ---------- основной контент ---------- */}
      <main className="mx-auto max-w-6xl pt-8 pb-2 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-6">
          {/* карточка врача */}
          <aside className="px-6 sm:px-10 lg:sticky lg:top-20 lg:self-start lg:px-0">
            <IdentityCard />
            <p className="mt-5 hidden text-center text-[11px] leading-relaxed text-sage/70 lg:block">
              карточка наклоняется за курсором,
              <br />
              а глаз наверху — следит за вами
            </p>
          </aside>

          {/* контент */}
          <div className="pb-6">
            <About />
            <Stats />
            <Expertise />
            <WhySection />
            <LinksSection />
            <Schedule />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useCopy, usePointer, useTilt, useZonedTime } from "../lib/hooks";
import EyeMark from "./EyeMark";

const AVATAR_URL =
  "https://image.qwenlm.ai/generated-images/3a2af305-d7c9-4829-8cb9-6f02afe59672/_result.png";

const IG_URL = "https://www.instagram.com/dr_ozgesaritas/";

function Letters({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="letter"
          style={{ ["--letter-delay" as string]: `${baseDelay + i * 42}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}

export default function IdentityCard() {
  const tiltRef = useTilt<HTMLDivElement>(4);
  const pointer = usePointer();
  const ankaraTime = useZonedTime("Europe/Istanbul");
  const { copied, copy } = useCopy();

  return (
    <div
      ref={tiltRef}
      className="gradient-border relative rounded-[2rem] bg-pine/80 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-transform duration-300 ease-out sm:p-8"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* строка статуса */}
      <div className="flex items-center justify-between">
        <EyeMark pointer={pointer} width={56} className="float-y" />
        <span className="inline-flex items-center gap-2 rounded-full border border-jade/30 bg-jade/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-mint">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-jade" />
          ведёт приём
        </span>
      </div>

      {/* аватар с вращающимся ирисовым кольцом */}
      <div className="relative mx-auto mt-7 h-44 w-44 sm:h-48 sm:w-48">
        <div
          className="ring-spin absolute -inset-2 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #eda659, #2fae7d, #ffd9a3, #17453a, #eda659)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          }}
        />
        <div
          className="ring-spin-rev absolute -inset-4 rounded-full opacity-50"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 0deg, rgba(237,166,89,0.5) 90deg, transparent 180deg, rgba(47,174,125,0.5) 270deg, transparent 360deg)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden rounded-full border border-cream/15">
          <img
            src={AVATAR_URL}
            alt="Иллюстрированный портрет доктора Özge Sarıtaş"
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            loading="eager"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(255,217,163,0.18), transparent 55%)",
            }}
          />
        </div>
      </div>

      {/* имя */}
      <p className="mt-7 text-center font-display text-[11px] font-medium tracking-[0.35em] text-amber uppercase">
        Op. Dr.
      </p>
      <h1 className="mt-2 text-center font-display text-[26px] leading-[1.15] font-bold text-cream sm:text-[28px]">
        <Letters text="Özge" baseDelay={150} />{" "}
        <Letters text="Sarıtaş" baseDelay={450} />
      </h1>

      <p className="gradient-ink mt-3 text-center font-display text-[13px] font-semibold tracking-wide">
        Врач-офтальмолог · MD, FEBO
      </p>

      {/* регалии */}
      <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-sage">
        {["Hacettepe Üniv. '16", "доцент", "FEBO · Европа"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cream/12 bg-deep/70 px-3 py-1.5 transition-colors duration-300 hover:border-amber/50 hover:text-gold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* геолокация и время */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-cream/10 bg-deep/60 px-4 py-3 text-[12px]">
        <span className="inline-flex items-center gap-2 text-sage">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Анкара, Турция
        </span>
        <span className="font-display text-[11px] text-mint tabular-nums">
          {ankaraTime} <span className="text-sage/70">GMT+3</span>
        </span>
      </div>

      {/* главные действия */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sweep group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber to-honey px-4 py-3.5 font-display text-[12px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(237,166,89,0.55)] active:translate-y-0"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          Instagram
        </a>
        <a
          href="https://ig.me/m/dr_ozgesaritas"
          target="_blank"
          rel="noopener noreferrer"
          className="sweep group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-jade/40 bg-jade/10 px-4 py-3.5 font-display text-[12px] font-semibold text-mint transition-all duration-300 hover:-translate-y-0.5 hover:border-jade hover:bg-jade/20 hover:shadow-[0_12px_30px_-8px_rgba(47,174,125,0.45)] active:translate-y-0"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 3 10.5 13.5" />
            <path d="M21 3 14 21l-3.5-7.5L3 10l18-7Z" />
          </svg>
          Написать
        </a>
      </div>

      {/* поделиться */}
      <button
        type="button"
        onClick={() => copy(IG_URL)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-cream/10 px-4 py-2.5 text-[12px] font-semibold text-sage transition-all duration-300 hover:border-amber/40 hover:text-gold active:scale-[0.98]"
      >
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-jade" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m4.5 12.5 5 5 10-11" />
            </svg>
            Ссылка скопирована
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="6" r="2.5" />
              <circle cx="18" cy="18" r="2.5" />
              <path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6" />
            </svg>
            Поделиться профилем
          </>
        )}
      </button>
    </div>
  );
}

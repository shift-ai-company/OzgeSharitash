import type { ReactNode } from "react";
import { useCountUp, useReveal } from "../lib/hooks";
import EyeMark from "./EyeMark";

/* ---------------- helpers ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  accent,
}: {
  kicker: string;
  title: string;
  accent?: string;
}) {
  return (
    <Reveal>
      <p className="font-display text-[11px] font-semibold tracking-[0.35em] text-amber uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-[22px] leading-snug font-bold text-cream sm:text-[26px]">
        {title}{" "}
        {accent && <span className="gradient-ink">{accent}</span>}
      </h2>
    </Reveal>
  );
}

const Spark = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3 text-amber" fill="currentColor" aria-hidden="true">
    <path d="M12 2c.6 4.8 1.4 6.6 2.4 7.6S17.2 11.4 22 12c-4.8.6-6.6 1.4-7.6 2.4S12.6 17.2 12 22c-.6-4.8-1.4-6.6-2.4-7.6S6.8 12.6 2 12c4.8-.6 6.6-1.4 7.6-2.4S11.4 6.8 12 2Z" />
  </svg>
);

/* ---------------- бегущая строка ---------------- */

const TICKER = [
  "катаракта",
  "LASIK / PRK",
  "диабетическая ретинопатия",
  "глаукома",
  "заболевания сетчатки",
  "доказательная медицина",
  "Hacettepe '16",
  "FEBO",
  "Анкара",
];

export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-deep/50 py-3.5">
      <div className="marquee-track flex w-max items-center gap-6 pr-6">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display text-[12px] font-medium tracking-[0.2em] text-sage uppercase transition-colors duration-300 hover:text-gold">
              {t}
            </span>
            <Spark />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

/* ---------------- о враче ---------------- */

export function About() {
  return (
    <section className="px-6 pt-14 sm:px-10">
      <SectionHeading kicker="знакомство" title="Врач, который возвращает" accent="ясность мира" />
      <Reveal delay={120}>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-sage">
          <p>
            <strong className="font-semibold text-cream">Op. Dr. Özge Sarıtaş</strong> — врач-офтальмолог,
            хирург, кандидат медицинских наук (MD) и обладательница европейского
            сертификата <span className="text-gold">FEBO</span> — Fellow of the European Board of
            Ophthalmology. Выпускница медицинского факультета{" "}
            <span className="text-mint">Университета Хаджеттепе</span> (2016) — одной из
            сильнейших медицинских школ Турции.
          </p>
          <p>
            Сегодня — ассистент-профессор (доцент) медицинского факультета{" "}
            Университета Йылдырым Бейазит в Анкаре: совмещает практику, операции и
            преподавание. Ведёт пациентов с диабетической ретинопатией и заболеваниями
            сетчатки, выполняет операции при катаракте и лазерную коррекцию зрения.
          </p>
          <p>
            Регулярный эксперт медицинских эфиров{" "}
            <span className="text-amber">TRT Haber</span>, где просто рассказывает о
            сложном — например, почему диабету нужно регулярно «показывать глаза».
          </p>
        </div>
      </Reveal>

      {/* цитата-манифест */}
      <Reveal delay={200}>
        <blockquote className="gradient-border mt-8 rounded-2xl bg-deep/60 p-6 sm:p-7">
          <p className="font-display text-[16px] leading-relaxed font-medium text-cream sm:text-[18px]">
            «Хорошее зрение — самая незаметная из роскошей.
            <span className="gradient-ink"> Замечаешь её, только когда теряешь.»</span>
          </p>
          <footer className="mt-4 flex items-center gap-3 text-[12px] text-sage">
            <EyeMark width={34} />
            философия практики
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}

/* ---------------- цифры ---------------- */

function StatNumber({
  target,
  suffix = "",
  format = false,
}: {
  target: number;
  suffix?: string;
  format?: boolean;
}) {
  const { ref, value } = useCountUp(target);
  const display = format
    ? value.toLocaleString("ru-RU").replace(/\u00A0/g, "\u2009")
    : String(value);
  return (
    <span ref={ref} className="font-display text-[30px] font-bold text-cream tabular-nums sm:text-[34px]">
      {display}
      <span className="gradient-ink">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="mt-12 grid grid-cols-2 gap-3 px-6 sm:px-10">
      {[
        { el: <StatNumber target={9} suffix="+" />, label: "лет клинической практики" },
        { el: <StatNumber target={1000} suffix="+" format />, label: "операций и процедур" },
        { el: <span className="font-display text-[30px] font-bold text-cream sm:text-[34px]"><span className="gradient-ink">FEBO</span></span>, label: "европейская сертификация" },
        { el: <span className="font-display text-[30px] font-bold text-cream sm:text-[34px]">'<span className="gradient-ink">16</span></span>, label: "Hacettepe Üniversitesi" },
      ].map((s, i) => (
        <Reveal key={s.label} delay={i * 100}>
          <div className="group h-full rounded-2xl border border-cream/10 bg-pine/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber/40 hover:bg-deep/70 hover:shadow-[0_18px_40px_-16px_rgba(237,166,89,0.25)]">
            {s.el}
            <p className="mt-2 text-[12px] leading-snug text-sage">{s.label}</p>
            <span className="mt-3 block h-[3px] w-6 rounded-full bg-amber/50 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-amber group-hover:to-jade" />
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------------- направления ---------------- */

const EXPERTISE = [
  "катаракта",
  "LASIK / PRK",
  "диабетическая ретинопатия",
  "глаукома",
  "заболевания сетчатки",
  "синдром сухого глаза",
  "офтальмохирургия",
  "диагностика зрения",
];

export function Expertise() {
  return (
    <section className="mt-14 px-6 sm:px-10">
      <SectionHeading kicker="направления" title="С чем помогает" accent="доктор" />
      <div className="mt-6 flex flex-wrap gap-2.5">
        {EXPERTISE.map((e, i) => (
          <Reveal key={e} delay={i * 60}>
            <span className="group inline-flex cursor-default items-center gap-2 rounded-full border border-cream/12 bg-deep/60 px-4 py-2.5 text-[13px] font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-jade/60 hover:bg-jade/10 hover:text-mint hover:shadow-[0_10px_24px_-10px_rgba(47,174,125,0.5)]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber transition-colors duration-300 group-hover:bg-mint" />
              {e}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- почему выбирают ---------------- */

const REASONS = [
  {
    n: "01",
    title: "Академический уровень",
    text: "Доцент медицинского факультета: практика на острие науки, а не по учебникам десятилетней давности.",
  },
  {
    n: "02",
    title: "Сертификат FEBO",
    text: "Европейский совет офтальмологии подтвердил квалификацию по единым строгим стандартам Евросоюза.",
  },
  {
    n: "03",
    title: "Эксперт ТВ и медиа",
    text: "Приглашённый эксперт TRT Haber: умеет объяснить диагноз так, что пациент действительно понимает.",
  },
  {
    n: "04",
    title: "Операции, возвращающие зрение",
    text: "От катаракты до сложных случаев сетчатки — включая истории, когда зрение возвращается спустя годы.",
  },
];

export function WhySection() {
  return (
    <section className="mt-14 px-6 sm:px-10">
      <SectionHeading kicker="почему она" title="Четыре причины" accent="доверять" />
      <div className="mt-6 overflow-hidden rounded-2xl border border-cream/10">
        {REASONS.map((r, i) => (
          <Reveal key={r.n} delay={i * 90}>
            <div
              className={`sweep group relative flex gap-5 bg-pine/55 p-5 transition-colors duration-400 hover:bg-deep/80 sm:p-6 ${
                i > 0 ? "border-t border-cream/8" : ""
              }`}
            >
              <span className="font-display text-[22px] leading-none font-bold text-amber/60 transition-all duration-400 group-hover:scale-110 group-hover:text-amber">
                {r.n}
              </span>
              <div>
                <h3 className="font-display text-[14px] font-semibold text-cream transition-transform duration-400 group-hover:translate-x-1">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-sage">{r.text}</p>
              </div>
              <span className="absolute top-1/2 right-5 h-px w-0 bg-gradient-to-r from-transparent to-amber transition-all duration-500 group-hover:w-10" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ссылки (ядро link-in-bio) ---------------- */

const LINKS = [
  {
    title: "Instagram",
    sub: "@dr_ozgesaritas — приёмы, операции, медицина без пафоса",
    href: "https://www.instagram.com/dr_ozgesaritas/",
    tone: "amber" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Написать в Direct",
    sub: "самый быстрый способ связаться — ответ в рабочие часы",
    href: "https://ig.me/m/dr_ozgesaritas",
    tone: "jade" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 3 10.5 13.5" />
        <path d="M21 3 14 21l-3.5-7.5L3 10l18-7Z" />
      </svg>
    ),
  },
  {
    title: "Запись на консультацию",
    sub: "напишите в Direct «запись» — подберут дату и время",
    href: "https://www.instagram.com/dr_ozgesaritas/",
    tone: "gold" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Коллегам · LinkedIn",
    sub: "научные интересы и академическое досье",
    href: "https://tr.linkedin.com/in/%C3%B6zge-sar%C4%B1ta%C5%9F-md-febophth-866b191a5",
    tone: "sage" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
        <path d="M7.5 10.5v6M7.5 7.4v.1M11.5 16.5v-3.5a2.5 2.5 0 0 1 5 0v3.5" />
      </svg>
    ),
  },
];

const TONE: Record<string, { chip: string; hover: string }> = {
  amber: {
    chip: "bg-amber/15 text-amber border-amber/30",
    hover: "hover:border-amber/60 hover:shadow-[0_18px_44px_-18px_rgba(237,166,89,0.55)]",
  },
  jade: {
    chip: "bg-jade/15 text-mint border-jade/30",
    hover: "hover:border-jade/60 hover:shadow-[0_18px_44px_-18px_rgba(47,174,125,0.55)]",
  },
  gold: {
    chip: "bg-gold/12 text-gold border-gold/30",
    hover: "hover:border-gold/60 hover:shadow-[0_18px_44px_-18px_rgba(255,217,163,0.5)]",
  },
  sage: {
    chip: "bg-sage/12 text-sage border-sage/30",
    hover: "hover:border-sage/50 hover:shadow-[0_18px_44px_-18px_rgba(168,195,180,0.4)]",
  },
};

export function LinksSection() {
  return (
    <section className="mt-14 px-6 sm:px-10" id="links">
      <SectionHeading kicker="связь" title="Все ссылки —" accent="в одном месте" />
      <div className="mt-6 space-y-3">
        {LINKS.map((l, i) => (
          <Reveal key={l.title} delay={i * 90}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`sweep group flex items-center gap-4 rounded-2xl border border-cream/10 bg-pine/60 p-4 transition-all duration-400 hover:-translate-y-1 hover:bg-deep/80 active:translate-y-0 sm:p-5 ${TONE[l.tone].hover}`}
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-transform duration-400 group-hover:rotate-6 group-hover:scale-105 ${TONE[l.tone].chip}`}
              >
                {l.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[14px] font-semibold text-cream transition-colors duration-300 group-hover:text-gold">
                  {l.title}
                </span>
                <span className="mt-1 block truncate text-[12px] text-sage">{l.sub}</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 text-sage transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- приём и часы ---------------- */

const HOURS = [
  { day: "Понедельник — Пятница", time: "09:00 – 17:00", hot: true },
  { day: "Суббота", time: "по записи", hot: false },
  { day: "Воскресенье", time: "выходной", hot: false },
];

const FAQ = [
  {
    q: "Как записаться на приём?",
    a: "Напишите в Instagram Direct кодовое слово «запись» — укажите жалобу и удобные даты. Вам подтвердят время приёма в университетской клинике в Анкаре.",
  },
  {
    q: "На каких языках идёт приём?",
    a: "Доктор принимает на турецком и английском. Если нужен русский — заранее предупредите в Direct, чтобы согласовать переводчика.",
  },
  {
    q: "Где находится клиника?",
    a: "Анкара, медицинский факультет Университета Йылдырым Бейазит. Точный адрес и схему проезда отправят в Direct после записи.",
  },
];

export function Schedule() {
  return (
    <section className="mt-14 px-6 sm:px-10">
      <SectionHeading kicker="приём" title="Часы работы и" accent="вопросы" />
      <Reveal delay={100}>
        <div className="mt-6 overflow-hidden rounded-2xl border border-cream/10">
          {HOURS.map((h, i) => (
            <div
              key={h.day}
              className={`flex items-center justify-between bg-pine/55 px-5 py-4 transition-colors duration-300 hover:bg-deep/80 ${
                i > 0 ? "border-t border-cream/8" : ""
              }`}
            >
              <span className="text-[13px] font-medium text-cream">{h.day}</span>
              <span
                className={`font-display text-[12px] font-semibold tabular-nums ${
                  h.hot ? "text-mint" : "text-sage"
                }`}
              >
                {h.time}
              </span>
            </div>
          ))}
          <div className="border-t border-cream/8 bg-deep/60 px-5 py-3 text-[11px] text-sage">
            Время указано по Анкаре (GMT+3). График может меняться из-за операций —
            уточняйте в Direct.
          </div>
        </div>
      </Reveal>

      <div className="mt-4 space-y-3">
        {FAQ.map((f, i) => (
          <Reveal key={f.q} delay={i * 80}>
            <details className="group rounded-2xl border border-cream/10 bg-pine/55 transition-colors duration-300 open:border-amber/35 open:bg-deep/70">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[13px] font-semibold text-cream transition-colors duration-300 hover:text-gold [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-amber transition-transform duration-400 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-[13px] leading-relaxed text-sage">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- футер ---------------- */

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cream/10 bg-ink/60 px-6 py-10 text-center sm:px-10">
      <div className="flex items-center justify-center gap-3">
        <EyeMark width={46} className="float-y" />
        <span className="font-display text-[13px] font-semibold text-cream">
          Op. Dr. Özge <span className="gradient-ink">Sarıtaş</span>
        </span>
      </div>
      <p className="mt-3 text-[12px] text-sage">
        Анкара, Турция · офтальмология · MD, FEBO
      </p>
      <a
        href="https://www.instagram.com/dr_ozgesaritas/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber/35 px-5 py-2.5 font-display text-[11px] font-semibold tracking-widest text-gold uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber/10 hover:shadow-[0_12px_30px_-10px_rgba(237,166,89,0.5)]"
      >
        @dr_ozgesaritas
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
      <p className="mx-auto mt-6 max-w-md text-[10px] leading-relaxed text-sage/60">
        Страница-визитка. Не является официальным медицинским сайтом. Имеются
        противопоказания, необходима консультация специалиста. © 2026
      </p>
    </footer>
  );
}

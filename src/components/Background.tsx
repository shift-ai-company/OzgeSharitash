import { usePointer, usePrefersReducedMotion } from "../lib/hooks";

/**
 * Живой фон: медленно дышащие ирисовые градиенты
 * (изумруд → янтарь → мята), точечная сетка, виньетка
 * и мягкое пятно света, следующее за курсором.
 */
export default function Background() {
  const pointer = usePointer();
  const reduced = usePrefersReducedMotion();

  const spotX = 50 + pointer.x * 18;
  const spotY = 42 + pointer.y * 16;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden="true">
      {/* медленно дрейфующие цветовые массы */}
      <div
        className="iris-layer drift-a breathe"
        style={{
          width: "70vmax",
          height: "70vmax",
          left: "-18vmax",
          top: "-22vmax",
          background:
            "radial-gradient(circle at 40% 40%, rgba(23,69,58,0.95), rgba(15,43,34,0.6) 45%, transparent 70%)",
        }}
      />
      <div
        className="iris-layer drift-b"
        style={{
          width: "60vmax",
          height: "60vmax",
          right: "-20vmax",
          top: "6vmax",
          background:
            "radial-gradient(circle at 55% 45%, rgba(201,138,75,0.5), rgba(237,166,89,0.22) 42%, transparent 68%)",
        }}
      />
      <div
        className="iris-layer drift-c"
        style={{
          width: "55vmax",
          height: "55vmax",
          left: "8vmax",
          bottom: "-24vmax",
          background:
            "radial-gradient(circle at 50% 50%, rgba(47,174,125,0.4), rgba(47,174,125,0.14) 45%, transparent 70%)",
        }}
      />
      <div
        className="iris-layer drift-a breathe"
        style={{
          width: "42vmax",
          height: "42vmax",
          right: "4vmax",
          bottom: "-12vmax",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,217,163,0.22), transparent 62%)",
          animationDelay: "-8s",
        }}
      />

      {/* точечная сетка */}
      <div className="dotgrid absolute inset-0 opacity-70" />

      {/* свет за курсором */}
      {!reduced && (
        <div
          className="absolute inset-0 transition-[background] duration-700 ease-out"
          style={{
            background: `radial-gradient(42rem circle at ${spotX}% ${spotY}%, rgba(237,166,89,0.10), rgba(47,174,125,0.06) 40%, transparent 68%)`,
          }}
        />
      )}

      {/* виньетка */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 20%, transparent 40%, rgba(7,19,16,0.78) 100%)",
        }}
      />
    </div>
  );
}

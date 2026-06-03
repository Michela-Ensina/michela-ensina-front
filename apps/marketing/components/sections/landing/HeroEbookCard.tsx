import Image from "next/image";

export function HeroEbookCard() {
  return (
    <div className="relative z-10 w-full">
      <div className="group relative aspect-3/4 rotate-[-2.8deg] overflow-hidden rounded-3xl border-4 border-surface bg-surface shadow-[0_30px_52px_rgba(35,54,149,0.24)] transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none hover:rotate-0">
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/ebook-modo-fluente-capa.png')",
            backgroundPosition: "center top",
            backgroundSize: "cover",
            transform: "scale(1.11) translateY(-0.8%)",
            willChange: "transform",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <Image
            alt="Logo Michela Ensina"
            className="w-32"
            height={124}
            src="/assets/brand/logos/logo-horizontal-purple-dark.svg"
            width={409}
          />
          <h3 className="text-4xl text-primary">
            Modo
            <br />
            Fluente
          </h3>
          <p className="rounded-full bg-surface-soft px-4 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
            O Guia Prático
          </p>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-15 rotate-[5deg] rounded-3xl border-2 border-border-soft bg-surface p-2.5 shadow-[0_20px_35px_rgba(35,54,149,0.22)] transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none sm:-bottom-7 sm:-right-2.5 sm:p-3 group-hover:rotate-0">
        <div className="w-36 overflow-hidden rounded-2xl border border-border-soft bg-surface sm:w-40">
          <p className="bg-surface-soft px-3 py-2 text-center text-[10px] font-bold tracking-wide text-secondary">
            PLANNER SEMANAL
          </p>
          <div className="space-y-3 p-3">
            <div className="h-1.5 rounded bg-surface-soft" />
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="h-7 rounded bg-surface-soft/85" />
              ))}
            </div>
            <div className="h-16 rounded bg-surface-soft/55" />
          </div>
        </div>
      </div>
    </div>
  );
}

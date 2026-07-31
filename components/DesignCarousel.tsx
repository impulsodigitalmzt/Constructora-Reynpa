"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

const designs = [
  ["493945530_1260234636103048_7833668012152188885_n.jpg", "Interior sereno"],
  ["494072684_1260121829447662_3591719434945570049_n.jpg", "Residencia contemporánea"],
  ["494103166_1260121486114363_3301581006989858811_n.jpg", "Cocina esencial"],
  ["494118844_1260121489447696_7806358501927781547_n.jpg", "Espacio social"],
  ["642345873_1537016178424891_1199563888190041144_n.jpg", "Dormitorio cálido"],
  ["642381448_1537016091758233_8720037654427373986_n.jpg", "Materialidad"],
  ["643328877_1537016028424906_6368804266118922831_n.jpg", "Luz y textura"],
  ["670639381_1575564127903429_7104562998157452943_n.jpg", "Atmósfera interior"],
  ["702625085_1607513934708448_3777016774527702021_n.jpg", "Habitar con intención"],
  ["702695595_1607513581375150_7346377566660941231_n.jpg", "Fachada REYPA"],
];

export default function DesignCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const positionRef = useRef(0);
  const targetRef = useRef(0);

  const loopWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const items = track.children;
    const first = items[0] as HTMLElement | undefined;
    const duplicate = items[designs.length] as HTMLElement | undefined;

    if (first && duplicate) return duplicate.offsetLeft - first.offsetLeft;
    return track.scrollWidth / 2;
  }, []);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const animate = (time: number) => {
      const track = trackRef.current;
      const delta = Math.min(time - previous, 48);
      previous = time;

      if (track) {
        if (draggingRef.current) {
          positionRef.current = track.scrollLeft;
          targetRef.current = track.scrollLeft;
        } else {
          targetRef.current += delta * 0.045;
          positionRef.current += (targetRef.current - positionRef.current) * 0.12;

          const cycle = loopWidth();
          if (cycle > 0 && positionRef.current >= cycle) {
            positionRef.current -= cycle;
            targetRef.current -= cycle;
          }

          track.scrollLeft = positionRef.current;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [loopWidth]);

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    positionRef.current = event.currentTarget.scrollLeft;
    targetRef.current = event.currentTarget.scrollLeft;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const move = (direction: number) => {
    targetRef.current += direction * Math.min(window.innerWidth * 0.72, 620);
  };

  return (
    <section className="overflow-hidden bg-[#0a0a0a] py-24 text-white md:py-36">
      <div className="container-reypa mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Pasarela de diseños</span>
          <h2 className="heading-section mt-8">
            Ideas en
            <span className="font-editorial italic text-[#d4b28c]"> movimiento.</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm font-light leading-7 text-white/42">
            Arrastra con el mouse o desliza con el dedo para explorar nuestros interiores,
            fachadas y atmósferas.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid size-12 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:border-[#d4b28c] hover:text-[#d4b28c]"
            aria-label="Ver diseños anteriores"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid size-12 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:border-[#d4b28c] hover:text-[#d4b28c]"
            aria-label="Ver diseños siguientes"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex cursor-grab select-none gap-4 overflow-x-hidden pl-[max(1rem,calc((100vw-86rem)/2))] active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => {
          draggingRef.current = true;
          startXRef.current = event.clientX;
          startScrollRef.current = event.currentTarget.scrollLeft;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current) return;
          event.currentTarget.scrollLeft =
            startScrollRef.current - (event.clientX - startXRef.current) * 1.25;
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        aria-label="Galería horizontal de diseños REYPA"
      >
        {[...designs, ...designs].map(([file, title], index) => (
          <article
            key={`${file}-${index}`}
            className={`group relative shrink-0 overflow-hidden rounded-2xl bg-[#1a1a1a] ${
              index % 3 === 0
                ? "h-[28rem] w-[78vw] sm:w-[30rem] md:h-[36rem]"
                : "h-[28rem] w-[68vw] sm:w-[24rem] md:h-[36rem]"
            }`}
          >
            <Image
              src={`/foto/DISEÑOS/${file}`}
              alt={`${title}, diseño de REYPA Arquitectura`}
              fill
              draggable={false}
              sizes="(max-width: 640px) 78vw, 480px"
              className="pointer-events-none object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-[0.52rem] uppercase tracking-[0.23em] text-[#d4b28c]">
                Diseño · {String((index % designs.length) + 1).padStart(2, "0")}
              </span>
              <h3 className="font-editorial mt-2 text-2xl italic">{title}</h3>
            </div>
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}

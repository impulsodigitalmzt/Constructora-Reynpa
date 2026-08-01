"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const designFiles = [
  "493250488_1260121709447674_4823848766795566487_n.jpg",
  "493798643_1260234639436381_8205621912561760132_n.jpg",
  "493910561_1260234739436371_742012578669566310_n.jpg",
  "493929292_1260121702781008_3527229711681332095_n.jpg",
  "493938791_1260121682781010_3104528990096029995_n.jpg",
  "493945530_1260234636103048_7833668012152188885_n.jpg",
  "493950912_1260234656103046_6959105821032365098_n.jpg",
  "493952480_1260234659436379_4704612922379677427_n.jpg",
  "494019150_1260234632769715_5028493379989808403_n.jpg",
  "494055927_1260121679447677_4307645974278375077_n.jpg",
  "494069866_1260121676114344_8618029389944130235_n.jpg",
  "494072684_1260121829447662_3591719434945570049_n.jpg",
  "494103166_1260121486114363_3301581006989858811_n.jpg",
  "494118844_1260121489447696_7806358501927781547_n.jpg",
  "494195482_1260234282769750_1827510479450987540_n.jpg",
  "494203120_1260121736114338_875059875487098711_n.jpg",
  "642345873_1537016178424891_1199563888190041144_n.jpg",
  "642373414_1537015985091577_4465844040434491415_n.jpg",
  "642381448_1537016091758233_8720037654427373986_n.jpg",
  "643328877_1537016028424906_6368804266118922831_n.jpg",
  "644450643_1537016025091573_2142587862290463650_n.jpg",
  "644543148_1537015981758244_6936092209376265663_n.jpg",
  "644543148_1537016105091565_8956861970405921218_n.jpg",
  "670639381_1575564127903429_7104562998157452943_n.jpg",
  "702265784_1607513908041784_2005823586481151499_n.jpg",
  "702509136_1607513768041798_7010964962892001372_n.jpg",
  "702625085_1607513934708448_3777016774527702021_n.jpg",
  "702695595_1607513581375150_7346377566660941231_n.jpg",
  "702695598_1607513698041805_731984710330338736_n.jpg",
  "736480460_17899041126499562_8138245527047035498_n.jpg",
];

const buildFiles = [
  "515282780_1349573200502524_1367755082880708304_n.jpg",
  "529643961_1349573027169208_1944671207806453847_n.jpg",
  "529652928_1349572983835879_6902734337565790873_n.jpg",
  "529687235_1349572710502573_8812842750850196710_n.jpg",
  "530224179_1349572923835885_5755514932478106496_n.jpg",
  "530242268_1349573190502525_852000528287082247_n.jpg",
  "530369753_1349573113835866_5367404393464932226_n.jpg",
  "531246588_1349573147169196_6366091025612858324_n.jpg",
  "535018349_1357874103005767_2341605772589854390_n.jpg",
  "535470410_1357874099672434_4523966169150462403_n.jpg",
  "621588551_1503403871786122_6894391757475086336_n.jpg",
  "641651291_1532090672250775_5115249994984094462_n.jpg",
  "670837579_1575564154570093_3835899673748173775_n.jpg",
  "670946354_1575564101236765_216991844104405623_n.jpg",
  "672671516_1575564107903431_1223025689471052750_n.jpg",
  "684530728_1590115179781657_3211124270856574738_n.jpg",
  "684625697_1590115173114991_3280028444617958684_n.jpg",
  "685079827_1590115093114999_8267596342394441565_n.jpg",
  "685386364_1590115106448331_926119184666961227_n.jpg",
  "710813153_1621883359938172_16608911410795697_n.jpg",
  "728675513_17896248183499562_4408706013133684808_n.jpg",
  "741120697_17899041144499562_1133334641810676661_n.jpg",
  "743361723_17899041135499562_4766520334458302518_n.jpg",
  "747613238_17900286753499562_6484649497460448_n.jpg",
  "747625965_17900286720499562_7975554370235012092_n.jpg",
  "747877798_17900286741499562_9146408866176433170_n.jpg",
];

type Category = "design" | "build";

export default function ProjectGallery() {
  const [category, setCategory] = useState<Category>("design");
  const [selected, setSelected] = useState<number | null>(null);
  const files = category === "design" ? designFiles : buildFiles;
  const folder = category === "design" ? "DISEÑOS" : "OBRA";
  const imagePath = (file: string) => `/foto/${folder}/${file}`;

  const move = useCallback((direction: number) => {
    setSelected((current) => {
      if (current === null) return null;
      return (current + direction + files.length) % files.length;
    });
  }, [files.length]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, move]);

  const selectCategory = (next: Category) => {
    setCategory(next);
    setSelected(null);
  };

  return (
    <>
      <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.25em] text-white/25">Archivo visual</p>
          <p className="font-editorial mt-2 text-2xl italic text-white/80">
            {category === "design" ? "Imaginamos antes de construir." : "La materia toma forma."}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-7">
        <button
          type="button"
          onClick={() => selectCategory("design")}
          className={`group relative min-h-11 pb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
            category === "design" ? "text-[#d4b28c]" : "text-white/35 hover:text-white"
          }`}
        >
          Diseños y renders <span className="ml-2 opacity-45">{designFiles.length}</span>
          <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#d4b28c] transition-transform duration-500 ${category === "design" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
        </button>
        <button
          type="button"
          onClick={() => selectCategory("build")}
          className={`group relative min-h-11 pb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
            category === "build" ? "text-[#d4b28c]" : "text-white/35 hover:text-white"
          }`}
        >
          Avances de obra <span className="ml-2 opacity-45">{buildFiles.length}</span>
          <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#d4b28c] transition-transform duration-500 ${category === "build" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
        </button>
        </div>
      </div>

      <div key={category} className="animate-rise columns-1 gap-4 sm:columns-2 lg:columns-3">
        {files.map((file, index) => (
          <button
            type="button"
            key={file}
            onClick={() => setSelected(index)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-2xl"
            aria-label={`Abrir ${category === "design" ? "diseño" : "avance de obra"} ${index + 1}`}
          >
            <Image
              src={imagePath(file)}
              alt={`${category === "design" ? "Diseño arquitectónico" : "Avance de obra"} REYPA ${index + 1}`}
              width={900}
              height={index % 4 === 0 ? 1100 : 760}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover grayscale-[18%] transition-all duration-700 ease-out group-hover:scale-[1.045] group-hover:grayscale-0"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-90" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span>
                <span className="block text-[0.55rem] uppercase tracking-[0.23em] text-[#d4b28c]">
                  {category === "design" ? "Estudio espacial" : "Proceso constructivo"}
                </span>
                <span className="font-editorial mt-2 block text-xl italic text-white">
                  Proyecto {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="text-xl font-light text-white/60">↗</span>
            </span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#050505]/95 p-4 backdrop-blur-xl md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada del proyecto"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#d4b28c]/50 hover:text-[#d4b28c]"
            aria-label="Cerrar"
          >
            <X size={21} />
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); move(-1); }}
            className="absolute left-3 z-10 grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#d4b28c]/50 md:left-7"
            aria-label="Imagen anterior"
          >
            <ChevronLeft />
          </button>
          <div className="relative h-[82vh] w-[85vw] overflow-hidden rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={imagePath(files[selected])}
              alt="Proyecto REYPA ampliado"
              fill
              priority
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); move(1); }}
            className="absolute right-3 z-10 grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#d4b28c]/50 md:right-7"
            aria-label="Imagen siguiente"
          >
            <ChevronRight />
          </button>
          <span className="absolute bottom-4 text-[0.58rem] uppercase tracking-[0.25em] text-[#d4b28c]">
            {selected + 1} / {files.length}
          </span>
        </div>
      )}
    </>
  );
}

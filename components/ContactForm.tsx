"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const fields = [
  { id: "nombre", label: "Nombre completo", type: "text", placeholder: "Tu nombre", required: true },
  { id: "telefono", label: "Teléfono", type: "tel", placeholder: "669 000 0000", required: true },
  { id: "correo", label: "Correo electrónico", type: "email", placeholder: "tu@correo.com", required: true },
  { id: "direccion", label: "Dirección / ubicación del proyecto", type: "text", placeholder: "Calle, colonia, ciudad", required: false },
] as const;

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nombre = String(data.get("nombre") || "");
    const telefono = String(data.get("telefono") || "");
    const correo = String(data.get("correo") || "");
    const direccion = String(data.get("direccion") || "");
    const mensaje = String(data.get("mensaje") || "");

    const body = [
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Correo: ${correo}`,
      `Dirección: ${direccion || "No indicada"}`,
      "",
      "Mensaje:",
      mensaje,
    ].join("\n");

    window.location.href = `mailto:arqreypacontacto@gmail.com?subject=${encodeURIComponent(
      `Contacto web REYPA — ${nombre}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center rounded-2xl border border-white/12 bg-[#171717] p-8 md:p-10">
        <CheckCircle2 className="text-[#d4b28c]" size={34} strokeWidth={1.3} />
        <h3 className="font-editorial mt-8 text-3xl text-white">Mensaje listo para enviar.</h3>
        <p className="mt-4 max-w-md text-sm font-light leading-7 text-white/45">
          Se abrió tu cliente de correo con los datos capturados. Si no se abrió automáticamente,
          escríbenos a arqreypacontacto@gmail.com.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#d4b28c] transition hover:text-white"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/12 bg-[#171717] p-7 md:p-10"
    >
      <div className="mb-8">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#d4b28c]">
          Formulario de contacto
        </span>
        <h2 className="font-editorial mt-4 text-3xl text-white md:text-4xl">
          Cuéntanos tu proyecto.
        </h2>
        <p className="mt-3 max-w-lg text-sm font-light leading-6 text-white/45">
          Completa tus datos y te contactamos para agendar una primera conversación.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.id}
            className={`block ${field.id === "direccion" || field.id === "nombre" ? "sm:col-span-2" : ""}`}
          >
            <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.18em] text-white/50">
              {field.label}
            </span>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              className="h-12 w-full rounded-xl border border-white/12 bg-black/30 px-4 text-sm font-light text-white outline-none transition placeholder:text-white/25 focus:border-[#d4b28c]/60"
            />
          </label>
        ))}

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.18em] text-white/50">
            Mensaje / necesidades del proyecto
          </span>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={5}
            placeholder="Describe el tipo de proyecto, ubicación aproximada y lo que necesitas."
            className="w-full resize-none rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm font-light text-white outline-none transition placeholder:text-white/25 focus:border-[#d4b28c]/60"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4f4f5] px-7 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] transition hover:bg-white"
      >
        Enviar solicitud
        <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

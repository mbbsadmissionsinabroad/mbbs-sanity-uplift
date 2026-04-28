import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MBBS Abroad en Espanol | New-Lyf",
  description:
    "Informacion basica sobre MBBS abroad, costes, admision y apoyo de New-Lyf para estudiantes y familias.",
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com/es",
  },
};

const keyPoints = [
  "Compare pais, coste total y reconocimiento antes de pagar.",
  "Revise idioma, visa, alojamiento y vida diaria con calma.",
  "Use las guias del sitio para filtrar opciones y evitar confusion.",
];

export default function SpanishLandingPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            Guia inicial
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            MBBS abroad con una vision mas clara para estudiantes y familias
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
            Esta pagina resume la idea central del sitio en espanol sencillo.
            New-Lyf ayuda a estudiantes que comparan MBBS abroad, PG abroad,
            nursing jobs y rutas de estudio en Alemania. La meta es reducir
            dudas antes de hablar con un counsellor o enviar un formulario.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
            Antes de elegir un pais, conviene revisar el coste total, la
            universidad, el idioma, el reconocimiento, la visa y la vida diaria.
            Una opcion barata no siempre es la opcion correcta. Una ruta clara y
            segura suele dar mejores resultados a largo plazo.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
            Esta pagina tambien sirve como filtro rapido. Si una opcion sigue
            siendo confusa despues de revisar coste, idioma, reconocimiento y
            pasos de admision, probablemente no es una opcion lista para tomar
            una decision. La idea es reducir riesgo antes de avanzar.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {keyPoints.map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Preguntas utiles para la familia
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Conviene preguntar si el coste total es manejable, si el idioma
              es realista, si el reconocimiento esta claro y si la vida diaria
              en el pais elegido encaja con el estudiante. Estas preguntas
              ayudan mas que una promesa general.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Tambien es util revisar la linea de tiempo completa. Conviene
              saber cuanto tardan los documentos, la admision, la visa y la
              adaptacion inicial. Una opcion puede parecer buena al principio y
              aun asi crear tension si la preparacion real es mucho mayor de lo
              esperado.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/"
              className="rounded-full bg-blue-700 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-blue-800"
            >
              Ver sitio principal
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-6 py-4 text-center text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Hablar con New-Lyf
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

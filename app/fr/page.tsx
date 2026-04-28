import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MBBS Abroad en Francais | New-Lyf",
  description:
    "Presentation simple de MBBS abroad, des couts, de l admission et du soutien New-Lyf pour etudiants et familles.",
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com/fr",
  },
};

const keyPoints = [
  "Comparez le pays, le cout total et la reconnaissance avant de payer.",
  "Verifiez la langue, le visa, le logement et la vie quotidienne.",
  "Utilisez les guides du site pour filtrer les options utiles plus vite.",
];

export default function FrenchLandingPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            Guide de depart
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            MBBS abroad avec une vision plus claire pour les etudiants et les familles
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
            Cette page resume le site en francais simple. New-Lyf aide les
            etudiants qui comparent MBBS abroad, PG abroad, nursing jobs et les
            parcours d etudes ou de travail lies a l Allemagne. Le but est de
            rendre la decision plus claire avant un appel ou un formulaire.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
            Avant de choisir un pays, il faut regarder le cout total, l
            universite, la langue, la reconnaissance, le visa et la vie
            quotidienne. Une option moins chere n est pas toujours la meilleure.
            Une voie claire, stable et bien comprise aide souvent davantage sur
            le long terme.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
            Cette page sert aussi de filtre simple. Si une option reste floue
            apres la lecture du cout, de la langue, de la reconnaissance et des
            etapes d admission, elle n est probablement pas prete pour une
            decision serieuse. Le but est de reduire le risque avant d avancer.
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
              Questions utiles pour la famille
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Il est utile de verifier si le cout total est gerable, si la
              langue est realiste, si la reconnaissance est claire et si la vie
              quotidienne dans le pays choisi convient vraiment a l etudiant.
              Ces questions donnent une base plus solide qu une promesse vague.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Il est aussi utile de verifier le vrai calendrier du projet. La
              famille doit comprendre le temps necessaire pour les documents, l
              admission, le visa et l installation initiale. Une option qui
              semble simple au depart peut devenir plus lourde si cette partie
              reste floue.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Une autre bonne methode consiste a reduire la liste tres tot. Si
              une route reste confuse apres la lecture du cout, de la langue,
              de la reconnaissance et du soutien, elle ne merite sans doute pas
              plus de temps. Cela aide la famille a se concentrer sur les
              options les plus solides.
            </p>
          </div>
          <div className="mt-8 rounded-[2rem] border border-blue-100 bg-blue-50 p-6 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Comment utiliser cette page de facon pratique
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Cette page sert de point de depart. Elle aide la famille a
              comprendre l idee generale du site, a reduire les doutes du debut
              et a passer ensuite vers les pages de pays, les routes de nursing,
              PG abroad ou le contact direct avec New-Lyf.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              La meilleure decision ne vient pas d une seule promesse. Elle
              vient d une comparaison claire entre le cout total, la
              reconnaissance, la langue, la vie quotidienne et les vraies
              etapes d admission. Si ces points restent clairs apres la
              lecture, la route merite souvent une verification plus serieuse.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Si la voie reste confuse, la page reste quand meme utile. Cela
              signifie simplement que la famille doit verifier plus d elements
              avant d avancer. Cette clarte evite souvent des erreurs, des
              depenses inutiles et beaucoup de stress.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/"
              className="rounded-full bg-blue-700 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-blue-800"
            >
              Voir le site principal
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-6 py-4 text-center text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Contacter New-Lyf
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
